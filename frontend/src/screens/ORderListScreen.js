import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { getAllOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    //const [empty, setEmpty] = useState(0)
    const order = useSelector(state => state.order)
    const { error, loading, payload } = order


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllOrders())
        } else {
            history.push('/login')
        }
    }, [history, userInfo, dispatch])
    return (
        <>
            {
                error ? <Message variant='danger'>{error}</Message> :
                    loading ? <Loader />
                        : (
                            <>
                                <h1>Orders</h1>
                                <Table bordered hover responsive striped className='table-sm'  >
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>USER</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th>DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            payload.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>User</td>
                                                    <td>{order.createdAt}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{order.isPaid ? order.paidAt : <i style={{ color: 'red' }} className='fas fa-times'></i>}</td>
                                                    <td>{order.isDelivered ? order.deliveredAt : <i style={{ color: 'red' }} className='fas fa-times'></i>}</td>
                                                    <td><Button className='btn btn-sm' variant='info'><Link style={{ color: '#FFF' }} to={`/order/${order._id}`}>Details</Link></Button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </>
                        )
            }
        </>
    )
}

export default OrderListScreen
