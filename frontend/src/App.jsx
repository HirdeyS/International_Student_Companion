import {Routes, Route} from "react-router-dom";
import Layout from './layout/Layout';
import HomePage from "./pages/HomePage";
import HousingPage from "./pages/HousingPage";
import ReminderPage from "./pages/ReminderPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/EditProfilePage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import LandlordDashboard from "./pages/LandlordDashboard";
import NewsPage from "./pages/NewsPage";
import DocumentsPage from "./pages/DocumentsPage";
import CommunityPage from "./pages/CommunityPage";
import AdminCommunityPage from "./pages/AdminCommunityPage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/housing" element={<HousingPage />} />
        <Route path="/housing/:id" element={<ListingDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/housing/new" element={<CreateListingPage />} />
        <Route path="/landlord/listings" element={<LandlordDashboard />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/reminders" element={<DocumentsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin/community" element={<AdminCommunityPage />} />
      </Routes>
    </Layout>
  )
}

export default App
