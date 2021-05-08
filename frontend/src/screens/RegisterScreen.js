import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Container, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction'

import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password doesn't match")
        } else {
            dispatch(register(name, email, password))
        }
        //console.log('object')
    }


    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister
    //console.log('sss', userRegister)
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
            //console.log('sss', redirect)
        }
    }, [history, redirect, userInfo])
    return (
        <Container>
            { message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter ur Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter ur Email'
                        value={email}
                        autoComplete='username'
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter ur Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name='password'
                        autoComplete='new-password'
                    />
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter ur Password again'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        name='password'
                        autoComplete='off'
                    />
                </Form.Group>
                <Button variant='info' type='submit'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                     </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen
