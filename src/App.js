import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { InvoiceProvider } from './context/InvoiceContext';
import Layout from './components/Layout';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import PdfPreview from './components/PdfPreview';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <InvoiceProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/newInvoice" element={<InvoiceForm />} />
            <Route path="/edit/:id" element={<InvoiceForm />} />
            <Route path="/preview/:id" element={<PdfPreview />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </Layout>
      </InvoiceProvider>
    </Router>
  );
}

export default App;
