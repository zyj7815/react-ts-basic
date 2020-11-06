import React from 'react'
import { Button, Table, Pagination } from 'antd'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import { PlusCircleOutlined } from '@ant-design/icons'
import { pastureColumns } from '@/pages/main-wrapper/pasture/columns'
import { useLanguage } from '@/language/useLanguage'

const MainPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const handleDetail = () => {
        routeProps.history.push(RouteUris.PastureAnimal('1293809'))
    }

    return (
        <div className="awe-normal-page">
            <main className="awe-normal-main">
                <header className="awe-normal__header beauty-shadow">
                    <span>{useLanguage.pasture_list}</span>
                    <Button icon={<PlusCircleOutlined />} onClick={handleDetail}>
                        {useLanguage.new_pasture}
                    </Button>
                </header>

                <section className="awe-normal__content">
                    <Table columns={pastureColumns()} pagination={false} />
                </section>

                <footer className="awe-normal__footer">
                    <Pagination />
                </footer>
            </main>
        </div>
    )
}

export default MainPasture
