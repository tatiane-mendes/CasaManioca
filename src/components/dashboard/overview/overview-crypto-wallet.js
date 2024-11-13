import { Avatar, Box, Button, Card, CardActions, Divider, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronUp as ChevronUpIcon } from '../../../icons/chevron-up';
import { Chart } from '../../chart';

export const OverviewCryptoWallet = (props) => {
  const theme = useTheme();

  const chartOptions = {
    chart: {},
    colors: [theme.palette.primary.light],
    fill: {
      
    },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false
        },
        hollow: {
          size: '40%'
        },
        track: {
          background: theme.palette.primary.dark
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [76];

  return (
    <Card {...props}>
      <Box
        
      >
        
        <Box
          
        >
          
        </Box>
      </Box>
      <Divider />
      {/* <CardActions>
        <Button endIcon={<ArrowRightIcon fontSize="small" />}>
          See all activity
        </Button>
      </CardActions> */}
    </Card>
  );
};
