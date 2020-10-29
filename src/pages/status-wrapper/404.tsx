import React from 'react'

const NoMatch: React.FC = () => {
    // 重定向到 root 页面
    if (window.location.hash === '#/') {
        window.location.href = '#/root'
        return <div />
    }

    return <div>404</div>
}

export default NoMatch
