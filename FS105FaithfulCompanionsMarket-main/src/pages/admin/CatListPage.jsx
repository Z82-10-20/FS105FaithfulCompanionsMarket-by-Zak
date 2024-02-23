import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';
import {
  useGetCatsQuery,
  useCreateCatMutation,
  useDeleteCatMutation,
} from '../../slices/apiProducts';

const CatListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetCatsQuery({
    pageNumber,
  });

  const [createCat, { isLoading: loadingCreate }] = useCreateCatMutation();
  const [deleteCat, { isLoading: loadingDelete }] = useDeleteCatMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteCat(id);
        refetch();
        toast.success('Cat deleted successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const createCatHandler = async () => {
    if (window.confirm('Are you sure you want to create a new cat?')) {
      try {
        await createCat();
        refetch();
        toast.success('Cat created successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
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
          <Col md={10} className="mx-auto">
            <h1>Cats</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createCatHandler}>
              Create Cat
            </Button>
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
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((cat) => (
                    <tr key={cat._id}>
                      <td>{cat._id}</td>
                      <td>{cat.name}</td>
                      <td>${cat.price}</td>
                      <td>{cat.category}</td>
                      <td>{cat.brand}</td>
                      <td>
                        <LinkContainer to={`/admin/catlist/${cat._id}/edit`}>
                          <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm align-items-center"
                          onClick={() => deleteHandler(cat._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No cats found</td>
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

export default CatListPage;
