import React from 'react'
import { Breadcrumb, Form, Input, Select, DatePicker, InputNumber, Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { formFullLayout, SpeciesList } from '@/config'
import { ObjectProps } from '@/types'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { AweRouteProps } from '@/types/route'
import { AweProgress } from '@/components/awe-progress'
import { RouteUris } from '@/router/config'
import AnimalSuccessModal from './success-modal'
import axios from 'axios'
import AwePage from '@/components/awe-page'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option

// 批量生成生物的昵称类型
enum GenerateType {
    OrderType = 1, // 顺序添加
    RandomType, // 昵称添加
}

const NewAnimal: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    // 是否批量新建
    const [isBatch, setIsBatch] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [percent, setPercent] = React.useState(0)
    const [percentVisible, setPercentVisible] = React.useState(false)
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [form] = Form.useForm()

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            // 单个创建
            if (!isBatch) {
                onCreateSingle({
                    ...values,
                    // weight是number类型
                    weight: values.weight ? parseInt(values.weight) : values.weight,
                })
            }
            // 批量创建
            else {
                // 建立卡片的数量
                const number = values.number
                const newAnimalList: any[] = []

                // 顺序生成
                if (values.generate_nickname === GenerateType.OrderType) {
                    Array.from(new Array(number).keys()).forEach(index => {
                        newAnimalList.push({
                            ...values,
                            nickname: `${useLanguage.animal_basic}(${index})`,
                        })
                    })
                }
                // 随机生成
                else {
                    Array.from(new Array(number).keys()).forEach(() => {
                        newAnimalList.push({
                            ...values,
                            nickname: `${useLanguage.animal_basic}(${Math.round(
                                Math.random() * 100000
                            )})`,
                        })
                    })
                }

                if (newAnimalList.length === 1) {
                    // 如果只有一个生物，那么还是单个生物创建的逻辑
                    onCreateSingle(newAnimalList[0])
                } else {
                    // 显示进度条
                    setPercentVisible(true)
                    // 添加多个
                    onCreateMulti(JSON.parse(JSON.stringify(newAnimalList)), newAnimalList.length)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 创建单个生物
     * @param data
     */
    const onCreateSingle = async (data: any) => {
        setLoading(true)
        try {
            await axios.post(Api.biological.new, data, Token.data)
            setLoading(false)
            setSuccessVisible(true)
        } catch (err) {
            setLoading(false)
            errorMessage.alert(err)
        }
    }

    /**
     * 创建多个生物
     * @param dataList
     * @param total 创建总数
     */
    const onCreateMulti = async (dataList: any[], total: number) => {
        if (dataList.length > 0) {
            // 取当前数组第一个生物对象
            const data = dataList.shift()

            try {
                await axios.post(Api.biological.new, data, Token.data)
                setPercent(((total - dataList.length) / total) * 100)
                onCreateMulti(dataList, total)
            } catch (e) {
                setPercent(((total - dataList.length) / total) * 100)
                onCreateMulti(dataList, total)
            }
        } else {
            // 创建完成
            setPercentVisible(false)
            goToAnimalList()
        }
    }

    /**
     * 跳转到生物列表
     */
    const goToAnimalList = () => {
        routeProps.history.push(RouteUris.PastureAnimal(routeProps.match.params.id))
    }

    /**
     * 跳转到生物详情
     */
    const goToAnimalDetail = () => {
        // routeProps.history.push()
    }

    /**
     * 跳转到生物绑定设备
     */
    const goToBoundDevice = () => {
        // routeProps.history.push()
    }

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.animal_card}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.add_an_animal}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const header = (
        <>
            <h4>{useLanguage.basic_information}</h4>
            <a onClick={() => setIsBatch(!isBatch)}>
                {isBatch ? useLanguage.single_add : useLanguage.batch_add}
            </a>
        </>
    )

    const footer = (
        <footer className="awe-footer-action">
            <Button onClick={() => routeProps.history.goBack()}>{useLanguage.back}</Button>
            <Button loading={loading} type="primary" onClick={handleSubmit}>
                {useLanguage.submit}
            </Button>
        </footer>
    )

    return (
        <AwePage
            nav={nav}
            header={header}
            footer={footer}
            isFBorder={true}
            isHShadow={true}
            isHPadding={true}
            bgColor={true}
        >
            <Form className="animal-new-form" form={form} {...formFullLayout}>
                {isBatch ? (
                    <FormItem
                        label={useLanguage.nickname}
                        rules={[{ required: true }]}
                        name="generate_nickname"
                    >
                        <Select placeholder={useLanguage.select}>
                            <Option value={GenerateType.OrderType}>
                                {useLanguage.animal_basic}+{useLanguage.ordinal_number}
                            </Option>
                            <Option value={GenerateType.RandomType}>
                                {useLanguage.animal_basic}+{useLanguage.random_number}
                            </Option>
                        </Select>
                    </FormItem>
                ) : (
                    <FormItem
                        label={useLanguage.nickname}
                        name="nickname"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder={useLanguage.select} />
                    </FormItem>
                )}

                {isBatch && (
                    <FormItem
                        label={useLanguage.batch_add_animal_num}
                        name="number"
                        rules={[
                            { required: true },
                            {
                                type: 'number',
                                min: 1,
                                message: useLanguage.enter_valid_params,
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder={useLanguage.enter_please}
                            style={{ width: '100%' }}
                        />
                    </FormItem>
                )}

                <FormItem label={useLanguage.species} name="species">
                    <Select placeholder={useLanguage.select}>
                        {SpeciesList.map((species: ObjectProps) => (
                            <Option key={species.key} value={species.key}>
                                {species.value}
                            </Option>
                        ))}
                    </Select>
                </FormItem>

                <FormItem label={useLanguage.gender} name="gender">
                    <Select placeholder={useLanguage.select}>
                        <Option value={1}>{useLanguage.male}</Option>
                        <Option value={2}>{useLanguage.female}</Option>{' '}
                    </Select>
                </FormItem>

                <FormItem label={useLanguage.data_of_birth} name="birth_date">
                    <DatePicker placeholder={useLanguage.select} style={{ width: '100%' }} />
                </FormItem>

                <FormItem
                    name="weight"
                    label={`${useLanguage.weight} (kg)`}
                    rules={[
                        {
                            type: 'number',
                            min: 1,
                            message: useLanguage.enter_valid_params,
                        },
                    ]}
                >
                    <InputNumber placeholder={useLanguage.enter_please} style={{ width: '100%' }} />
                </FormItem>

                <FormItem label={useLanguage.remark} name="description">
                    <Input.TextArea placeholder={useLanguage.enter_please} />
                </FormItem>
            </Form>
            <AweProgress percent={percent} visible={percentVisible} />
            <AnimalSuccessModal
                visible={successVisible}
                onMainEvent={goToBoundDevice}
                onSubEvent={goToAnimalDetail}
                onClose={goToAnimalList}
            />
        </AwePage>
    )
}

export default NewAnimal
