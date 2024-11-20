import { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ingredientApi } from '../../../../__fake-api__/ingredient-api';
import { IngredientBasicDetails } from '../../../../components/dashboard/ingredient/ingredient-basic-details';
import { IngredientListTable } from '../../../../components/dashboard/ingredient/ingredient-list-table';
import { IngredientDataManagement } from '../../../../components/dashboard/ingredient/ingredient-data-management';
import { IngredientLogs } from '../../../../components/dashboard/ingredient/ingredient-logs';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';

const tabs = [
  { label: 'Details', value: 'details' },
  { Label: 'List', value: 'list' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' }
];

const IngredientDetails = () => {
  const isMounted = useMounted();
  const [ingredient, setIngredient] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getIngredient = useCallback(async () => {
    try {
      const data = await ingredientApi.getIngredient();
      
      if (isMounted()) {
        setIngredient(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getIngredient();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!ingredient) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Ingredient Details
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink
                href="/dashboard/ingredient"
                passHref
              >
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle2">
                    Ingredients
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  src={ingredient.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(ingredient.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {ingredient.email}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      user_id:
                    </Typography>
                    <Chip
                      label={ingredient.id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{ m: -1 }}
              >
                <NextLink
                  href="/dashboard/ingredient/1/edit"
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={(
                      <PencilAltIcon fontSize="small" />
                    )}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={(
                    <ChevronDownIcon fontSize="small" />
                  )}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Actions
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
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
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <IngredientBasicDetails
                    address1={ingredient.address1}
                    address2={ingredient.address2}
                    country={ingredient.country}
                    email={ingredient.email}
                    isVerified={ingredient.isVerified}
                    phone={ingredient.phone}
                    state={ingredient.state}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <IngredientDataManagement />
                </Grid>
              </Grid>
            )}
            {currentTab === 'logs' && <IngredientLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(IngredientDetails));

