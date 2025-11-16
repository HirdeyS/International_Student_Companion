import './App.css'
import {Routes, Route} from "react-router-dom";
import Layout from './layout/Layout';
import HomePage from "./pages/HomePage";
import HousingPage from "./pages/HousingPage";
import ReminderPage from "./pages/ReminderPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/housing" element={<HousingPage />} />
        <Route path="/reminders" element={<ReminderPage />} />
      </Routes>
    </Layout>
  )
}

export default App
