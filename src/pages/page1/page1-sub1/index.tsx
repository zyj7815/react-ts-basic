import * as React from 'react'
import { observer } from 'mobx-react'
import { useTodoStore } from '@/store'
import { Todo } from '@/components/todo'
import { ITodo } from '@/pages/page1/store/todo'
import { Button } from 'antd'

const PageSub1: React.FC = () => {
    const {
        todos,
        undoneCount,
        doneCount,
        addNewTodo,
        removeById,
        toggleStatusById,
    } = useTodoStore()

    return (
        <div>
            <header>
                <h4>Hook</h4>
                <Button onClick={addNewTodo}>Add New</Button>

                <div>Done: {doneCount}</div>
                <div>Undone: {undoneCount}</div>
            </header>

            <ul>
                {todos.map((todo: ITodo) => {
                    return (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            onRemove={removeById}
                            switchStatus={toggleStatusById}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default observer(PageSub1)
