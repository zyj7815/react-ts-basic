import React from 'react'
import { useLanguage } from '@/language/useLanguage'

const PastureDescription: React.FC = props => {
    return (
        <div className="pasture-description-wrapper">
            <main className="pasture-description-main beauty-radius beauty-shadow">
                <h4 className="awe-primary-title">{useLanguage.pasture_type}</h4>

                <article className="pasture-description__article">
                    <h5 className="beauty-border beauty-radius">圈养牧场</h5>

                    <img
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605846321589&di=ff7bdacf851fca17cfdc9c6c6fe56769&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180106%2F8dedf4fabe5945c6a271ea35d0acba8c.gif"
                        alt=""
                    />

                    <p>
                        孔嬷嬷而儿歌热破口气钱我看博人 靠窗口为 发 的却无法攻破无开发票
                        偶尔我看他如果人, 孔嬷嬷而儿歌热破口气钱我看博人 靠窗口为 发
                        的却无法攻破无开发票 偶尔我看他如果人, 孔嬷嬷而儿歌热破口气钱我看博人
                        靠窗口为 发 的却无法攻破无开发票 偶尔我看他如果人,
                        孔嬷嬷而儿歌热破口气钱我看博人 靠窗口为 发 的却无法攻破无开发票
                        偶尔我看他如果人, 孔嬷嬷而儿歌热破口气钱我看博人 靠窗口为 发
                        的却无法攻破无开发票 偶尔我看他如果人
                    </p>
                </article>
            </main>
        </div>
    )
}

export default PastureDescription
