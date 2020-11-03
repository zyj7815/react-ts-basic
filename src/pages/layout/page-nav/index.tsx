import React from 'react'
import './index.less'

interface AweNavPageProps {
    nav?: React.ReactNode
    children: React.ReactNode
}

export const AweNavPage: React.FC<AweNavPageProps> = (props: AweNavPageProps) => {
    return (
        <main className="awe-nav-page">
            <section className="awe-nav-wrapper">
                <header className="awe-nav-breadcrumb">{props.nav}</header>
                <main className="awe-nav-content">{props.children}</main>
            </section>
        </main>
    )
}
