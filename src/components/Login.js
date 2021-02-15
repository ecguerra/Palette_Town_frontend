import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { login } from '../services/appuser.service'

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    

    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = e => {
        e.preventDefault()
        form.current.validateAll()

        if(checkBtn.current.context._errors.length === 0) {
            login(username, password).then(
                response=> {
                    console.log(response.data)
                    props.history.push('/profile')
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    return (
        <div>
            <Form onSubmit={handleLogin} ref={form}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <Input
                        type='text'
                        name='username'
                        value={username}
                        placeholder='Username'
                        onChange={onChangeUsername}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        onChange={onChangePassword}
                    />
                </div>

                <button>Login</button>
                <CheckButton style={{display: 'none'}} ref={checkBtn}/>
            </Form>
        </div>
    )
}

export default Login