import { useState, ChangeEvent } from 'react';
import {
  Container,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


//We can creat types folder and import
interface Product {
  id: number,
  name: string,
  price: number,
  category: string,
  available: string,
  description: string
}

interface TableProps {
  product: Product[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ product, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const pageSize = 8;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredProducts = product.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleProdcuts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  return (
      <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" marginBottom={2}>
          <Grid item>
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={toggleViewMode}>
              Switch to {viewMode === 'table' ? 'Card View' : 'Table View'}
            </Button>
          </Grid>
        </Grid>

        {viewMode === 'table' ? (
            <TableContainer>
              <MuiTable>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Available</TableCell>
                    <TableCell colSpan={2} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleProdcuts.length > 0 ? (
                      visibleProdcuts.map((product, i) => (
                          <TableRow key={product.id}>
                            <TableCell>{startIndex + i + 1}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{formatter.format(product.price)}</TableCell>
                            <TableCell>{product.available}</TableCell>
                            <TableCell align="right">
                              <IconButton onClick={() => handleEdit(product.id)} color="primary">
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="left">
                              <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No Product
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </MuiTable>
            </TableContainer>
        ) : (
            <Grid container spacing={2}>
              {visibleProdcuts.length > 0 ? (
                  visibleProdcuts.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">
                              {product.name}
                            </Typography>
                            <Typography>Description:{product.description}</Typography>
                            <Typography>Avilabble:{product.available}</Typography>
                            <Typography>Price: {product.price}</Typography>
                          </CardContent>
                          <CardActions>
                            <IconButton onClick={() => handleEdit(product.id)} color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                  ))
              ) : (
                  <Typography>No Products</Typography>
              )}
            </Grid>
        )}

        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          <Grid item>
            <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="contained">
              Previous Page
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Page {currentPage} of {totalPages}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="contained">
              Next Page
            </Button>
          </Grid>
        </Grid>
      </Container>
  );
};

export default Table;
