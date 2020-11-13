import React from 'react'
import { AweRouteProps } from '@/types/route'
import { Row, Col, Button } from 'antd'
import './company.less'
import { useLanguage } from '@/language/useLanguage'
import { RouteUris } from '@/router/config'

const MainCompany: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const companyEdit = () => {
        routeProps.history.push(RouteUris.CompanyEdit)
    }
    return (
        <div id={'companyInfo'}>
            <div className={'content'}>
                <Row>
                    <Col xl={7} lg={12} md={12} sm={24}>
                        <div className={'colContent'}>
                            <div className={'topBox'}>
                                <div className={'title'}>{useLanguage.company_name}</div>
                                <div className={'text'}>成都德鲁伊科技</div>
                            </div>
                            <div className={'bottomBox'}>
                                <div className={'title'}>{useLanguage.company_email}</div>
                                <div className={'text'}>成都德鲁伊科技</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={7} lg={12} md={12} sm={24}>
                        <div className={'colContent'}>
                            <div className={'topBox'}>
                                <div className={'title'}>{useLanguage.work_phone}</div>
                                <div className={'text'}>成都德鲁伊科技</div>
                            </div>
                            <div className={'bottomBox'}>
                                <div className={'title'}>{useLanguage.language_configuration}</div>
                                <div className={'text'}>成都德鲁伊科技</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={10} lg={24} md={24} sm={24}>
                        <div className={'colContent'}>
                            <div className={'topBox'}>
                                <div className={'title'}>{useLanguage.company_address}</div>
                                <div className={'text'}>四川省成都市天府三街1325号</div>
                            </div>
                            <div className={'bottomBox'}>
                                <div className={'title'}>{useLanguage.time_zone}</div>
                                <div className={'text'}>成都德鲁伊科技</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Button type="primary" className={'editBtn'} onClick={companyEdit}>
                    {useLanguage.edit_information}
                </Button>
            </div>
        </div>
    )
}

export default MainCompany
