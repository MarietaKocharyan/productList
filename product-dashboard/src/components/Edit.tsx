import { useState, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store/prodcutsSlice';

interface Product {
  id: number,
  name: string,
  price: number,
  category: string,
  available: string,
  description: string
}
const Edit: React.FC<{ products: any; selectedProduct: any | null; setProducts: (products: Product[]) => void; setIsEditing: (value: boolean) => void }> = ({ products, selectedProduct, setProducts, setIsEditing }) => {
  const dispatch = useDispatch();
  if (!selectedProduct) return null;

  const id = selectedProduct.id;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [description, setDescription] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [category, setCategory] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [price, setPrice] = useState<number | ''>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [available, setAvailable] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !category || !available || !price || !description) {
      setError('All fields are required.');
      return;
    }

    const updatedProduct: any = {
      id,
      name,
      price,
      category,
      available,
      description,
     };

    dispatch(updateProduct(updatedProduct));
    localStorage.setItem('products_data', JSON.stringify(products.map((product: { id: number; }) => product.id === id ? updatedProduct : product)));
    setProducts(products.map((product: { id: number; }) => product.id === id ? updatedProduct : product));
    setIsEditing(false);
    setError(null);
  };

  return (
      <Container maxWidth="sm">
        <form onSubmit={handleUpdate}>
          <Typography variant="h4" gutterBottom>
            Edit product
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
          <TextField
              id="price"
              label="Price ($)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value))}
          />
          <TextField
              id="category"
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          />
          <TextField
              id="available"
              label="Available"
              variant="outlined"
              fullWidth
              margin="normal"
              value={available}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAvailable(e.target.value)}
          />
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
                style={{ marginLeft: '12px' }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
  );
};

export default Edit;
