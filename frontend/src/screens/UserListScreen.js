import React, { useEffect } from 'react'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, deleteUser } from '../actions/userAction'
import { Table, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDeleted = useSelector(state => state.userDeleted)
    const { success: successDeleted } = userDeleted

    const userList = useSelector(state => state.userList)
    const { users, error } = userList
    //console.log(userList)
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDeleted])

    const handleDelete = (id) => {
        dispatch(deleteUser(id))
    }

    return (
        <>
            {
                error ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Container>
                            <h1>Users</h1>
                            <Table striped hover bordered responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.isAdmin ?
                                                        (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                                        : <i style={{ color: 'red' }} className="fas fa-times"></i>}
                                            </td>
                                            <td>
                                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                    <Button className='btn btn-sm mr-1 ' variant='light'><i className="fas fa-edit"></i></Button>
                                                </LinkContainer>
                                                <Button onClick={() => handleDelete(user._id)} className='btn btn-sm ' variant='danger'><i className="fas fa-times"></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    )
            }

        </>
    )
}

export default UserListScreen
