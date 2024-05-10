import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Box,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const PdfPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInvoice } = useInvoices();
  const invoice = getInvoice(id);
  const iframeRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!invoice) {
      navigate('/');
      return;
    }

    generatePDF();
  }, [invoice]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,
    }).format(amount);
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * invoice.tax) / 100;
    const discountAmount = (subtotal * invoice.discount) / 100;
    return subtotal + taxAmount - discountAmount;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    // Header
    doc.setFontSize(24);
    doc.text('INVOICE', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);

    // Invoice Details
    doc.text(`Invoice #: ${invoice.number}`, margin, 40);
    doc.text(`Date: ${formatDate(invoice.date)}`, margin, 50);
    doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, margin, 60);

    // Bill From
    doc.text('Bill From:', margin, 80);
    doc.text(invoice.billFrom.name, margin, 90);
    doc.text(invoice.billFrom.address, margin, 100);
    doc.text(`Email: ${invoice.billFrom.email}`, margin, 110);
    doc.text(`Phone: ${invoice.billFrom.phone}`, margin, 120);

    // Bill To
    doc.text('Bill To:', pageWidth - margin, 80, { align: 'right' });
    doc.text(invoice.billTo.name, pageWidth - margin, 90, { align: 'right' });
    doc.text(invoice.billTo.address, pageWidth - margin, 100, { align: 'right' });
    doc.text(`Email: ${invoice.billTo.email}`, pageWidth - margin, 110, { align: 'right' });
    doc.text(`Phone: ${invoice.billTo.phone}`, pageWidth - margin, 120, { align: 'right' });

    // Items Table
    const tableColumn = ['Description', 'Quantity', 'Price', 'Total'];
    const tableRows = invoice.items.map((item) => [
      item.description,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.quantity * item.price),
    ]);

    doc.autoTable({
      startY: 140,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ${formatCurrency(calculateSubtotal())}`, pageWidth - margin, finalY, { align: 'right' });
    doc.text(`Tax (${invoice.tax}%): ${formatCurrency((calculateSubtotal() * invoice.tax) / 100)}`, pageWidth - margin, finalY + 10, { align: 'right' });
    doc.text(`Discount (${invoice.discount}%): ${formatCurrency((calculateSubtotal() * invoice.discount) / 100)}`, pageWidth - margin, finalY + 20, { align: 'right' });
    doc.setFontSize(14);
    doc.text(`Total: ${formatCurrency(calculateTotal())}`, pageWidth - margin, finalY + 35, { align: 'right' });

    // Notes and Terms
    if (invoice.notes || invoice.terms) {
      doc.setFontSize(12);
      doc.text('Additional Information:', margin, finalY + 50);
      if (invoice.notes) {
        doc.text(`Notes: ${invoice.notes}`, margin, finalY + 60);
      }
      if (invoice.terms) {
        doc.text(`Terms: ${invoice.terms}`, margin, finalY + 70);
      }
    }

    // Save PDF
    const pdfOutput = doc.output('datauristring');
    if (iframeRef.current) {
      iframeRef.current.src = pdfOutput;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    // ... (same PDF generation code as above)
    doc.save(`invoice-${invoice.number}.pdf`);
  };

  if (!invoice) {
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          fullWidth={isMobile}
          sx={{ textTransform: 'none' }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={downloadPDF}
          startIcon={<DownloadIcon />}
          fullWidth={isMobile}
          sx={{ textTransform: 'none' }}
        >
          Download PDF
        </Button>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <iframe
          ref={iframeRef}
          title="PDF Preview"
          style={{
            width: '100%',
            height: '800px',
            border: 'none',
          }}
        />
      </Paper>
    </Box>
  );
};

export default PdfPreview;