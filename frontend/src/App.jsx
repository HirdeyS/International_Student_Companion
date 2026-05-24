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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/housing" element={<HousingPage />} />
        <Route path="/housing/:id" element={<ListingDetailsPage />} />
        <Route path="/reminders" element={<ReminderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/housing/new" element={<CreateListingPage />} />
        <Route path="/landlord/listings" element={<LandlordDashboard />} />
        {/* <Route path="/user/:id" element={<PublicProfile/>}/> */}
      </Routes>
    </Layout>
  )
}

export default App
