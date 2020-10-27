import React from 'react'

const HooksMemo: React.FC = () => {
    const [time, setTime] = React.useState<number>(0)
    const [random, setRandom] = React.useState<number>(0)

    return (
        <div>
            <button onClick={() => setTime(new Date().getTime())}>获取当前时间</button>
            <button onClick={() => setRandom(Math.random())}>获取当前随机数</button>
            <Show time={time}>{random}</Show>
        </div>
    )
}

type Data = {
    time: number
    children: React.ReactNode
}

// 子组件
const Show: React.FC<Data> = ({ time, children }: Data) => {
    React.useEffect(() => {
        console.log('effect function here...')
    }, [time])

    const changeTime = (time: number): string => {
        console.log('changeTime excuted...')
        return new Date(time).toISOString()
    }

    const newTime: string = React.useMemo(() => {
        return changeTime(time)
    }, [time])

    return (
        <div>
            <p>Time is: {newTime}</p>
            <p>Random is: {children}</p>
        </div>
    )
}

export default HooksMemo
