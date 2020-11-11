import * as React from 'react'
import { Input, Button, Checkbox, Radio, Form, message } from 'antd'
import { sha256 } from 'js-sha256'
import { RouteUris } from '@/router/config'
import { LoginImg, Logo } from '@/assets/images'
import { Token } from '@/server/token'
import axios from 'axios'
import { Api } from '@/server/api'
import './index.less'

const Login: React.FC = () => {
    if (Token.auth) {
        window.location.href = `#${RouteUris.MainPasture}`
        return <div />
    }

    const [loading, setLoading] = React.useState(false)

    /**
     * 提交数据
     * @param values
     */
    const onSubmit = (values: any) => {
        const data = {
            username: values.username,
            password: sha256(`${values.username} + druid + ${values.password} + heifeng`),
        }

        setLoading(true)

        axios
            .post(Api.login, data)
            .then(res => {
                message.success((window as any).language.login_success)

                const token = res.headers['x-druid-authentication']
                Token.setToken(token, values.remember)

                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
        <section className="login-wrapper">
            <header className="login-header">
                <img src={Logo} alt="" />

                <Radio.Group>
                    <Radio.Button value="0">中</Radio.Button>
                    <Radio.Button value="1">En</Radio.Button>
                </Radio.Group>
            </header>

            <section className="login-content">
                <img src={LoginImg} alt="" className="login-img" />

                <div className="login-content__action">
                    <h2>{(window as any).language.login}</h2>

                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                            username: 'newuser',
                            password: 'newuser1',
                        }}
                        onFinish={onSubmit}
                    >
                        <Form.Item name="username">
                            <Input placeholder="Enter username" style={{ height: 45 }} />
                        </Form.Item>

                        <Form.Item name="password">
                            <Input.Password style={{ height: 45 }} placeholder="Enter password" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>{(window as any).language.remember_password}</Checkbox>
                        </Form.Item>

                        <Button block={true} type="primary" htmlType="submit" loading={loading}>
                            {(window as any).language.login}
                        </Button>
                    </Form>
                </div>
            </section>

            <footer className="login-footer">
                <span>成都德鲁伊科技有限公司</span>
                <span>Druid Technology Co. Ltd.</span>
            </footer>
        </section>
    )
}

export default Login
