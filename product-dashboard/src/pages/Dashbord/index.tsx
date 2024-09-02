import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Snackbar, Alert } from '@mui/material';


import { setProducts, deleteProduct } from '../../store/prodcutsSlice';
import Header from '../../components/Header';
import Add from '../../components/Add';
import Edit from '../../components/Edit';
import Table from '../../components/Table';


interface Product {
  id: number,
  name: string,
  price: number,
  category: string,
  available: string,
  description: string
}
interface RootState {
  products: {
    list: Product[];
  };
}

const Dashboard: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.list);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const data = localStorage.getItem('products_data');
    if (data) {
      dispatch(setProducts(JSON.parse(data)));
    }
  }, [dispatch]);

  const handleEdit = (id: number) => {
    const product = products.find((product: { id: number; }) => product.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsEditing(true);
    }
  };

  const handleDelete = (id: number) => {
    setSnackbarSeverity('error');
    setSnackbarMessage('Are you sure you want to delete this product?');
    setSnackbarOpen(true);
    // You may need to add logic for user confirmation before finalizing the deletion
  };

  const confirmDeletion = (id: number) => {
    dispatch(deleteProduct(id));
    localStorage.setItem('products_data', JSON.stringify(products.filter((product: { id: number; }) => product.id !== id)));
    setSnackbarSeverity('success');
    setSnackbarMessage('Product has been deleted.');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
      <Container maxWidth="lg">
        {!isAdding && !isEditing && (
            <>
              <Header
                  setIsAdding={setIsAdding}
                  setIsAuthenticated={setIsAuthenticated}
              />
              <Table
                  product={products}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
              />
            </>
        )}
        {isAdding && (
            <Add
                setProduct={(newProducts) => dispatch(setProducts(newProducts))}
                setIsAdding={setIsAdding}
            />
        )}
        {isEditing &&  (
            <Edit
                products={products}
                selectedProduct={selectedProduct}
                setProducts={(newProducts) => dispatch(setProducts(newProducts))}
                setIsEditing={setIsEditing}
            />
        )}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
        >
          <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
  );
};

export default Dashboard;
