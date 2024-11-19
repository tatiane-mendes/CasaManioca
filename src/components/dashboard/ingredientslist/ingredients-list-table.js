import { Fragment, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Image as ImageIcon } from '../../../icons/image';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';

const categoryOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

export const IngredientListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    ingredients,
    ingredientsCount,
    rowsPerPage,
    ...other
  } = props;
  const [openIngredient, setOpenIngredient] = useState(null);

  const handleOpenIngredient = (ingredientId) => {
    setOpenIngredient((prevValue) => (prevValue === ingredientId ? null : ingredientId));
  };

  const handleUpdateIngredient = () => {
    setOpenIngredient(null);
    toast.success('Ingredient updated');
  };

  const handleCancelEdit = () => {
    setOpenIngredient(null);
  };

  const handleDeleteIngredient = () => {
    toast.error('Ingredient cannot be deleted');
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">
                Ingredient Name
              </TableCell>
              <TableCell width="25%">
                Stock
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => {
              const open = ingredient.id === openIngredient;

              return (
                
                  <TableRow
                    hover
                    key={ingredient.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        })
                      }}
                      width="25%"
                    >
                      
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {ingredient.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                backgroundImage: `url(${ingredient.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 80
                              }}
                            />
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                width: 80
                              }}
                            >
                              <ImageIcon fontSize="small" />
                            </Box>
                          )}
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2
                          }}
                        >
                          <Typography variant="subtitle2">
                            {ingredient.name}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            in {ingredient.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell width="25%">
                      <LinearProgress
                        value={ingredient.quantity}
                        variant="determinate"
                        color={ingredient.quantity >= 10 ? 'success' : 'error'}
                        sx={{
                          height: 8,
                          width: 36
                        }}
                      />
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        {ingredient.quantity}
                        {' '}
                        in stock
                        {ingredient.variants > 1 && ` in ${ingredient.variants} variants`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {numeral(ingredient.price).format(`${ingredient.currency}0,0.00`)}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={ingredient.price >= 100 ? 'success' : 'error'}>
                        {ingredient.status}
                      </SeverityPill>
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
