import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Trash as TrashRightIcon } from '../../../icons/trash';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import recipeService from '../../../services/recipe-service';

export const RecipeListTable = (props) => {
  const { t } = useTranslation();
  
  const {
    recipes: initialRecipes,
    recipesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [recipes, setRecipes] = useState(initialRecipes);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  const handleDelete = async (values) => {
    try {
      await recipeService.delete(values);
      toast.success('Item deleted!');
      
      setRecipes(recipes.filter(item => item.id !== values.id));
    } catch (err) {
      console.error(err.message + '. ' + err.detail);
      toast.error(err.message + '. ' + err.detail);
    }
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                {t('Item')}
              </TableCell>
              <TableCell>
                {t(`Category`)}
              </TableCell>
              <TableCell>
                {t(`Quantity produced`)}
              </TableCell>
              <TableCell>
                {t(`Recipe date`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => {
              return (
                <TableRow
                  hover
                  key={recipe.id}
                >
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
                        {getInitials(recipe.product.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/recipe/${recipe.id}/edit`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {recipe.product.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${recipe.product.category}`}
                  </TableCell>
                  <TableCell>
                    {numeral(recipe.postRecipeStock).format(`0.00`)}
                  </TableCell>
                  <TableCell> 
                    {format(new Date(recipe.recipeDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/recipe/${recipe.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/recipe"
                      passHref
                    >
                      <IconButton component="a">
                        <TrashRightIcon fontSize="small" onClick={() => {handleDelete(recipe)}} />
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