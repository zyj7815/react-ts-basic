import React from 'react'
import AwePage from '@/components/awe-page'
import './index.less'

const AnimalRecord: React.FC = props => {
    return (
        <AwePage
            bgColor={true}
            className="animal-record-wrapper"
            mainClass="beauty-radius beauty-shadow"
        >
            <ul className="animal-record-main">
                {[1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 16, 22].map(value => (
                    <li className="animal-record__item" key={value}>
                        <div className="animal-record__item--title">title</div>
                        <article className="animal-record__item--remark">
                            <p>
                                备注信息：虚拟虚拟低哦骗人虚拟虚拟低哦骗人虚拟虚拟低哦骗人虚拟虚拟低哦骗人虚拟虚拟低哦骗人
                            </p>
                        </article>
                    </li>
                ))}
            </ul>
        </AwePage>
    )
}

export default AnimalRecord
