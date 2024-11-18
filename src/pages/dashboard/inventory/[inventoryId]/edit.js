import { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { inventoryApi } from '../../../../__fake-api__/inventory-api';
import { InventoryEditForm } from '../../../../components/dashboard/inventory/inventory-edit-form';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';

const InventoryEdit = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getInventory = useCallback(async () => {
    try {
      // const data = await inventoryApi.getInventory();
        const data = {};
      if (isMounted()) {
        setInventory(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getInventory();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!inventory) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Inventory Edit')}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/dashboard/inventory"
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
                  {t('Inventories')}
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            <Avatar
              src={inventory.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(inventory.name)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {inventory.email}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <Typography variant="subtitle2">
                  user_id:
                </Typography>
                <Chip
                  label={inventory.id}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <InventoryEditForm inventory={inventory} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(InventoryEdit));
