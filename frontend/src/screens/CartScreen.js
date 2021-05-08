import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { sumSubTotal, sumTotalPrice } from '../functions/utils'

const CartScreen = ({ match, history, location }) => {
    //console.log(match)
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    //console.log('s', qty)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    //console.log(cartItems)
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>shopping cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to='/'>Go Back <i style={{ marginTop: '.5rem' }} className="fas fa-arrow-left"></i></Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row style={{ display: 'flex', alignItems: 'center' }} className='py-2'>
                                            <Col className='py-2' md={2}><Image src={item.image} alt={item.name} rounded fluid /></Col>
                                            <Col className='py-2' md={2}><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                            <Col className='py-2' md={2}><strong>${item.price}</strong></Col>
                                            <Col className='py-2' md={2}>
                                                <Form.Control
                                                    as='select'
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(item.product, Number(e.target.value))
                                                        )
                                                    }
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type='button'
                                                    className='btn btn-danger'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({sumSubTotal(cartItems)}) Items</h2>
                            ${sumTotalPrice(cartItems)}
                        </ListGroup.Item>
                        <ListGroupItem>
                            <Button
                                className='btn btn-success btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
