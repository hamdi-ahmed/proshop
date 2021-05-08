import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FromContainer'
import { fetchSingleProduct } from '../actions/singleProduct'
import { updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'


const ProductEditScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()
    const productId = match.params.id
    //console.log(userId)
    const productDetail = useSelector(state => state.productDetail)
    const { Product: product, error } = productDetail

    const productUpdate = useSelector(state => state.productUpdate)
    const { success: successUpdate, error: errorUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productList')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(fetchSingleProduct(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, productId, product, history, successUpdate])

    const uploadFileHandler = async (e) => {
        //we can access first img, since we upload just one file
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //dispatch update
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }))
    }
    return (
        <Container>
            <Link to='/admin/productList'><Button variant='light'>Go Back</Button></Link>
            {error ? (<Message variant='danger'>{error}</Message>) : (
                <FormContainer>
                    <h1>Edit Product</h1>
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.File
                            id='img-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        >
                            {uploading && <Loader />}
                        </Form.File>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='CountInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                value={countInStock}
                                onChange={e => setCountInStock(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' variant='success'>Update</Button>
                    </Form>
                </FormContainer>
            )}
        </Container>
    )
}

export default ProductEditScreen
