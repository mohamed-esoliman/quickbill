import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const InvoiceContext = createContext();

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};

export const defaultInvoice = {
  id: '',
  number: '',
  date: new Date().toISOString(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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
      id: uuidv4(),
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
  status: 'draft',
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    try {
      const savedInvoices = localStorage.getItem('invoices');
      return savedInvoices ? JSON.parse(savedInvoices) : [];
    } catch (error) {
      console.error('Error loading invoices:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('invoices', JSON.stringify(invoices));
    } catch (error) {
      console.error('Error saving invoices:', error);
      toast.error('Failed to save invoices');
    }
  }, [invoices]);

  const addInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'draft',
    };
    setInvoices((prev) => [...prev, newInvoice]);
    toast.success('Invoice created successfully');
    return newInvoice.id;
  };

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              ...updatedInvoice,
              updatedAt: new Date().toISOString(),
            }
          : invoice
      )
    );
    toast.success('Invoice updated successfully');
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    toast.success('Invoice deleted successfully');
  };

  const getInvoice = (id) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const value = {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}; 