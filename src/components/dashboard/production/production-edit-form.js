import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import productionService from '../../../services/production-service';
import { useRouter } from 'next/router';

export const ProductionEditForm = (props) => {
  const router = useRouter();
  const { production, ...other } = props;
  const formik = useFormik({
    initialValues: {
      id: production.id || '',
      quantityProduced: production.quantityProduced || '',
      productionDate: production.productionDate || '',
      postProductionStock: production.postProductionStock || '',
      productId: production.productId || '',
    },
    validationSchema: Yup.object({
      id: Yup.number().optional(),
      quantityProduced: Yup.number().required('Quantity produced is required'),
      productionDate: Yup.date().optional(),
      postProductionStock: Yup.number().required('Post production stock is required'),
      productId: Yup.number().required('Product is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.id) {
          await productionService.edit(values);  
          toast.success('Item updated!');
        }
        else {
          const {id, ...filteredValues} = values;
          await productionService.insert(filteredValues);
          toast.success('Item inserted!');
        }

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        router.push('/dashboard/production');
      } catch (err) {
        console.error(err.message + '. ' + err.detail);
        toast.error(err.message + '. ' + err.detail);
        
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleDelete = async (values) => {
    try {
      await productionService.delete(values);
      toast.success('Item deleted!');
      router.push('/dashboard/production');
    } catch (err) {
      console.error(err.message + '. ' + err.detail);
      toast.error(err.message + '. ' + err.detail);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title={"Form production"} />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.productId && formik.errors.productId)}
                fullWidth
                helperText={formik.touched.productId && formik.errors.productId}
                label="Product"
                name="productId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.productId}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.quantityProduced && formik.errors.quantityProduced)}
                fullWidth
                helperText={formik.touched.quantityProduced && formik.errors.quantityProduced}
                label="Quantity produced"
                name="quantityProduced"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantityProduced}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.productionDate && formik.errors.productionDate)}
                fullWidth
                helperText={formik.touched.productionDate && formik.errors.productionDate}
                label="Production date"
                name="productionDate"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.productionDate}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.postProductionStock && formik.errors.postProductionStock)}
                fullWidth
                helperText={formik.touched.postProductionStock && formik.errors.postProductionStock}
                label="Post production stock"
                name="postProductionStock"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.postProductionStock}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3
            }}
          >
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
          </Box>
        </CardContent>
        <CardActions
          sx={{
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Save
          </Button>
          <NextLink
            href="/dashboard/production"
            passHref
          >
            <Button
              component="a"
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: 'auto'
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button
            color="error"
            disabled={formik.isSubmitting}
            onClick={() => {handleDelete(formik.values)}}
          >
            Delete item
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

ProductionEditForm.propTypes = {
    production: PropTypes.object.isRequired
};