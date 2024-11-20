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

export const IngredientListTable = (props) => {
  const { t } = useTranslation();

  const {
    ingredients,
    ingredientsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Reset selected ingredients when ingredients change
  useEffect(() => {
      if (selectedIngredients.length) {
        setSelectedIngredients([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ingredients]);

  const handleSelectAllIngredients = (event) => {
    setSelectedIngredients(event.target.checked
      ? ingredients.map((ingredient) => ingredient.id)
      : []);
  };

  const handleSelectOneIngredient = (event, ingredientId) => {
    if (!selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients((prevSelected) => [...prevSelected, ingredientId]);
    } else {
      setSelectedIngredients((prevSelected) => prevSelected.filter((id) => id !== ingredientId));
    }
  };

  const enableBulkActions = selectedIngredients.length > 0;
  const selectedSomeIngredients = selectedIngredients.length > 0
    && selectedIngredients.length < ingredients.length;
  const selectedAllIngredients = selectedIngredients.length === ingredients.length;

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
          checked={selectedAllIngredients}
          indeterminate={selectedSomeIngredients}
          onChange={handleSelectAllIngredients}
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
                  checked={selectedAllIngredients}
                  indeterminate={selectedSomeIngredients}
                  onChange={handleSelectAllIngredients}
                />
              </TableCell>
              <TableCell>
                {t('Name')}
              </TableCell>
              <TableCell>
                {t(`Measurement unit`)}
              </TableCell>
              <TableCell>
                {t(`Stock quantity`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => {
              const isIngredientSelected = selectedIngredients.includes(ingredient.id);

              return (
                <TableRow
                  hover
                  key={ingredient.id}
                  selected={isIngredientSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isIngredientSelected}
                      onChange={(event) => handleSelectOneIngredient(event, ingredient.id)}
                      value={isIngredientSelected}
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
                        src={ingredient.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(ingredient.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href="/dashboard/ingredient/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {ingredient.name}
                          </Link>
                        </NextLink>
                        </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${ingredient.unitOfMeasure}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={ingredient.stockQuantity >= ingredient.reorderLevel ? 'success' : 'error'}>
                        {numeral(ingredient.stockQuantity).format(`0,0`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/ingredient/edit"
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
        count={ingredientsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

IngredientListTable.propTypes = {
  ingredients: PropTypes.array.isRequired,
  ingredientsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
