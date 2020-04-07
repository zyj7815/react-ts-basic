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



#### Git规则
用 husky + commitlint 来规范git提交。



#### postcss-px-to-viewport
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