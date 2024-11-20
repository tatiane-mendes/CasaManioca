import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { SeverityPill } from '../../severity-pill';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';

export const RecipeListTable = (props) => {
  const { t } = useTranslation();

  const {
    recipes,
    recipesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  // Reset selected recipes when recipes change
  useEffect(() => {
      if (selectedRecipes.length) {
        setSelectedRecipes([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipes]);

  const handleSelectAllRecipes = (event) => {
    setSelectedRecipes(event.target.checked
      ? recipes.map((recipe) => recipe.id)
      : []);
  };

  const handleSelectOneRecipe = (event, recipeId) => {
    if (!selectedRecipes.includes(recipeId)) {
      setSelectedRecipes((prevSelected) => [...prevSelected, recipeId]);
    } else {
      setSelectedRecipes((prevSelected) => prevSelected.filter((id) => id !== recipeId));
    }
  };

  const enableBulkActions = selectedRecipes.length > 0;
  const selectedSomeRecipes = selectedRecipes.length > 0
    && selectedRecipes.length < recipes.length;
  const selectedAllRecipes = selectedRecipes.length === recipes.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: 'neutral.100',
          display: !enableBulkActions && 'none',
          px: 2,
          py: 0.5
        }}
      >
        <Checkbox
          checked={selectedAllRecipes}
          indeterminate={selectedSomeRecipes}
          onChange={handleSelectAllRecipes}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllRecipes}
                  indeterminate={selectedSomeRecipes}
                  onChange={handleSelectAllRecipes}
                />
              </TableCell>
              <TableCell>
                {t('Name')}
              </TableCell>
              <TableCell>
                {t(`Category`)}
              </TableCell>
              <TableCell>
                {t(`Quantity`)}
              </TableCell>
              <TableCell>
                {t(`Expiry Date`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => {
              const isRecipeSelected = selectedRecipes.includes(recipe.id);

              return (
                <TableRow
                  hover
                  key={recipe.id}
                  selected={isRecipeSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRecipeSelected}
                      onChange={(event) => handleSelectOneRecipe(event, recipe.id)}
                      value={isRecipeSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={recipe.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(recipe.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href="/dashboard/recipe/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {recipe.name}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {recipe.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${recipe.category}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={recipe.quantity >= recipe.stockLevel ? 'success' : 'error'}>
                        {numeral(recipe.quantity).format(`0,0`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {format(recipe.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/recipe/edit"
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/"
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={recipesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RecipeListTable.propTypes = {
  recipes: PropTypes.array.isRequired,
  recipesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
