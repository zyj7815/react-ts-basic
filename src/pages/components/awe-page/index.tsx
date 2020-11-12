import React from 'react'
import './index.less'

interface AwePageProps {
    hdColor?: boolean
    bgColor?: boolean
    ftColor?: boolean
    noPadding?: boolean // wrapper是否带padding
    isHPadding?: boolean
    isHShadow?: boolean // header是否带阴影
    nav?: React.ReactNode
    header?: React.ReactNode
    footer?: React.ReactNode
    children: React.ReactNode
}

const AwePage: React.FC<AwePageProps> = (props: AwePageProps) => {
    return (
        <div className="awe-page-wrapper" data-padding={props.noPadding}>
            <nav className="awe-page__nav">{props.nav}</nav>
            <main className="awe-page__main">
                {props.header && (
                    <header
                        data-shadow={props.isHShadow}
                        data-padding={props.isHPadding}
                        className="awe-page__main-header"
                        style={{ backgroundColor: props.hdColor ? '#fff' : '' }}
                    >
                        {props.header}
                    </header>
                )}

                <section
                    className="awe-page__main-content"
                    style={{ backgroundColor: props.bgColor ? '#fff' : '' }}
                >
                    {props.children}
                </section>

                {props.footer && (
                    <footer
                        className="awe-page__main-footer"
                        style={{ backgroundColor: props.ftColor ? '#fff' : '' }}
                    >
                        {props.footer}
                    </footer>
                )}
            </main>
        </div>
    )
}

export default AwePage
