import { Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
        <Route path="/"             element={<HomePage />} />
        <Route path="/dashboard"    element={<Dashboard />} />
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/register"     element={<RegisterPage />} />
        <Route path="/profile"      element={<ProfilePage />} />
        <Route path="/eco-options"  element={<EcoOptionsPage />} />
        <Route path="/itinerary"    element={<ItineraryPage />} />
        <Route path="/weather"      element={<WeatherPage />} />
        <Route path="/calculator"   element={<CalculatorPage />} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}
