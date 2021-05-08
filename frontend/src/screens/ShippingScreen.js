import React, { useState } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'
import FormContainer from '../components/FromContainer'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shipping } = cart

    const [address, setAddress] = useState(shipping.address)
    const [city, setCity] = useState(shipping.city)
    const [postalCode, setPostalCode] = useState(shipping.postalCode)
    const [country, setCountry] = useState(shipping.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
        //console.log(address, city, postalCode, country)
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        placeholder='Enter ur Address'
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <FormControl
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <FormControl
                        type='number'
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        required
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <FormControl
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    ></FormControl>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
