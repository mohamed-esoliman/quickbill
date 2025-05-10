import React from 'react';
import { Link } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const InvoiceList = () => {
  const { invoices, deleteInvoice } = useInvoices();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateTotal = (invoice) => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const taxAmount = (subtotal * invoice.tax) / 100;
    const discountAmount = (subtotal * invoice.discount) / 100;
    return subtotal + taxAmount - discountAmount;
  };

  if (invoices.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No invoices yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Get started by creating a new invoice.
        </Typography>
        <Button
          component={Link}
          to="/newInvoice"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          Create Invoice
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {invoices.map((invoice) => (
          <Box
            key={invoice.id}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Invoice #{invoice.number}
                    </Typography>
                    <Chip
                      label={invoice.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          invoice.status === 'paid'
                            ? theme.palette.success.light
                            : theme.palette.warning.light,
                        color:
                          invoice.status === 'paid'
                            ? theme.palette.success.dark
                            : theme.palette.warning.dark,
                        fontWeight: 500,
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {invoice.billTo.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Due {formatDate(invoice.dueDate)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mr: 2,
                    }}
                  >
                    {formatCurrency(calculateTotal(invoice))}
                  </Typography>
                  <IconButton
                    component={Link}
                    to={`/edit/${invoice.id}`}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/preview/${invoice.id}`}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteInvoice(invoice.id)}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default InvoiceList; 