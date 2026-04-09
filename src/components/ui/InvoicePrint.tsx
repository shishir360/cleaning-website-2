import React from 'react';
import { siteConfig } from '../../config/siteConfig';

interface InvoiceData {
  bookingId: string;
  date: string;
  timeWindow: string;
  address: string;
  serviceType: string;
  frequency: string;
  bedrooms: number | 'Studio';
  bathrooms: number;
  addons: string[];
  basePrice: number;
  addonTotal: number;
  discountAmount: number;
  tax: number;
  tipAmount: number;
  total: number;
}

export function InvoicePrint({ data }: { data: InvoiceData }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white text-black p-12 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-200 pb-8 mb-8">
        <div>
          {siteConfig.brand.logoUrl ? (
            <img src={siteConfig.brand.logoUrl} alt={siteConfig.brand.name} className="h-12 mb-4 object-contain brightness-0" />
          ) : (
            <h1 className="text-4xl font-serif font-bold tracking-widest uppercase mb-4">{siteConfig.brand.abbreviation || siteConfig.brand.name}</h1>
          )}
          <p className="text-gray-500 text-sm">{siteConfig.brand.taglineHeading}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold uppercase tracking-widest text-gray-800 mb-2">Invoice</h2>
          <p className="font-medium text-gray-600 mb-1">Receipt #: {data.bookingId}</p>
          <p className="text-sm text-gray-500">Date Issued: {currentDate}</p>
        </div>
      </div>

      {/* Grid: Client & Service Details */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-2">Service Location</h3>
          <p className="font-medium">{data.address || 'Address provided during booking'}</p>
          <p className="text-gray-500 text-sm mt-1">Arrival: {data.date} at {data.timeWindow}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-2">Firm Details</h3>
          <p className="font-medium">{siteConfig.brand.name}</p>
          <p className="text-gray-500 text-sm mt-1">{siteConfig.contact.phone}</p>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="mb-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Charges</h3>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="py-3 text-sm font-bold uppercase tracking-widest">Description</th>
              <th className="py-3 text-sm font-bold uppercase tracking-widest text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-4">
                <p className="font-medium capitalize">{data.serviceType} Cleaning</p>
                <p className="text-sm text-gray-500">{data.bedrooms} Bed, {data.bathrooms} Bath &bull; {data.frequency.replace('-', ' ')}</p>
              </td>
              <td className="py-4 text-right font-medium">${data.basePrice.toFixed(2)}</td>
            </tr>
            
            {data.addons.length > 0 && (
              <tr className="border-b border-gray-100">
                <td className="py-4">
                  <p className="font-medium tracking-wide">Enhancements Include:</p>
                  <p className="text-sm text-gray-500">{data.addons.map(a => a.replace('-', ' ')).join(', ')}</p>
                </td>
                <td className="py-4 text-right font-medium">${data.addonTotal.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-1/2">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${(data.basePrice + data.addonTotal).toFixed(2)}</span>
          </div>
          {data.discountAmount > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100 text-gray-600">
              <span>Recurring Discount</span>
              <span>-${data.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Sales Tax (8.875%)</span>
            <span className="font-medium">${data.tax.toFixed(2)}</span>
          </div>
          {data.tipAmount > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Tip / Gratuity</span>
              <span className="font-medium">${data.tipAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-4 border-b-4 border-gray-800">
            <span className="font-bold uppercase tracking-widest">Total Paid</span>
            <span className="font-bold text-xl">${data.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-xs">
        <p className="mb-2">Thank you for trusting {siteConfig.brand.name} with your home.</p>
        <p>This is a digital receipt of services rendered or scheduled.</p>
      </div>
    </div>
  );
}
