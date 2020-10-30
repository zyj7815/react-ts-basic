import React from 'react'
import './index.less'

interface AweNavPageProps {
    nav?: React.ReactNode
    children: React.ReactNode
}

export const AweNavPage: React.FC<AweNavPageProps> = (props: AweNavPageProps) => {
    return (
        <div className="awe-nav-page">
            <section className="awe-nav-wrapper">
                <header className="awe-nav-breadcrumb">{props.nav}</header>
                <article className="awe-nav-content">
                    <section>{props.children}</section>
                </article>
            </section>
        </div>
    )
}
