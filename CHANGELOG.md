

name | icon | name | icon
---|---|---|---
新增 | 🆕 | 需求修改 | 🛠
bug修复 | 🐞 | 优化 | 💄
移除 | 🗑  | 重写 | 📖 
需要注意的 | 🌟

---

## 1.0.0 

`(2020.05)`

> 前端样式优化，部分模块重构，数据导出改版，所有列表改为新翻页方式。

#### 【设备浏览】
- 🆕 【设备列表】拆分为`终端列表` + `网关列表`;
- 🆕 导出功能改版，新增【下载管理】= `请求列表` + `下载列表`;
    1. `终端列表`选择要导出的`设备`、`数据类型`、`文件类型`、`导出月份（多选）`;
    2. 终端设备执行导出操作后，服务器会整理需要导出的数据文件;
    3. 在`请求列表`可以查看正在处理的设备，可删除，删除后将停止处理此设备的数据;
    4. 数据处理完成后，`请求列表`的数据将移动到`下载列表`中;
    5. 在`下载列表`中点击`下载链接`，通过直接通过浏览器下载。
- 🌟 网关`hub_mode`开关修改，0表示关闭，1表示打开，2表示临时关闭（也就是非1都是关闭）;
- 🛠 所有列表页面翻页修改为[新翻页](####【新翻页】);
- 🛠 `设备详情`-`环境数据`-`图表展示`，添加按日期展示功能;
- 📖 重写`生物信息`modal框，抽离`store`，将配置框模块化；


#### 【设备配置】
- 📖 重写`设备配置`modal框，抽离`store`，将配置框模块化；
- 🆕 新增`定时模式(准点上传)`，隐藏短信通知开关;
    - gprs_mode开关默认为1，新增gprs_type，gprs_type类型：
    - 【v0】0=定时上传，1=准点上传;
    - 【v1】1=定时采样，101=准点回传;
    - gprs_mode = 1 始终打开。
        

#### 【数据可视化】        
- 🛠 `数据分析`，将【最后一天、周、月】改为【最后一天、自由选择日期】。自由选择日期按日查询数据，显示UTC时间;
- 🐞 修复`单个设备`和`多个设备`切换时，数据类型错乱的问题
    
    
#### 【Table】
- 💄 升级`react-data-grid`，由于`react-data-grid`使用了[Data Virtualization](https://adazzle.github.io/react-data-grid/docs/implementation-notes)数据虚拟化，
只会渲染屏幕内出现的行，而`antd`的`Table`则是渲染所有`Row`，在数据很多的情况下，渲染时间会非常久。
- 🛠 列表selection，统一改为左侧选择框的selection;
- 🌟 注意，`react-data-grid`通过`setState`从普通状态切换到`selection`状态时，列表会直接消失。
需要触发`resize`事件列表才会正常，所以当进行切换操作需要时需要强制`resize`;

```javascript
    setTimeout(() => {
        // 当修改isExport后，左侧selection选择框不会显示，并且列表所有数据都消失了，属于组件的bug，需要强制resize界面，
        window.dispatchEvent(new Event('resize'));
    }, 0)
```

- 💄 `react-data-grid`默认点击列表`Cell`时，会有一个`SelectionMask`框。如果要隐藏这个框，
需要将`Cell`的class`react-grid-Cell`的`z-index`属性设置为1以上; 
    
    
#### 【Lotek】
- 🆕 新增`Lotek`的登录页面、logo，隐藏中英文切换;
- 🌟 针对`Lotek`单独打包，通过域名中的`xxx/en/lotek/#/`判断是否显示Lotek相关的内容。



#### 【新翻页】

`src/common/pagination`
	
1. 以某属性作为sort翻页;
2. 翻下一页时，以最后一条数据的属性请求，降序请求`-xx`。
3. 翻上一页时，已第一条数据的`xx`属性升序请求上一条，得到的数据主要要反序。

```javascript
// 下一页
url = "api/2020-01-02 00:00:00"
header = {
    "x-result-sort": "-updated_at"
}

// 上一页
url = "api/2020-01-01 00:00:00",
header = {
    "x-result-sort": "updated_at"
}
```
