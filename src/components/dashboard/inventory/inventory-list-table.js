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

export const InventoryListTable = (props) => {
  const { t } = useTranslation();

  const {
    inventories,
    inventoriesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedInventories, setSelectedInventories] = useState([]);

  // Reset selected inventories when inventories change
  useEffect(() => {
      if (selectedInventories.length) {
        setSelectedInventories([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inventories]);

  const handleSelectAllInventories = (event) => {
    setSelectedInventories(event.target.checked
      ? inventories.map((inventory) => inventory.id)
      : []);
  };

  const handleSelectOneInventory = (event, inventoryId) => {
    if (!selectedInventories.includes(inventoryId)) {
      setSelectedInventories((prevSelected) => [...prevSelected, inventoryId]);
    } else {
      setSelectedInventories((prevSelected) => prevSelected.filter((id) => id !== inventoryId));
    }
  };

  const enableBulkActions = selectedInventories.length > 0;
  const selectedSomeInventories = selectedInventories.length > 0
    && selectedInventories.length < inventories.length;
  const selectedAllInventories = selectedInventories.length === inventories.length;

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
          checked={selectedAllInventories}
          indeterminate={selectedSomeInventories}
          onChange={handleSelectAllInventories}
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
                  checked={selectedAllInventories}
                  indeterminate={selectedSomeInventories}
                  onChange={handleSelectAllInventories}
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
            {inventories.map((inventory) => {
              const isInventorySelected = selectedInventories.includes(inventory.id);

              return (
                <TableRow
                  hover
                  key={inventory.id}
                  selected={isInventorySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isInventorySelected}
                      onChange={(event) => handleSelectOneInventory(event, inventory.id)}
                      value={isInventorySelected}
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
                        src={inventory.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(inventory.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href="/dashboard/inventory/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {inventory.name}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {inventory.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${inventory.category}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={inventory.quantity >= inventory.stockLevel ? 'success' : 'error'}>
                        {numeral(inventory.quantity).format(`0,0`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {format(inventory.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/inventory/edit"
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/inventory/1"
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
        count={inventoriesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

InventoryListTable.propTypes = {
  inventories: PropTypes.array.isRequired,
  inventoriesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
