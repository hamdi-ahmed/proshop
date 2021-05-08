import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleProduct } from '../actions/singleProduct'
import { addReview } from '../actions/productAction'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Card, Image, ListGroup, Col, Row, ListGroupItem, Form, Button } from 'react-bootstrap'
import Review from '../components/Review'
//import Meta from '../components/Meta'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    //console.log('ss', productDetail)
    const { Product, err } = productDetail

    const productReview = useSelector(state => state.productReview)
    const { success: successReview, loading: loadingReview } = productReview

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (successReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(fetchSingleProduct(match.params.id))
    }, [dispatch, match, successReview])
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            addReview(match.params.id, {
                rating,
                comment,
            })
        )
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {

                err ? (
                    <Message variant='danger'>{err}</Message>
                ) :
                    (
                        <>
                            <Row>
                                <Col md={6}>
                                    <Image src={Product.image} alt={Product.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{Product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Review
                                                rating={Product.rating}
                                                text={` ${Product.numReviews}reviews`}
                                                color='yellow'
                                            />
                                        </ListGroup.Item>
                                        <ListGroupItem>
                                            Price:
                                <strong> ${Product.price}</strong>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Description:
                                {Product.description}
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col><strong>${Product.price}</strong></Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col><strong>{Product.countInStock === 0 ? 'Unavailable' : 'InStock'}</strong></Col>
                                                </Row>
                                            </ListGroupItem>
                                            {Product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {[...Array(Product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroupItem>
                                                <button
                                                    className='btn btn-dark btn-block'
                                                    disabled={Product.countInStock === 0}
                                                    onClick={addToCartHandler}
                                                >
                                                    Add To Cart
                                            </button>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h2>Reviews</h2>
                                    {Product.reviews.length === 0 && <Message>No Reviews</Message>}
                                    <ListGroup variant='flush'>
                                        {Product.reviews.map((review) => (
                                            <ListGroupItem key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Review color='yellow' rating={review.rating} />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroupItem>
                                        ))}
                                        <ListGroupItem>
                                            <h2>Write a Customer Review</h2>
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='3'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>
                                            ) : <Message>Please <Link to='/login'>Login</Link> to write a review </Message>}
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </>
                    )}
        </>
    )
}

export default ProductScreen
