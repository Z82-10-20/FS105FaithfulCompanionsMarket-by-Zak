import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import FormContainer from '../../components/FormContainer'
import {
  useUpdateBirdMutation,
  useGetBirdDetailsQuery,
  useUploadBirdImageMutation,
} from '../../slices/apiProducts'

const BirdEditPage = () => {
  const { id: birdId } = useParams();


  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [type, setType] = useState('')
  const [species, setSpecies] = useState('')
  // const [category, setCategory] = useState('')
  const [availability, setAvailability] = useState(0)
  const [description, setDescription] = useState('')
  const [sn, setSn] = useState('0')
  const {
    data: bird,
    isLoading,
    error,
    refetch,
  } = useGetBirdDetailsQuery(birdId);
  
  console.log(bird);

  const [updateBird, { isLoading: loadingUpdate }] =
    useUpdateBirdMutation();

  const [uploadBirdImage, { isLoading: loadingUpload }] =
    useUploadBirdImageMutation()

  const navigate = useNavigate();

  useEffect(() => {
    if (bird) {
      setName(bird.name);
      setSn(bird.sn);
      setPrice(bird.price);
      setImage(bird.image);
      setType(bird.type);
      // setCategory(bird.category);
      setAvailability(bird.availability);
      setSpecies(bird.species);
      setDescription(bird.description);
      // setNumReview(bird.numReviews);
      // setRating(bird.rating);
    }
  }, [bird]);

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedBird = {
      birdId,
      sn,
      name,
      price,
      image,
      type,
      // category,
      description,
      availability,
      species,
      // numReviews,
      // rating,
    }

    const result = await updateBird(updatedBird)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Bird updated')
      refetch()
      navigate('/admin/birdlist')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    try {
      const res = await uploadBirdImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  console.log('Render - name:', name);
   console.log('Render - sn:', sn);
  console.log('Render - price:', price);
  console.log('Render - image:', image);
  console.log('Render - type:', type);
  // console.log('Render - category:', category);
  console.log('Render - availability:', availability);
  console.log('Render - species:', species);
  console.log('Render - description:', description);

  return (
    <>
      <Link to='/admin/birdlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
<Form.Group controlId='sn'>
              <Form.Label>Sn</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Serial Number'
                value={sn}
                onChange={(e) => setSn(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpdate && <Loader />}
            </Form.Group>

            <Form.Group controlId='type'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='availability'>
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter availability'
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              ></Form.Control>
            </Form.Group>

         
            
            <Form.Group controlId='species'>
              <Form.Label>Species/Breed</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Breed'
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              ></Form.Control>
            </Form.Group>




            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default BirdEditPage;
