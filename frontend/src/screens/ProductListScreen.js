import React, { useEffect } from 'react'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct, deleteProduct, creatingProduct } from '../actions/productAction'
import { Table, Button, Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { SET_CREATE_PRODUCT_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { products, error, pages, pageNumber: page } = productList

    const productReducer = useSelector(state => state.productReducer)
    const { success: successDelete, error: errorDelete } = productReducer

    const createProduct = useSelector(state => state.createProduct)
    const { success: successCreate, error: errorCreate, product: createdProduct } = createProduct

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const createProductHandler = () => {
        //dispatch
        dispatch(creatingProduct())
    }
    useEffect(() => {
        dispatch({ type: SET_CREATE_PRODUCT_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProduct('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const handleDelete = (id) => {
        //delete Product 
        dispatch(deleteProduct(id))
    }

    return (
        <>
            <Row className='algin-items-center'>
                <div>
                    {errorDelete && <Message variant='danger'>{error}</Message>}
                    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                </div>
                <Col>
                    <h1>Create Product</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3 btn btn-success' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {
                error ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Container>
                            <h1>Products</h1>
                            <Table striped hover bordered responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td style={{ display: 'flex' }}>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button className='btn btn-sm mr-1 ' variant='light'><i className="fas fa-edit"></i></Button>
                                                </LinkContainer>
                                                <Button onClick={() => handleDelete(product._id)} className='btn btn-sm ' variant='danger'><i className="fas fa-times"></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </Container>
                    )
            }

        </>
    )
}

export default ProductListScreen
