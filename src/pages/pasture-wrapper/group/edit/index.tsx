import React from 'react'
import { Breadcrumb, Form, Input, Avatar, Row, Col, Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { AnimalProps, GroupProps } from '@/types/common'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import CardItem from '@/pages/components/card-item-wrapper'
import { ServerRequest } from '@/server/request'
import { animalProfile } from '@/assets/images'
import axios from 'axios'
import './index.less'
import AwePage from '@/pages/components/awe-page'

const FormItem = Form.Item

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
}

const cardLayout = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 4,
    xxl: 4,
}

const GroupEdit: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { groupId } = routeProps.match.params
    const [form] = Form.useForm()
    const [group, setGroup] = React.useState<GroupProps | null>(null)
    const [selectedAnimal, setSelectedAnimal] = React.useState<AnimalProps[]>([])
    const [noGroupAnimal, setNoGroupAnimal] = React.useState<AnimalProps[]>([])

    React.useEffect(() => {
        fetchGroupData()
        fetchAnimalData()
        fetchNoGroupAnimalData()
    }, [])

    const fetchGroupData = async () => {
        try {
            const res: any = await axios.get(Api.group.detail(groupId), Token.data)
            setGroup(res.data)
            form.setFieldsValue({
                room_name: res.data.room_name,
                description: res.data.description || '',
            })
        } catch (err) {
            errorMessage.alert(err)
        }
    }

    /**
     * 获取已绑定生物
     */
    const fetchAnimalData = async () => {
        try {
            const res = await axios.get(Api.group.biological(groupId), Token.pageToken(999))
            setSelectedAnimal(res.data)
        } catch (err) {
            errorMessage.alert(err)
        }
    }

    /**
     * 拉取没有分组的生物
     */
    const fetchNoGroupAnimalData = async () => {
        try {
            const res = await axios.get(Api.group.idle, Token.pageToken(999))
            setNoGroupAnimal(res.data)
            console.log(res.data)
        } catch (err) {
            errorMessage.alert(err)
        }
    }

    /**
     * 更新分组信息
     */
    const handleUpdateGroup = async () => {
        try {
            const values = await form.validateFields()

            try {
                await axios.put(Api.group.detail(groupId), values, Token.data)
                routeProps.history.goBack()
            } catch (err) {
                errorMessage.alert(err)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleAnimalCard = (id: string, isAdd: boolean) => {}

    const nav = (
        <Breadcrumb>
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.group_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{group ? group.room_name : ''}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.edit_group}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const formHeader = (
        <div className="group-edit-form beauty-shadow">
            <Form form={form} {...layout}>
                <FormItem
                    label={useLanguage.group_name}
                    name="room_name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </FormItem>
                <FormItem label={useLanguage.remark} name="description">
                    <Input.TextArea />
                </FormItem>
            </Form>

            <Button onClick={handleUpdateGroup}>{useLanguage.confirm}</Button>
        </div>
    )

    return (
        <AwePage nav={nav} header={formHeader}>
            <main className="group-edit-content">
                <h4>{useLanguage.selected}</h4>

                <Row>
                    {selectedAnimal.map((animal: AnimalProps) => (
                        <Col
                            {...cardLayout}
                            key={animal.id}
                            onClick={() => handleAnimalCard(animal.id, false)}
                        >
                            <GroupAnimalCard animal={animal} />
                        </Col>
                    ))}
                </Row>

                <h4>{useLanguage.not_selected}</h4>

                <Row>
                    {noGroupAnimal.map((animal: AnimalProps) => (
                        <Col
                            {...cardLayout}
                            key={animal.id}
                            onClick={() => handleAnimalCard(animal.id, true)}
                        >
                            <GroupAnimalCard animal={animal} />
                        </Col>
                    ))}
                </Row>
            </main>
        </AwePage>
    )
}

const GroupAnimalCard: React.FC<{ animal: AnimalProps }> = (props: { animal: AnimalProps }) => {
    const { animal } = props

    return (
        <CardItem>
            <div className="group-animal-item-wrapper">
                <aside>
                    <Avatar
                        size={35}
                        src={
                            animal.images
                                ? ServerRequest.getImgUrl(animal.images[0], animal.id, true)
                                : animalProfile
                        }
                    />
                </aside>
                <main>
                    <header>{animal.nickname}</header>
                    <label>
                        {useLanguage.device}：{animal.mark || '-'}
                    </label>
                    <label>
                        {useLanguage.sn}：{animal.sn || '-'}
                    </label>
                </main>
            </div>
        </CardItem>
    )
}

export default GroupEdit
