import { Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import Dashboard from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EcoOptionsPage from './pages/EcoOptionsPage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import CalculatorPage from './pages/CalculatorPage';

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />

        <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile"     element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/eco-options" element={<ProtectedRoute><EcoOptionsPage /></ProtectedRoute>} />
        <Route path="/itinerary"   element={<ProtectedRoute><ItineraryPage /></ProtectedRoute>} />
        <Route path="/weather"     element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
        <Route path="/calculator"  element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}
