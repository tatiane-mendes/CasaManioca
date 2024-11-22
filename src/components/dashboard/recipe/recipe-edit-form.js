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
import recipeService from '../../../services/recipe-service';
import { useRouter } from 'next/router';

export const RecipeEditForm = (props) => {
  const router = useRouter();
  const { recipe, ...other } = props;
  const formik = useFormik({
    initialValues: {
      id: recipe.id || '',
      quantityProduced: recipe.quantityProduced || '',
      recipeDate: recipe.recipeDate || '',
      postRecipeStock: recipe.postRecipeStock || '',
      productId: recipe.productId || '',
    },
    validationSchema: Yup.object({
      id: Yup.number().optional(),
      quantityProduced: Yup.number().required('Quantity produced is required'),
      recipeDate: Yup.date().optional(),
      postRecipeStock: Yup.number().required('Post recipe stock is required'),
      productId: Yup.number().required('Product is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.id) {
          await recipeService.edit(values);  
          toast.success('Item updated!');
        }
        else {
          const {id, ...filteredValues} = values;
          await recipeService.insert(filteredValues);
          toast.success('Item inserted!');
        }

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        router.push('/dashboard/recipe');
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
      await recipeService.delete(values);
      toast.success('Item deleted!');
      router.push('/dashboard/recipe');
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
        <CardHeader title={"Form recipe"} />
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
                error={Boolean(formik.touched.recipeDate && formik.errors.recipeDate)}
                fullWidth
                helperText={formik.touched.recipeDate && formik.errors.recipeDate}
                label="Recipe date"
                name="recipeDate"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.recipeDate}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.postRecipeStock && formik.errors.postRecipeStock)}
                fullWidth
                helperText={formik.touched.postRecipeStock && formik.errors.postRecipeStock}
                label="Post recipe stock"
                name="postRecipeStock"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.postRecipeStock}
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
            href="/dashboard/recipe"
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

RecipeEditForm.propTypes = {
    recipe: PropTypes.object.isRequired
};