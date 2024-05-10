import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            <span className="block">Quick</span>
            <span className="block text-primary-600 mt-2">Bill</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Create, manage, and send professional invoices with ease. Perfect for freelancers and small businesses.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/newInvoice"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 shadow-sm"
            >
              Create New Invoice
            </Link>
            <Link
              to="/invoices"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              View All Invoices
            </Link>
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="absolute -top-4 left-6">
                <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Easy to Use</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Create professional invoices in minutes with our intuitive interface.
                </p>
              </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="absolute -top-4 left-6">
                <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Save Time</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Automate your invoicing process and focus on what matters most.
                </p>
              </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="absolute -top-4 left-6">
                <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Professional</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Generate polished, professional invoices that impress your clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <p>Created by Mohamed Soliman © 2024</p>
      </footer>
    </div>
  );
};

export default LandingPage; 