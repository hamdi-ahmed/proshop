import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { login } from '../actions/userAction'

import Message from '../components/Message'

const LoginScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    //console.log(userLogin)
    const { userInfo, error } = userLogin
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    return (
        <>
            <h1>sign in</h1>
            {
                error ? (<Message variant='danger'>
                    {error}, Please Back to <a href='/login'>Login</a> Page and try again.
                </Message>
                ) :
                    (
                        <Container>
                            <Form onSubmit={handleClick}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        autoComplete='username'
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        name='password'
                                        autoComplete='new-password'
                                    />
                                </Form.Group>
                                <Button variant="info" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <Row className='py-3'>
                                <Col>
                                    New Customer?{' '}
                                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                        Register
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    )
            }
        </>
    )
}

export default LoginScreen
