import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { ITodo, STORE_TODO, TodoStore } from '@/pages/page1/store/todo'
import { Todo } from '@/components/todo'
import { Button } from 'antd'

@inject(STORE_TODO)
@observer
class PageSub2 extends React.Component<{ [STORE_TODO]: TodoStore }> {
    public componentDidMount(): void {}

    public addNewTodo = () => {
        this.props[STORE_TODO].addNewTodo()
    }

    public render(): React.ReactNode {
        const { todos, doneCount, undoneCount } = this.props[STORE_TODO]

        return (
            <div>
                <header>
                    <h4>Class</h4>
                    <Button onClick={this.addNewTodo}>Add New</Button>

                    <div>Done: {doneCount}</div>
                    <div>Undone: {undoneCount}</div>
                </header>

                <ul>
                    {todos.map((todo: ITodo) => {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onRemove={this.props[STORE_TODO].removeById}
                                switchStatus={this.props[STORE_TODO].toggleStatusById}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default PageSub2
