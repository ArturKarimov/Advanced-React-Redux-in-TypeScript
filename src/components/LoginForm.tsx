import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()

    const submit = () => {
        login(username, password)
    }

    return (
        <Form name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 30 }}
              onFinish={submit}
        >
            { error && <div style={{color: 'red'}}>
                {error}
            </div> }
            <Form.Item
                wrapperCol={{span: 30}}
                label="Логин"
                name="username"
                rules={[rules.required('Пожалуйста введите имя пользователя')]}
            >
                <Input value={username}
                       onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{span: 30 }}
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста введите пароль')]}
            >
                <Input value={password}
                       onChange={e => setPassword(e.target.value)}
                       type={'password'}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm