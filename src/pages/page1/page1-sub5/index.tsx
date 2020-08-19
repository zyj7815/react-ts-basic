import * as React from 'react'
import { useCallback } from 'react'

const Authorized: React.FC = () => {
    const [count, setCount] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        console.log('useEffect')
    })

    const handle1 = () => {
        setCount(count + 1)
    }

    const handle2 = useCallback(() => {
        setTotal(total + 1)
    }, [total])

    return (
        <>
            <div>Authorized</div>
            <div>
                count: {count}, total: {total}
            </div>
            <div>
                <button onClick={handle1}>change1</button>
            </div>
            <div>
                <button onClick={handle2}>change2</button>
            </div>
            <div>{Math.random()}</div>
        </>
    )
}

export default React.memo(Authorized)
