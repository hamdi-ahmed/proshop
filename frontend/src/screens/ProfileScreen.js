import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Button, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserDetails, update } from '../actions/userAction'
import { displayMyOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {
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
            //Dispatch Update Profile 
            dispatch(update({ id: user._id, name, email, password }, 'profile'))
        }
    }

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList

    //console.log(orders)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(displayMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user])
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>User Has been Updated</Message>}
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
                            autoComplete='new-password'
                        />
                    </Form.Group>
                    <Button variant='info' type='submit'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                <Table bordered striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(orders => (
                            <tr key={orders._id}>
                                <td>{orders._id}</td>
                                <td>{orders.createdAt.substring(0, 10)}</td>
                                <td>${orders.totalPrice}</td>
                                <td>{orders.isPaid ? orders.paidAt.substring(0, 10) : <i style={{ color: 'red' }} className='fas fa-times'></i>}</td>
                                <td>{orders.isDelivered ? orders.deliveredAt.substring(0, 10) : <i style={{ color: 'red' }} className='fas fa-times'></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${orders._id}`}>
                                        <Button className='btn-sm' variant='info'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default ProfileScreen
