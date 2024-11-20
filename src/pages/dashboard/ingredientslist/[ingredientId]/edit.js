import { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { IngredientEditForm } from '../../../../components/dashboard/ingredient/ingredient-edit-form';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';

const IngredientEdit = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getIngredient = useCallback(async () => {
    try {
      // const data = await ingredientApi.getIngredient();
        const data = {};
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

  if (!ingredient) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Ingredient Edit')}
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
                  {t('Ingredients')}
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
              <Typography
                noWrap
                variant="h4"
              >
                {ingredient.email}
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

              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <IngredientEditForm ingredient={ingredient} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(IngredientEdit));
