import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography, TextField, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { productApi } from '../../../__fake-api__/product-api';
import { ProductionListFilters } from '../../../components/dashboard/production/production-list-filters';
import { ProductionListTable } from '../../../components/dashboard/production/production-list-table';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { MinusOutlined as MinusIcon } from '../../../icons/minus-outlined';
import { Cog as CogIcon } from '../../../icons/cog';
import { gtm } from '../../../lib/gtm';



const applyFilters = (products, filters) => products.filter((product) => {
  if (filters.name) {
    const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    const categoryMatched = filters.category.includes(product.category);

    if (!categoryMatched) {
      return false;
    }
  }

  // It is possible to select multiple status options
  if (filters.status?.length > 0) {
    const statusMatched = filters.status.includes(product.status);

    if (!statusMatched) {
      return false;
    }
  }

  // Present only if filter required
  if (typeof filters.inStock !== 'undefined') {
    const stockMatched = product.inStock === filters.inStock;

    if (!stockMatched) {
      return false;
    }
  }

  return true;
});

const applyPagination = (products, page, rowsPerPage) => products.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const ProductList = () => {
  const isMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
 

  const getProducts = useCallback(async () => {
    try {
      const data = await productApi.getProducts();

      if (isMounted()) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getProducts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Product List | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Production
                </Typography>
              </Grid>
              <Grid item>
              
               
                <NextLink
                  href="/dashboard/production/new"
                  passHref
                >
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                  
                </NextLink>
                &nbsp;&nbsp;&nbsp;
                
                  <Button
                    component="a"
                    startIcon={<CogIcon fontSize="small" />}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="error"
                    component="a"
                    startIcon={<MinusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Delete
                  </Button>
                  
                  
              </Grid>

            </Grid>
            {/* <Box
              sx={{
                m: -1,
                mt: 3
              }}
            >
              <Button
                startIcon={<UploadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Import
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button>
            </Box> */}
            <br/><TextField
                  label="No. of Products in Stock"
                  variant="outlined"
                    // Replace 'yourBackendData' with the actual data you want to display
                  InputProps={{
                  readOnly: true,  // Makes the field read-only
                  }}
                  sx={{ width: '33.33%' }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                  label="No. of Product Total"
                  variant="outlined"
                    // Replace 'yourBackendData' with the actual data you want to display
                  InputProps={{
                  readOnly: true,  // Makes the field read-only
                  }}
                  sx={{ width: '33.33%' }}
                />


          </Box>
          <Card>
            <ProductionListFilters onChange={handleFiltersChange} />
            <ProductionListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              products={paginatedProducts}
              productsCount={filteredProducts.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(ProductList));