参考教程[https://segmentfault.com/a/1190000020332804?_ea=18760055](https://segmentfault.com/a/1190000020332804?_ea=18760055)

- webpack的配置
- 对静态资源（图片，模板等）的处理
- 使react项目支持typescript，eslint，prettier等工具
- 优化webpack配置，减小代码的体积
- 支持不同的css预处理器（less，sass等）
- 一套好用的样式方案
- 使项目支持多个环境切换（开发，测试，预发布，生产等）
- 使用规则来自动约束代码规范
- 优化开发体验
- 一些优化项目性能的建议



## Git规则
用 husky + commitlint 来规范git提交。

> `husky`会为`git`增加钩子，在`commit`时执行一系列操作，`commitlint`可以检查`git message`是否符合规则。

在 package.json 中增加配置如下：

```javascript
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```
在根目录新建文件 [.commitlintrc.js](https://github.com/zyj7815/react-ts-basic/blob/master/.commitlintrc.js)，根据具体情况配置。


## babel 和 typescript

```
$ npm i core-js@2 # babel的按需引入依赖
$ npm i -D @babel/plugin-proposal-class-properties # 能够在class中自动绑定this的指向
$ npm i -D typescript awesome-typescript-loader # 处理ts，主要就靠它
$ npm i -D html-loader html-webpack-plugin # 顺便把html的支持做好

```

在根目录新建[tsconfig.json](https://github.com/zyj7815/react-ts-basic/blob/master/tsconfig.json)。


## 完善webpack打包配置

每次打包前最好能把上一次生成的文件删除
```
$ npm i -D clean-webpack-plugin
```

修改webpack基础配置：
```javascript
// webpack.base.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
```


- 在生产环境，部署新版本后能够丢弃缓存，保留没有被改动的文件的缓存；
- 在开发环境，完全不使用缓存。

```javascript
// webpack.prod.js 生产环境打包配置
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'production',
    devtool: sourceMapsMode,
    output: {
        filename: 'js/[name].[contenthash:8].js', // contenthash：只有模块的内容改变，才会改变hash值
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
```

```javascript
// webpack.dev.js 开发环境的配置
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const config = require('./config');

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: 'js/[name].[hash:8].js',
        publicPath: config.publicPath // 这里可以省略
    },
    module: {
        rules: [{
            oneOf: []
        }]
    },
}
```

编辑`build.js`
```javascript
// config/build.js
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod');

webpack(webpackConfig, function (err, stats) {});
```

安装工具并添加启动命令：

```
$ npm i -D cross-env
```

```json
// package.json
{
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack-dev-server --config ./config/webpack.dev.js",
        "build": "cross-env NODE_ENV=production node config/build.js"
    }
}
```

## 打包分析工具

```
$ npm i -D webpack-bundle-analyzer
```
根据打包的命令参数，在打包时自动生成或不生成分析报告。

```javascript
// webpack.base.js
const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const bundleAnalyzerReport = argv.report; // 根据命令参数是否含有 'report' 来决定是否生成报告
// 这个配置将合并到最后的配置中
const webpackConfig = {
    plugins: []
};
if (bundleAnalyzerReport) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(config.assetsRoot, './report.html')
    }));
}
// 改用merge来合并配置
module.exports = merge(webpackConfig, {
    // ...configs
});
```

在package.json打包命令中增加参数：

```json
"scripts": {
    "build": "cross-env NODE_ENV=production node config/build.js --report"
}
```


#### 支持less和css modules
```
$ npm i -D style-loader css-loader less less-loader
```
增加配置

```javascript

// webpack.base.js
module: {
    rules: [
        {
            oneOf: [
                // ... configs
                {
                    test: /\.(less|css)$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false // 如果要启用css modules，改为true即可
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: { javascriptEnabled: true }
                        }
                    ]
                },
            ]
        }
    ]
}
```



## 提取css

将css从js中剥离出来

```
$ npm i -D optimize-css-assets-webpack-plugin
```

增加打包配置：

```javascript
// webpack.prod.js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// ...webpack configs
optimization: {
    minimizer: [
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: true ? { map: { inline: false } } : {}
        })
    ]
}
```


## 自动增加css前缀

使用postcss，自动为css增加浏览器前缀。

```
$ npm i -D postcss-loader autoprefixer
```

增加webpack配置：

```
// webpack.base.js，webpack.prod.js
{
    test: /\.(less|css)$/,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    modules: false
                }
            },
            'postcss-loader', // 注意插入的位置，webpack.prod.js也要加这一项！！！
            {
                loader: 'less-loader',
                options: { javascriptEnabled: true }
            }
        ]
},
```

在根目录新建`postcss.config.js`：

```
module.exports = {
    plugins: {
        autoprefixer: {}
    }
};
```

在`package.json`中增加配置：

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8",
  "iOS >= 8",
  "Firefox >= 20",
  "Android > 4.4"
]
```










## postcss-px-to-viewport
修改`postcss.config.js`，利用`postcss`做基于`vh`，`vw`布局的配置例子。
```javascript
module.exports = {
    plugins: {
        'postcss-aspect-ratio-mini': {},
        'postcss-write-svg': {
            utf8: false
        },
        // 适配移动端
        'postcss-px-to-viewport': {
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false
        },
        cssnano: {
            'cssnano-preset-advanced': {
                zindex: false,
            }
        },
        autoprefixer: {}
    }
};

```