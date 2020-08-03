import React from 'react'
import { ITodo } from '@/pages/page1/store/todo'
import { Button, Space } from 'antd'
import './index.less'

interface IProps {
    todo: ITodo
    onRemove: (id: number) => void
    switchStatus: (id: number) => void
}

export const Todo: React.FC<IProps> = (props: IProps) => {
    return (
        <li className="todo-item">
            <div>
                <div>{props.todo.name}</div>
                <div>{props.todo.desc}</div>
            </div>

            <Space>
                <Button type="primary" onClick={() => props.switchStatus(props.todo.id)}>
                    {props.todo.done ? 'Undone' : 'Done'}
                </Button>

                <Button danger={true} onClick={() => props.onRemove(props.todo.id)}>
                    Delete
                </Button>
            </Space>
        </li>
    )
}
