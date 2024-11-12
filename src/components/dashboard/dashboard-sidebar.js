import { useEffect, useMemo, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Home as HomeIcon } from '../../icons/home';
import { ReceiptTax as ReceiptTaxIcon } from '../../icons/receipt-tax';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import { Users as UsersIcon } from '../../icons/users';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';

const getSections = (t) => [
  {
    title: t('General'),
    items: [
      {
        title: t('Overview'),
        path: '/dashboard',
        icon: <HomeIcon fontSize="small" />
      },
    ]
  },
  {
    title: t('Management'),
    items: [
      {
        title: t('Customers'),
        path: '/dashboard/customers',
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/customers'
          },
          {
            title: t('Details'),
            path: '/dashboard/customers/1'
          },
          {
            title: t('Edit'),
            path: '/dashboard/customers/1/edit'
          }
        ]
      },
      {
        title: t('Products List'),
        path: '/dashboard/products',
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/productlist'
          },
          {
            title: t('Create'),
            path: '/dashboard/productlist/new'
          }
        ]
      },
      {
        title: t('Production'),
        path: '/dashboard/production',
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/production'
          },
          {
            title: t('Create'),
            path: '/dashboard/production/new'
          }
        ]
      },
      {
        title: t('Products Sold'),
        path: '/dashboard/productsold',
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/productsold'
          },
          {
            title: t('Create'),
            path: '/dashboard/productsold/new'
          }
        ]
      },
      {
        title: t('Orders'),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: '/dashboard/orders',
        children: [
          {
            title: t('List'),
            path: '/dashboard/orders'
          },
          {
            title: t('Details'),
            path: '/dashboard/orders/1'
          }
        ]
      },
      {
        title: t('Invoices'),
        path: '/dashboard/invoices',
        icon: <ReceiptTaxIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/invoices'
          },
          {
            title: t('Details'),
            path: '/dashboard/invoices/1'
          }
        ]
      }
    ]
  }, 
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </a>
              </NextLink>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
          
        </Box>
      </Scrollbar>
      
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
