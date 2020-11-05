import React from 'react'
import './index.less'

interface ListCardProps {
    children: React.ReactNode
    action?: React.ReactNode
}

const ListCard: React.FC<ListCardProps> = (props: ListCardProps) => {
    return (
        <main className="list-card-wrapper">
            <article className="list-card-content beauty-radius beauty-shadow">
                {props.children}

                {props.action && <span className="list-card-action">{props.action}</span>}
            </article>
        </main>
    )
}

export default ListCard
