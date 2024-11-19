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

export const ProductSoldListTable = (props) => {
  const { t } = useTranslation();

  const {
    productsold = [],
    productsoldCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedProductSold, setSelectedProductSold] = useState([]);

  // Reset selected productsold when productsold change
  useEffect(() => {
      if (selectedProductSold.length) {
        setSelectedProductSold([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productsold]);

  const handleSelectAllProductSold = (event) => {
    setSelectedProductSold(event.target.checked
      ? productsold.map((productsold) => productsold.id)
      : []);
  };

  const handleSelectOneProductSold = (event, productsoldId) => {
    if (!selectedProductSold.includes(productsoldId)) {
      setSelectedProductSold((prevSelected) => [...prevSelected, productsoldId]);
    } else {
      setSelectedProductSold((prevSelected) => prevSelected.filter((id) => id !== productsoldId));
    }
  };

  const enableBulkActions = selectedProductSold.length > 0;
  const selectedSomeProductSold = selectedProductSold.length > 0
    && selectedProductSold.length < productsold.length;
  const selectedAllProductSold = selectedProductSold.length === productsold.length;

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
          checked={selectedAllProductSold}
          indeterminate={selectedSomeProductSold}
          onChange={handleSelectAllProductSold}
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
                  checked={selectedAllProductSold}
                  indeterminate={selectedSomeProductSold}
                  onChange={handleSelectAllProductSold}
                />
              </TableCell>
              <TableCell>
                {t('Product Name')}
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
            {productsold.map((productsold) => {
              const isProductSoldSelected = selectedProductSold.includes(productsold.id);

              return (
                <TableRow
                  hover
                  key={productsold.id}
                  selected={isProductSoldSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isProductSoldSelected}
                      onChange={(event) => handleSelectOneProductSold(event, productsold.id)}
                      value={isProductSoldSelected}
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
                        src={productsold.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(productsold.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href="/dashboard/productsold/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {productsold.name}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {productsold.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${productsold.category}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={productsold.quantity >= productsold.stockLevel ? 'success' : 'error'}>
                        {numeral(productsold.quantity).format(`0,0`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {format(productsold.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/productsold/edit"
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
        count={productsoldCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ProductSoldListTable.propTypes = {
  productsold: PropTypes.array.isRequired,
  productsoldCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
