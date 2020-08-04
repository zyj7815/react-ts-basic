import * as React from 'react'
import { Button } from 'antd'
import { DECREMENT_COUNT, INCREMENT_COUNT, sub4Reducer } from '@/pages/page1/page1-sub4/reducer'

const PageReducer: React.FC = () => {
    const [state, dispatch] = React.useReducer(sub4Reducer, { count: 0 })

    return (
        <div>
            <h4>Count: {state.count}</h4>
            <div>
                <Button onClick={() => dispatch({ type: INCREMENT_COUNT })}>+</Button>
                <Button onClick={() => dispatch({ type: DECREMENT_COUNT })}>-</Button>
            </div>
        </div>
    )
}

export default PageReducer
