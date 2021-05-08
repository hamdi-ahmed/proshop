import React, { useEffect } from 'react'
import { Col, Row, Card, Image, ListGroup, Button, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import { creatingOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const createOrder = useSelector(state => state.createOrder)
    const { createdOrder, error, success } = createOrder

    const placeHolderHandler = () => {
        dispatch(creatingOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shipping,
            paymentMethod: cart.payment,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)
    useEffect(() => {
        if (success) {
            // eslint-disable-next-line
            history.push(`/order/${createdOrder._id}`)
            // eslint-disable-next-line
        }
    }, [history, success, createdOrder])
    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p className='ml-3'>
                                <strong>Address: </strong>
                                {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.country},
                             </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment</h2>
                            <p className='ml-3'>
                                <strong>Method: </strong>
                                {cart.payment}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            {
                                cart.cartItem === 0 ? <Message variant='danger'>Your cart is empty</Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            <h2>Order Items</h2>
                                            {
                                                cart.cartItems.map((item, index) => (
                                                    <ListGroupItem key={index}>
                                                        <Row className='mb-2'>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col>
                                                                <Link className='links' to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                ))
                                            }
                                        </ListGroup>
                                    )
                            }
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    variant='success'
                                    className='btn btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeHolderHandler}
                                >Order</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
