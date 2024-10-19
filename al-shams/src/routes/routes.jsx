import Home from "../views/CustomerViews/Home";
import Listing from "../views/CustomerViews/Listings";
import ListingDetail from "../views/CustomerViews/ListingDetail";
import LoginForm from "../components/LoginForm/loginForm";
import Authtication from "../views/CustomerViews/Authtication";
import ForgetPasswordForm from "../components/ForgetPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import SignUpForm from "../components/SignUpForm";
import NotFound from "../views/CustomerViews/Page Not Found";
import ContactUs from "../views/CustomerViews/ContactUs";
import AboutUs from "../views/CustomerViews/AboutUs";
import AdminLogin from "../views/AdminViews/AdminLogin";
import AdminDashboard from "../views/AdminViews/AdminDashboard";
import { ProtectedRoute } from "../components";
import Vehicles from "../views/AdminViews/Vehicle/Vehicles";
import VehicleModel from "../views/AdminViews/Vehicle/VehicleModel";
import VehicleMake from "../views/AdminViews/Vehicle/VehicleMake";
import VehicleCategory from "../views/AdminViews/Vehicle/VehicleCategory";
import VehicleFeature from "../views/AdminViews/Vehicle/VehicleFeature"
import AddNewVehicle from "../views/AdminViews/Vehicle/Vehicles/AddNewVehicle";
import Shipments from "../components/Shipments"
import ShipmentDetails from "../components/ShipmentDetails"
import AuctionSheet from "../views/CustomerViews/AuctionSheet";
import VehicleAttribute from "../views/AdminViews/Vehicle/VehicleAttribute";
import AttributeFeatures from "../views/AdminViews/Vehicle/AttributeFeatures";

const adminRoutes = [
  {
    path: "admin-a1b2c3/login",
    element: <AdminLogin />,
    breadcrumb: "Admin Login",
    isPrivate: false,
    isProtected: false,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/",
    element: <ProtectedRoute For="admin" element={<AdminDashboard />} />, // if you provide For other than (customer and admin) or provide nothing then its not a protected route
    breadcrumb: "Admin Dashboard",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/vehicle",
    element: <ProtectedRoute For="admin" element={<Vehicles />} />,
    breadcrumb: "Vehicles",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/model",
    element: <ProtectedRoute For="admin" element={<VehicleModel />} />,
    breadcrumb: "Add new vehicle model",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/make",
    element: <ProtectedRoute For="admin" element={<VehicleMake />} />,
    breadcrumb: "Add new vehicle make",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/category",
    element: <ProtectedRoute For="admin" element={<VehicleCategory />} />,
    breadcrumb: "Add new vehicle category",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/feature",
    element: <ProtectedRoute For="admin" element={<VehicleFeature />} />,
    breadcrumb: "Add new vehicle features",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/vehicle/add-new",
    element: <ProtectedRoute For="admin" element={<AddNewVehicle />} />,
    breadcrumb: "Add new vehicle",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/vehicles/vehicle/:id",
    element: <ProtectedRoute For="admin" element={<AddNewVehicle />} />,
    breadcrumb: "Edit vehicle",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/machinery",
    element: <ProtectedRoute For="admin" element={<Vehicles type="machinery"/>} />,
    breadcrumb: "Machineries",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/make",
    element: <ProtectedRoute For="admin" element={<VehicleMake type="machinery"/>} />,
    breadcrumb: "Add new machinery make",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/model",
    element: <ProtectedRoute For="admin" element={<VehicleModel type="machinery"/>} />,
    breadcrumb: "Add new machinery model",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/category",
    element: <ProtectedRoute For="admin" element={<VehicleCategory type="machinery"/>} />,
    breadcrumb: "Add new machinery category",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/feature",
    element: <ProtectedRoute For="admin" element={<VehicleFeature type="machinery"/>} />,
    breadcrumb: "Add new machinery features",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/machinery/add-new",
    element: <ProtectedRoute For="admin" element={<AddNewVehicle type="machinery"/>} />,
    breadcrumb: "Add new machinery",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/machinery/:id",
    element: <ProtectedRoute For="admin" element={<AddNewVehicle type="machinery"/>} />,
    breadcrumb: "Edit machinery",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: "admin-a1b2c3/machineries/attributes",
    element: <ProtectedRoute For="admin" element={<VehicleAttribute type="machinery"/>} />,
    breadcrumb: "Add new attributes",
    isPrivate: true,
    isProtected: true,
    isAdmin: true,
  },
];

const routes = [
  { path: "/", element: <Home />, breadcrumb: "Home", isAdmin: false },
  {
    path: "/listings/:type",
    element: <Listing />,
    breadcrumb: "Listings",
    isAdmin: false,
  },
  {
    path: "/listings/:type/:id",
    element: <ListingDetail />,
    breadcrumb: "Listing Detail",
    isAdmin: false,
  },
  {
    path: "/login",
    element: (
      <Authtication
        form={<LoginForm />}
        heading="Login"
        subheading="Please login to continue"
      />
    ),
    breadcrumb: "Login",
    isAdmin: false,
  },
  {
    path: "/register",
    element: (
      <Authtication
        form={<SignUpForm />}
        heading="Register"
        subheading="Create a new account"
      />
    ),
    breadcrumb: "Register",
    isAdmin: false,
  },
  {
    path: "/forgot-password",
    element: (
      <Authtication
        form={<ForgetPasswordForm />}
        heading="Forgot Password"
        subheading="Reset your password"
      />
    ),
    breadcrumb: "Forgot Password",
    isAdmin: false,
  },
  {
    path: "/reset-password",
    element: (
      <Authtication
        form={<ResetPasswordForm />}
        heading="Reset Password"
        subheading="Enter a new password"
      />
    ),
    breadcrumb: "Reset Password",
    isAdmin: false,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    breadcrumb: "Contact Us",
    isAdmin: false,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    breadcrumb: "About Us",
    isAdmin: false,
  },
  {
    path: "/auction-sheet",
    element: <AuctionSheet />,
    breadcrumb: "Auction Sheet",
    isAdmin: false,
  },
  {
    path: "/shipments",
    element: <Shipments />,
    breadcrumb: "My Shipments",
    isAdmin: false,
  },
  {
    path: "/shipments/:id",
    element: <ShipmentDetails />,
    breadcrumb: "Shipment#12345",
    isAdmin: false,
  },
  { path: "*", element: <NotFound />, breadcrumb: "Not Found", isAdmin: false },

  ...adminRoutes,
];

export default routes;
