import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';
import {
  useGetBirdsQuery,
  useCreateBirdMutation,
  useDeleteBirdMutation,
} from '../../slices/apiProducts';

const BirdListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetBirdsQuery({
    pageNumber,
  });

  const [createBird, { isLoading: loadingCreate, data: createBirdData, error: createBirdError }] = useCreateBirdMutation();
console.log("Create Bird Data:", createBirdData);
console.log("Create Bird Error:", createBirdError);

  
  const [deleteBird, { isLoading: loadingDelete }] = useDeleteBirdMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteBird(id);
        refetch();
        toast.success('Bird deleted successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

const createBirdHandler = async () => {
   console.log('Create bird button clicked');
if (window.confirm(`Are you sure you want to create a new list of bird?`))
{
  try {
    await createBird();
    refetch();
  } catch (error) {
    toast.error(error?.data?.message  || error.error);
  }
}
};



 

  return (
    <Container>
      <Link to="/" className="btn btn-light mb-3">
        Go Back
      </Link>
      <div>
        <Row>
          <Col md={12}>
            <h1>Birds</h1>
             <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createBirdHandler}>
              <FaEdit />Create a Bird list
            </Button>
          </Col>
          </Col>
         
        </Row>

        {isLoading || loadingCreate || loadingDelete ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>SN</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>TYPE</th>
                  {/* <th>CATEGORY</th> */}
                  <th>BREED/SPECIES</th>
                  <th>AVAILABILITY</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((bird) => (
                    <tr key={bird._id}>
                      <td>{bird._id}</td>
                      <td>{bird.sn}</td>
                      <td>{bird.name}</td>
                      <td>${bird.price}</td>
                      <td>{bird.type}</td>
                      {/* <td>{bird.category}</td> */}
                      <td>{bird.species}</td>
                       <td>{bird.availability}</td>
                      <td>
                        <LinkContainer to={`/admin/birdlist/${bird._id}/edit`}>
                          <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm align-items-center"
                          onClick={() => deleteHandler(bird._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No birds found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </>
        )}

      </div>
    </Container>
  );
};

export default BirdListPage;
