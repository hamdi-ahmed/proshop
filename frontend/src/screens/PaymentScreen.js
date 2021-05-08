import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { savePaymentAddress } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shipping } = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    if (!shipping) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentAddress(paymentMethod))
        history.push('/placeOrder')
    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                            id='payPal'
                            name='paymentMethod'
                            label='PayPal or Credit Card'
                            checked
                        />
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button className='btn btn-small' variant='primary' type='submit'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
