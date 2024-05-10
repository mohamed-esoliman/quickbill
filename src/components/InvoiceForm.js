import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const InvoiceForm = ({ invoiceId }) => {
  const navigate = useNavigate();
  const { addInvoice, updateInvoice, getInvoice } = useInvoices();
  const invoice = invoiceId ? getInvoice(invoiceId) : null;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: invoice || {
      number: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      billFrom: {
        name: '',
        email: '',
        address: '',
        phone: '',
      },
      billTo: {
        name: '',
        email: '',
        address: '',
        phone: '',
      },
      items: [
        {
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
      notes: '',
      terms: '',
      currency: 'USD',
      tax: 0,
      discount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    if (invoiceId) {
      updateInvoice(invoiceId, data);
    } else {
      const newId = addInvoice(data);
      navigate(`/preview/${newId}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {invoiceId ? 'Edit Invoice' : 'New Invoice'}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              fullWidth={isMobile}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth={isMobile}
              sx={{
                textTransform: 'none',
                px: 3,
              }}
            >
              {invoiceId ? 'Update' : 'Create'} Invoice
            </Button>
          </Stack>
        </Box>

        <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Stack spacing={3}>
            {/* Basic Information */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  {...register('number', { required: 'Invoice number is required' })}
                  error={!!errors.number}
                  helperText={errors.number?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      {...register('date', { required: 'Date is required' })}
                      error={!!errors.date}
                      helperText={errors.date?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Due Date"
                      type="date"
                      {...register('dueDate', { required: 'Due date is required' })}
                      error={!!errors.dueDate}
                      helperText={errors.dueDate?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider />

            {/* Billing Information */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Bill From
                  </Typography>
                  <TextField
                    fullWidth
                    label="Name"
                    {...register('billFrom.name', { required: 'Name is required' })}
                    error={!!errors.billFrom?.name}
                    helperText={errors.billFrom?.name?.message}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('billFrom.email', { required: 'Email is required' })}
                    error={!!errors.billFrom?.email}
                    helperText={errors.billFrom?.email?.message}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    {...register('billFrom.address', { required: 'Address is required' })}
                    error={!!errors.billFrom?.address}
                    helperText={errors.billFrom?.address?.message}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    type="tel"
                    {...register('billFrom.phone', { required: 'Phone is required' })}
                    error={!!errors.billFrom?.phone}
                    helperText={errors.billFrom?.phone?.message}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Bill To
                  </Typography>
                  <TextField
                    fullWidth
                    label="Name"
                    {...register('billTo.name', { required: 'Name is required' })}
                    error={!!errors.billTo?.name}
                    helperText={errors.billTo?.name?.message}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('billTo.email', { required: 'Email is required' })}
                    error={!!errors.billTo?.email}
                    helperText={errors.billTo?.email?.message}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    {...register('billTo.address', { required: 'Address is required' })}
                    error={!!errors.billTo?.address}
                    helperText={errors.billTo?.address?.message}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    type="tel"
                    {...register('billTo.phone', { required: 'Phone is required' })}
                    error={!!errors.billTo?.phone}
                    helperText={errors.billTo?.phone?.message}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Divider />

            {/* Items */}
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Items
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    append({
                      description: '',
                      quantity: 1,
                      price: 0,
                    })
                  }
                  sx={{ textTransform: 'none' }}
                >
                  Add Item
                </Button>
              </Box>

              <Stack spacing={2}>
                {fields.map((field, index) => (
                  <Paper
                    key={field.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Description"
                          {...register(`items.${index}.description`, {
                            required: 'Description is required',
                          })}
                          error={!!errors.items?.[index]?.description}
                          helperText={errors.items?.[index]?.description?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          {...register(`items.${index}.quantity`, {
                            required: 'Quantity is required',
                            min: 1,
                          })}
                          error={!!errors.items?.[index]?.quantity}
                          helperText={errors.items?.[index]?.quantity?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          label="Price"
                          type="number"
                          step="0.01"
                          {...register(`items.${index}.price`, {
                            required: 'Price is required',
                            min: 0,
                          })}
                          error={!!errors.items?.[index]?.price}
                          helperText={errors.items?.[index]?.price?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <IconButton
                          onClick={() => remove(index)}
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </Stack>

            <Divider />

            {/* Additional Information */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  {...register('notes')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Terms"
                  multiline
                  rows={3}
                  {...register('terms')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tax Rate (%)"
                  type="number"
                  {...register('tax', { min: 0, max: 100 })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Discount (%)"
                  type="number"
                  {...register('discount', { min: 0, max: 100 })}
                />
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default InvoiceForm; 