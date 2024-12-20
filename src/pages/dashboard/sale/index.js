import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { SaleListTable } from '../../../components/dashboard/sale/sale-list-table';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../hooks/use-mounted';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { gtm } from '../../../lib/gtm';
import { useTranslation } from 'react-i18next';
import NextLink from 'next/link';
import saleService from '../../../services/sale-service';

const tabs = [
  {
    label: '',
    value: ''
  },
];

const sortOptions = (t) => [
  {
    label: t('Sale date (Hightest)'),
    value: 'saleDate|desc'
  },
  {
    label: t('Sale date (Lowest)'),
    value: 'saleDate|asc'
  },
  {
    label: t('Name (A-Z)'),
    value: 'product.name|asc'
  },
  {
    label: t('Name (Z-A)'),
    value: 'product.name|desc'
  },
];

const getNestedProperty = (obj, propertyPath) => {
  return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const applyFilters = (sales, filters) => sales.filter((sale) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['product.category', 'product.name'];

    properties.forEach((property) => {
      const value = getNestedProperty(sale, property);
      if (value && value.toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  return true;
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (sales, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = sales.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

        return a[1] - b[1];
  });

    return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (sales, page, rowsPerPage) => sales.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const SaleList = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const [sales, setSales] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions(t)[0].value);
  const [filters, setFilters] = useState({ query: '' });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getSales = useCallback(async () => {
    try {
      const data = await saleService.getAll();

      if (isMounted()) {
        setSales(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getSales();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredSales = applyFilters(sales, filters);
  const sortedSales = applySort(filteredSales, sort);
  const paginatedSales = applyPagination(sortedSales, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Product Sold List')}
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
                  {t('Product Sold')}
                </Typography>
              </Grid>
              <Grid item>
              <NextLink
                href="/dashboard/sale/0/edit"
                passHref
              >
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
            <Divider />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("Search sales")}
                />
              </Box>
              <TextField
                label={t("Sort By")}
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions(t).map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <SaleListTable
              sales={paginatedSales}
              salesCount={filteredSales.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(SaleList));