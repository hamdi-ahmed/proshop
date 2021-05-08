import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FromContainer'
import { getUserInfo, userUpdateProfile } from '../actions/userAction'
import { SET_USER_UPDATE_RESET } from '../constants/userConstant'
import Message from '../components/Message'
const EditUserScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const userId = match.params.id
    console.log(userId)
    const userInformation = useSelector(state => state.userInformation)
    const { user, error } = userInformation
    const userUpdateFromAdmin = useSelector(state => state.userUpdateFromAdmin)
    const { success: successUpdate, error: errorUpdate } = userUpdateFromAdmin
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SET_USER_UPDATE_RESET })
            history.push('/admin/userList')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserInfo(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }

        }

    }, [dispatch, userId, successUpdate, history, user])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userUpdateProfile(userId, { name, email, isAdmin }))
    }
    return (
        <Container>
            <Link to='/admin/userList'><Button variant='light'>Go Back</Button></Link>
            {successUpdate && <Message variant='success'>User is updated successfully</Message>}
            {errorUpdate && <Message variant='danger'>{error}</Message>}
            <FormContainer>
                <h1>Edit User</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='isAdmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='success'>Update</Button>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default EditUserScreen
