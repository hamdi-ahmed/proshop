import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, orderPaid } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { SET_ORDER_RESET } from '../constants/orderConstants'
//mport { SET_ORDER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const getOrder = useSelector(state => state.getOrder)
    const { singleOrder, error, loading } = getOrder

    const createOrder = useSelector(state => state.createOrder)
    const { createdOrder } = createOrder

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay } = orderPay

    const [sdkReady, setSdkReady] = useState(false)
    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        singleOrder.itemsPrice = addDecimals(
            singleOrder.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        //2- Add Script to body when it load
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!createdOrder || successPay || createdOrder._id !== orderId) {
            dispatch({ type: SET_ORDER_RESET })
            dispatch(getOrderDetails(orderId))
        }
        else if (!createdOrder.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, createdOrder, history, userInfo])
    //console.log(!singleOrder.isPaid)
    //console.log(loadingPay)
    const successPaymentHandler = (paymentResult) => {
        //console.log('ss', paymentResult)
        dispatch(orderPaid(orderId, paymentResult))
    }
    return loading ? <Loader /> : error ? <Message>{error}</Message> : (
        <>
            <h1>Order {singleOrder._id}</h1>
            <Container>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {userInfo?.name}
                                    <strong>, Email: </strong> {userInfo?.email}
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {singleOrder.shippingAddress.address}, {singleOrder.shippingAddress.city}
                              , {singleOrder.shippingAddress.postalCode}, {singleOrder.shippingAddress.country}
                                </p>
                                {
                                    singleOrder.isDelivered ? (
                                        <Message variant='success'>Delivered {singleOrder.deliveredAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Delivered</Message>
                                    )
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <div>
                                    <h2>Payment Method</h2>
                                    <strong>Method: </strong>
                                    {singleOrder.paymentMethod}
                                </div>
                                {
                                    singleOrder.isPaid ? (
                                        <Message variant='success'>Paid on {singleOrder.paidAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Paid</Message>
                                    )
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Order Items</h2>
                                <ListGroup variant='flush'>
                                    {
                                        singleOrder.orderItems.map((item, index) => (
                                            <ListGroupItem key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} rounded fluid />
                                                    </Col>
                                                    <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))
                                    }
                                </ListGroup>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem><h2>Order Summery</h2></ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${singleOrder.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${singleOrder.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${singleOrder.taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${singleOrder.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                {!singleOrder.isPaid && (
                                    <ListGroup.Item>

                                        {sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={singleOrder.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderScreen
