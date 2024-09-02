import { useState, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/prodcutsSlice';
import { productsData } from '../data';

//We can creat types folder and import
interface Product {
  id: number,
  name: string,
  price: number,
  category: string,
  available: string,
  description: string
}
const Add: React.FC<{ setProduct: (productsData: Product[]) => void; setIsAdding: (value: boolean) => void }> = ({ setProduct, setIsAdding }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number | ''>('');
    const [available, setAvailable] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !category || !price || !available) {
      setError('All fields are required.');
      return;
    }

    const id = Date.now(); // Or another unique ID generator
    const newProduct: any = {
      id,
      name,
      price,
      category,
      available,
      description
    };

    dispatch(addProduct(newProduct));
    localStorage.setItem('product_data', JSON.stringify([...productsData, newProduct]));
    setProduct([...productsData, newProduct]);
    setProduct([...productsData, newProduct]);
    setIsAdding(false);
    setError(null);
  };

  return (
      <Container maxWidth="sm">
        <form onSubmit={handleAdd}>
          <Typography variant="h4" gutterBottom>
            Add Product
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
              Add
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsAdding(false)}
                style={{ marginLeft: '12px' }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
  );
};

export default Add;
