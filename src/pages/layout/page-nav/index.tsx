import React from 'react'
import './index.less'

interface AweNavPageProps {
    nav?: React.ReactNode
    children: React.ReactNode
}

export const AweNavPage: React.FC<AweNavPageProps> = (props: AweNavPageProps) => {
    return (
        <main className="awe-nav-page">
            <div style={{ height: 1000 }}>qwdqwd</div>
            {/*<section className="awe-nav-wrapper">*/}
            {/*<header className="awe-nav-breadcrumb">{props.nav}</header>*/}
            {/*<article className="awe-nav-content">{props.children}</article>*/}
            {/*</section>*/}
        </main>
    )
}
