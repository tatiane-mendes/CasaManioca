import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { ProductionCreateForm } from '../../../components/dashboard/production/production-create-form';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../hocs/with-dashboard-layout';
import { gtm } from '../../../lib/gtm';

const ProductCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Create Product for Production
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Create a new product
            </Typography>
            <Breadcrumbs
              separator="/"
              sx={{ mt: 1 }}
            >
              <NextLink
                href="/dashboard"
                passHref
              >
                <Link variant="subtitle2">
                  Dashboard
                </Link>
              </NextLink>
              <NextLink
                href="/dashboard"
                passHref
              >
                <Link
                  color="primary"
                  variant="subtitle2"
                >
                  Management
                </Link>
                
              </NextLink>
              <NextLink
                href="/dashboard/production"
                passHref
              >
                <Link
                  color="primary"
                  variant="subtitle2"
                >
                  Production
                </Link>
                
              </NextLink>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                Create
              </Typography>
            </Breadcrumbs>
          </Box>
          <ProductionCreateForm />
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(ProductCreate));

