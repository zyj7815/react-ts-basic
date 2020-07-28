import * as React from 'react'
import { Input, Button } from 'antd'

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
            setAccount({
                ...formData,
                loading: false,
            })
        }, 1000)
    }

    const onSubmit = () => {
        setLoading()
    }

    return { formData, setAccount: { setUsername, setPassword, onSubmit } }
}

const Login: React.FC<FormData> = (props: FormData) => {
    const { formData, setAccount } = useAccount(props)

    return (
        <div>
            <Input onChange={setAccount.setUsername} />
            <Input onChange={setAccount.setPassword} />

            <Button loading={formData.loading} onClick={setAccount.onSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default Login