import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const InventoryBasicDetails = (props) => {
  const { address1, address2, country, email, isVerified, phone, state, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Description"
          value={email}
        />
        <PropertyListItem
          align={align}
          divider
          label="Unit weight"
          value={phone}
        />
        <PropertyListItem
          align={align}
          divider
          label="Category"
          value={country}
        />
        <PropertyListItem
          align={align}
          divider
          label="Category"
          value={state}
        />
      </PropertyList>
      <CardActions
        sx={{
          flexWrap: 'wrap',
          px: 3,
          py: 2,
          m: -1
        }}
      >
      </CardActions>
    </Card>
  );
};

InventoryBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string
};
