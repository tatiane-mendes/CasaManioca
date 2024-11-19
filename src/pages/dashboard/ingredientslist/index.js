import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography, TextField } from '@mui/material';
import { ingredientApi } from '../../../__fake-api__/ingredient-api';
import { IngredientListFilters } from '../../../components/dashboard/ingredientslist/ingredients-list-filters';
import { IngredientListTable } from '../../../components/dashboard/ingredientslist/ingredients-list-table';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { MinusOutlined as MinusIcon } from '../../../icons/minus-outlined';
import { Cog as CogIcon } from '../../../icons/cog';
import { gtm } from '../../../lib/gtm';

const applyFilters = (ingredients, filters) => ingredients.filter((ingredient) => {
  if (filters.name) {
    const nameMatched = ingredient.name.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    const categoryMatched = filters.category.includes(ingredient.category);

    if (!categoryMatched) {
      return false;
    }
  }

  // It is possible to select multiple status options
  if (filters.status?.length > 0) {
    const statusMatched = filters.status.includes(ingredient.status);

    if (!statusMatched) {
      return false;
    }
  }

  // Present only if filter required
  if (typeof filters.inStock !== 'undefined') {
    const stockMatched = ingredient.inStock === filters.inStock;

    if (!stockMatched) {
      return false;
    }
  }

  return true;
});

const applyPagination = (ingredients, page, rowsPerPage) => ingredients.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const ingredientslist = () => {
  const isMounted = useMounted();
  const [ingredients, setIngredients] = useState([]);
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

  const getIngredients = useCallback(async () => {
    try {
      const data = await ingredientApi.getIngredients();

      if (isMounted()) {
        setIngredients(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getIngredients();
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
  const filteredIngredients = applyFilters(ingredients, filters);
  const paginatedIngredients = applyPagination(filteredIngredients, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Ingredients List 
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
                  Ingredients List
                </Typography>
              </Grid>
              <Grid item>
                
                <NextLink
                  href="/dashboard/ingredientslist/new"
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
            
          </Box>
          <Card>
            <IngredientListFilters onChange={handleFiltersChange} />
            <IngredientListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              ingredients={paginatedIngredients}
              ingredientsCount={filteredIngredients.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(ingredientslist));
