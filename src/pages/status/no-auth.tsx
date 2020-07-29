import * as React from 'react'

interface IProps {
    params: string
}

export const NoAuth: React.FC<IProps> = (props: IProps) => {
    return <div>NoAuth</div>
}
