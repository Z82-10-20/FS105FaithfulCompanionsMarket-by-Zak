import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import Navbar from '../components/Navbar';
import "../styles/Login.css";
import CheckoutSteps from '../components/CheckoutStep';
const ShippingPage = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const submitHandler = (e) => {
e.preventDefault();
dispatch(saveShippingAddress({ address, city, postalCode, country}));
  navigate('/payment');
};

 const handleBack = () => {
    navigate('/Cart');
  };

  return (
   
    <div >
<Navbar />
    <FormContainer className='mt-5'>
    <div className='mt-5'>Blank</div>
    <h1 className='mt-5'>Shipping</h1>
    <CheckoutSteps step1 step2 />
    
    <Form onSubmit={submitHandler}>
<Form.Group controlId='address' className='my-2'>
    <Form.Label>Address:</Form.Label>
    <Form.Control
    type='text'
    placeholder='Enter address'
    value={address}
    onChange={(e) => setAddress(e.target.value)}>
    </Form.Control>
</Form.Group>
    
  
      <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>


<Form.Group controlId='postalCode' className='my-2'>
    <Form.Label>Postal Code:</Form.Label>
    <Form.Control
    type='text'
    placeholder='Enter postal code'
    value={postalCode}
    onChange={(e) => setPostalCode(e.target.value)}>
    </Form.Control>
</Form.Group>

<Form.Group controlId='country' className='my-2'>
    <Form.Label>Country:</Form.Label>
    <Form.Control
    type='text'
    placeholder='Enter Country'
    value={country}
    onChange={(e) => setCountry(e.target.value)}>
    </Form.Control>
</Form.Group>

<Button type='submit' className='custom-Shipping my-2'>
Continue
</Button>

<Button type='back' className="custom-Shipping ms-2" onClick={handleBack}>
Back
</Button>
    </Form>
    </FormContainer>
    </div>
  )
}

export default ShippingPage