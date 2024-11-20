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

export const ProductionListTable = (props) => {
  const { t } = useTranslation();

  const {
    productions,
    productionsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedProductions, setSelectedProductions] = useState([]);

  // Reset selected productions when productions change
  useEffect(() => {
      if (selectedProductions.length) {
        setSelectedProductions([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productions]);

  const handleSelectAllProductions = (event) => {
    setSelectedProductions(event.target.checked
      ? productions.map((production) => production.id)
      : []);
  };

  const handleSelectOneProduction = (event, productionId) => {
    if (!selectedProductions.includes(productionId)) {
      setSelectedProductions((prevSelected) => [...prevSelected, productionId]);
    } else {
      setSelectedProductions((prevSelected) => prevSelected.filter((id) => id !== productionId));
    }
  };

  const enableBulkActions = selectedProductions.length > 0;
  const selectedSomeProductions = selectedProductions.length > 0
    && selectedProductions.length < productions.length;
  const selectedAllProductions = selectedProductions.length === productions.length;

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
          checked={selectedAllProductions}
          indeterminate={selectedSomeProductions}
          onChange={handleSelectAllProductions}
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
                  checked={selectedAllProductions}
                  indeterminate={selectedSomeProductions}
                  onChange={handleSelectAllProductions}
                />
              </TableCell>
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
                {t(`Production Date`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productions.map((production) => {
              const isProductionSelected = selectedProductions.includes(production.id);

              return (
                <TableRow
                  hover
                  key={production.id}
                  selected={isProductionSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isProductionSelected}
                      onChange={(event) => handleSelectOneProduction(event, production.id)}
                      value={isProductionSelected}
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
                        src={production.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(production.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href="/dashboard/production/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {production.name}
                          </Link>
                        </NextLink>
                       </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${production.category}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {numeral(production.quantity).format(`0,0`)}
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {format(production.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/production/edit"
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
        count={productionsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ProductionListTable.propTypes = {
  productions: PropTypes.array.isRequired,
  productionsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
