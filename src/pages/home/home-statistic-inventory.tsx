import * as React from 'react'

interface IProps {
    params: string
}

export const HomeInventory: React.FC<IProps> = (props: IProps) => {
    console.log(props.params)
    return <div>HomeInventory</div>
}
