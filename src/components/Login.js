import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import Message from './common/Message'

import { login } from '../services/appuser.service'

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(undefined)    

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
        setMessage(undefined)

        if(checkBtn.current.context._errors.length === 0) {
            login(username, password).then(
                response=> {
                    console.log(response.data.status.message)
                    setMessage(response.data.status.message)
                    if(response.data.status.code === 200) {
                        props.history.push('/profile')
                        // window.location.reload()
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    return (
        <div className='container'>
            <div className='left login'></div>
            <div className='right'>
                <Form className= 'signup-form' onSubmit={handleLogin} ref={form}>
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
                {message &&
                    <Message alert={message} />
                }
            </div>
        </div>
    )
}

export default Login