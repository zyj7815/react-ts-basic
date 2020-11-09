import baoyu from './baoyu.png'
import dabaoxue from './dabaoxue.png'
import dafeng from './dafeng.png'
import daxue from './daxue.png'
import dayu from './dayu.png'
import duoyun from './duoyun.png'
import feng from './feng.png'
import fucheng from './fucheng.png'
import jufeng from './jufeng.png'
import leizhengyu from './leizhenyu.png'
import longjuanfeng from './longjuanfeng.png'
import qing from './qing.png'
import shacheng from './shacheng.png'
import tedabaoyu from './tedabaoyu.png'
import weizhi from './weizhi.png'
import wu from './wu.png'
import wumai from './wumai.png'
import xiaoxue from './xiaoxue.png'
import xiaoyu from './xiaoyu.png'
import yujiabiangbao from './yujiabingbao.png'
import yujiaxue from './yujiaxue.png'
import yun from './yun.png'
import zhongxue from './zhongxue.png'
import zhongyu from './zhongyu.png'

const weatherIcon: any = {
    暴雨: baoyu,
    冻雨: baoyu,
    大暴雪: dabaoxue,
    大风: dafeng,
    大雪: daxue,
    暴雪: daxue,
    大雨: dayu,
    多云: duoyun,
    风: feng,
    浮尘: fucheng,
    扬沙: fucheng,
    飓风: jufeng,
    雷阵雨: leizhengyu,
    龙卷风: longjuanfeng,
    晴: qing,
    沙尘暴: shacheng,
    特大暴雨: tedabaoyu,
    大暴雨: tedabaoyu,
    未知: weizhi,
    雾: wu,
    雾霾: wumai,
    小雪: xiaoxue,
    小雨: xiaoyu,
    雷阵雨并伴有冰雹: yujiabiangbao,
    雨夹雪: yujiaxue,
    中雪: zhongxue,
    中雨: zhongyu,
    阵雨: zhongyu,
    阴: yun,
}

export const getWeatherIcon = (icon: string) => {
    if (weatherIcon[icon]) {
        return weatherIcon[icon]
    }
    return weatherIcon['未知']
}
