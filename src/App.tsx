import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import DynamicServicePage from './pages/DynamicServicePage';
import DynamicLocationPage from './pages/DynamicLocationPage';

import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import ReviewsPage from './pages/ReviewsPage';
import InteractiveDemoPage from './pages/InteractiveDemoPage';

import ServiceAreasPage from './pages/ServiceAreasPage';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          
          {/* Services Cluster */}
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<DynamicServicePage />} />

          {/* Locations Cluster */}
          <Route path="locations" element={<ServiceAreasPage />} />
          <Route path="locations/:slug" element={<DynamicLocationPage />} />

          {/* Company Cluster */}
          <Route path="about" element={<AboutPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          
          {/* Demo & Booking */}
          <Route path="demo" element={<InteractiveDemoPage />} />
          <Route path="booking" element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
