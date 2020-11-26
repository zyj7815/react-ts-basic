import React from 'react'
import AwePage from '@/components/awe-page'
import { Helper } from '@/helper'
import { createTimeLine } from '@/pages/animal-wrapper/record/data'
import './index.less'

const date2 = [
    [1, 4],
    [2, 11],
    [5, 9],
    [12, 14],
    [21, 24],
]

const AnimalRecord: React.FC = props => {
    const durationRef: any = React.useRef(null)

    React.useEffect(() => {
        const recordData: any = {}

        // 先遍历所以需要画区间的时间轴
        date2.forEach((data, index) => {
            const begin = data[0]
            const end = data[1]

            recordData[`record_${index}`] = {
                level: 1, // level：从右至左起排列，[ level3, level2, level1 ]，依次递增
                last: [], // last：当前时间轴右边是否还有时间轴
                begin,
                end,
            }

            // 生成新的时间轴
            const current = recordData[`record_${index}`]

            // 判断起始时间 是否在某个时间段中间，避免时间轴重叠
            for (const dateIdx in date2) {
                // 当前对比的时间段
                const currentTmp = recordData[`record_${dateIdx}`]

                if (index === parseInt(dateIdx)) {
                    break
                } else {
                    // 如果在这个区间范围内，那么level就要增加
                    if (begin >= date2[dateIdx][0] && begin <= date2[dateIdx][1]) {
                        // 如果这个区间范围之前还有时间段，那么就要判断是否还和上一条重合
                        if (currentTmp.last.length) {
                            // 不仅和上一条区间重合，还和上上条区间重合，那和接着往右移
                            if (begin >= currentTmp.last[0] && begin <= currentTmp.last[1]) {
                                current.level = currentTmp.level + 1
                            } else {
                                // 如果没有上上条重合，那么其实可以比上一条前移一个位置，也不会重叠
                                current.level = currentTmp.level - 1
                            }
                        } else {
                            current.level = current.level + 1
                        }
                        // 因为存在重复的区间段，那么就记录下来
                        current.last = date2[dateIdx]
                    }
                }
            }
        })
        console.log(recordData)

        Object.values(recordData).forEach((record: any) => {
            const start: any = document.getElementById(`record-${record.begin}`)
            const end: any = document.getElementById(`record-${record.end}`)
            createTimeLine(
                durationRef.current,
                end.offsetTop - start.offsetTop,
                start.offsetTop,
                record.level
            )
        })
    }, [durationRef.current])

    return (
        <AwePage
            bgColor={true}
            className="animal-record-wrapper"
            mainClass="beauty-radius beauty-shadow"
        >
            <ul className="animal-record-main">
                {Helper.generateArr(25).map((value, index) => (
                    <li className="animal-record__item" key={value}>
                        <div className="animal-record__item--date">
                            <span id={`record-${value}`}>2020-10-10 10:10:10</span>
                        </div>
                        <div className="animal-record__item--line">
                            <a data-color={value % 5 === 0 ? 'danger' : 'primary'} />
                        </div>
                        <div className="animal-record__item--content">
                            <div className="record-content__title">title-{value}</div>
                            {index !== 24 && (
                                <article className="record-content__remark">
                                    {value % 5 === 0 ? (
                                        <div style={{ height: 40 }} />
                                    ) : (
                                        <p>
                                            备注信息：虚拟虚拟低哦骗人虚拟虚拟低哦骗人虚拟虚拟低哦骗人虚拟虚拟低哦骗人虚拟虚拟低哦骗人
                                        </p>
                                    )}
                                </article>
                            )}
                        </div>
                    </li>
                ))}

                <div className="record-duration" ref={durationRef} />
            </ul>
        </AwePage>
    )
}

export default AnimalRecord
