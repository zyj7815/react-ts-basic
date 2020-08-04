import * as React from 'react'
import { Input, Button, Space } from 'antd'
import { Auth } from '@/auth'
import './index.less'
import { bg_img } from '@/assets/images'

type Account = {
    username: string
    password: string
}

type FormData = {
    account: Account
    loading: boolean
}

const useAccount = (props: FormData) => {
    const [formData, setAccount] = React.useState<FormData>({
        account: props.account,
        loading: props.loading,
    })

    const setUsername = (e: any) => {
        setAccount({
            ...formData,
            account: {
                ...formData.account,
                username: e.target.value,
            },
        })
    }

    const setPassword = (e: any) => {
        setAccount({
            ...formData,
            account: {
                ...formData.account,
                password: e.target.value,
            },
        })
    }

    const setLoading = () => {
        setAccount({
            ...formData,
            loading: true,
        })

        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const onSubmit = () => {
        const date = new Date()
        Auth.setAuth(date.valueOf())
        setLoading()
    }

    return { formData, setAccount: { setUsername, setPassword, onSubmit } }
}

const Login: React.FC = () => {
    // 自定义Hook
    const { formData, setAccount } = useAccount({
        account: { username: '', password: '' },
        loading: false,
    })

    // 相当于 componentDidMount 和 componentDidUpdate:
    React.useEffect(() => {
        console.log('Login Page')
    })

    return (
        <section className="login-wrapper">
            <div className="login-content">
                <Input placeholder="Enter username" onChange={setAccount.setUsername} />
                <Input placeholder="Enter password" onChange={setAccount.setPassword} />

                <Button
                    block={true}
                    type="primary"
                    loading={formData.loading}
                    onClick={setAccount.onSubmit}
                >
                    Login in
                </Button>
            </div>
        </section>
    )
}

export default Login
