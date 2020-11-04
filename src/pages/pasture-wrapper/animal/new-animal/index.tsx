import React from 'react'
import { AweNavPage } from '@/pages/layout/page-nav'
import { Breadcrumb, Form, Input, Select, DatePicker, InputNumber, Button, message } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { SpeciesList } from '@/config'
import { ObjectProps } from '@/types'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { AweRouteProps } from '@/types/route'
import { AweProgress } from '@/components/awe-progress'
import { RouteUris } from '@/router/config'
import axios from 'axios'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
}

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
            message.success('创建成功')
            setLoading(false)
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
            routeProps.history.push(RouteUris.PastureAnimal(routeProps.match.params.id))
        }
    }

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.animal_card}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.add_an_animal}</Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <>
            <AweNavPage nav={nav}>
                <article className="awe-page-wrapper">
                    <section className="awe-page-content">
                        <main className="awe-page__layout awe-display">
                            <section className="awe-display__content">
                                <div className="awe-display-inner">
                                    <header className="awe-display-inner__header">
                                        <label>{useLanguage.basic_information}</label>
                                        <a onClick={() => setIsBatch(!isBatch)}>
                                            {isBatch
                                                ? useLanguage.single_add
                                                : useLanguage.batch_add}
                                        </a>
                                    </header>

                                    <Form className="animal-new-form" form={form} {...layout}>
                                        {isBatch ? (
                                            <FormItem
                                                label={useLanguage.nickname}
                                                rules={[{ required: true }]}
                                                name="generate_nickname"
                                            >
                                                <Select placeholder={useLanguage.select}>
                                                    <Option value={GenerateType.OrderType}>
                                                        {useLanguage.animal_basic}+
                                                        {useLanguage.ordinal_number}
                                                    </Option>
                                                    <Option value={GenerateType.RandomType}>
                                                        {useLanguage.animal_basic}+
                                                        {useLanguage.random_number}
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

                                        <FormItem
                                            label={useLanguage.data_of_birth}
                                            name="birth_date"
                                        >
                                            <DatePicker
                                                placeholder={useLanguage.select}
                                                style={{ width: '100%' }}
                                            />
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
                                            <InputNumber
                                                placeholder={useLanguage.enter_please}
                                                style={{ width: '100%' }}
                                            />
                                        </FormItem>

                                        <FormItem label={useLanguage.remark} name="description">
                                            <Input.TextArea
                                                placeholder={useLanguage.enter_please}
                                            />
                                        </FormItem>
                                    </Form>
                                </div>
                            </section>

                            <footer className="awe-display__footer awe-action-box">
                                <Button onClick={() => routeProps.history.goBack()}>
                                    {useLanguage.back}
                                </Button>
                                <Button loading={loading} type="primary" onClick={handleSubmit}>
                                    {useLanguage.submit}
                                </Button>
                            </footer>
                        </main>
                    </section>
                </article>
            </AweNavPage>

            <AweProgress percent={percent} visible={percentVisible} />
        </>
    )
}

export default NewAnimal
