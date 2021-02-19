import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import { signup, login } from '../services/appuser.service'

const Signup = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email)
    }

    const handleSignup = e => {
        e.preventDefault()
        form.current.validateAll()

        if(checkBtn.current.context._errors.length === 0) {
            signup(username, email, password).then(
                response => {
                    console.log(response.data)
                    login(username, password).then(
                        () => {
                            props.history.push('/profile')
                            window.location.reload()
                        },
                        error => {
                            console.log(error)
                        }
                    )
                }
            )
        }
    }

    return (
        <div>
            <Form onSubmit={handleSignup} ref={form}>
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
                    <label htmlFor='email'>Email</label>
                    <Input
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={onChangeEmail}
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

                <button>Sign Up</button>
                <CheckButton style={{display: 'none'}} ref={checkBtn}/>
            </Form>
        </div>
    )
}

export default Signup