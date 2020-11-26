import React from 'react'
import AwePage from '@/components/awe-page'
import { Helper } from '@/helper'
import { Button } from 'antd'
import './index.less'

const AnimalDetail: React.FC = props => {
    const [start, setStart] = React.useState(false)

    return (
        <AwePage>
            <Button onClick={() => setStart(!start)}>{start ? '暂停' : '开始'}</Button>
            <div style={{ marginTop: 20 }}>
                {Helper.generateArr(10).map(val => (
                    <div key={val} className="status-item">
                        <div
                            onClick={() => console.log('删除')}
                            data-delete={start}
                            className={`unit ${start ? `unit-${val % 3}` : ''}`}
                        />

                        <div>状态</div>
                    </div>
                ))}
            </div>
        </AwePage>
    )
}

export default AnimalDetail
