import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import AboutUs from "./pages/AboutUs";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import ProfessionalDetails from "./pages/ProfessionalDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProfessionals from "./pages/admin/ManageProfessionals";
import AddProfessional from "./pages/admin/AddProfessional";
import ManageServices from "./pages/admin/ManageServices";
import EditProfessional from "./pages/admin/EditProfessional";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminProServices from "./pages/admin/AdminProServices";
import ProfessionalServices from "./pages/ProfessionalServices";
import ForgotPassword from "./pages/ForgotPassword";
import ContactUs from "./pages/ContactUs";




function AppLayout() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarOn = ["/", "/signup","/forgot-password"];

  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {/* Show Navbar ONLY if logged in & not on login/signup */}
      {!shouldHideNavbar && isLoggedIn && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/professionals" element={<ManageProfessionals />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/professional/:id" element={<ProfessionalDetails />} />
        <Route
          path="/admin/professional/:id/services"
          element={<AdminProServices />}
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/add-professional" element={<AddProfessional />} />
        <Route
          path="/admin/edit-professional/:id"
          element={<EditProfessional />}
        />
        <Route path="/book/:professionalId" element={<BookAppointment />} />
        <Route path="/admin/services" element={<ManageServices />} />
        <Route
          path="/professional/:id/services"
          element={<ProfessionalServices />}
        />
       

        {/* <Route path="/admin/services/add/:professionalId" element={<ManageServices />} /> */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
