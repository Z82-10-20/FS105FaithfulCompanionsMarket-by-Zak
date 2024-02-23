import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store'; // Import your Redux store

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import App from './App';
import HomePage from "./pages/HomePage.jsx";
import CatPage from "./pages/CatPage.jsx";
import DogPage from "./pages/DogPage.jsx";
import BirdPage from "./pages/BirdPage.jsx";
import FishesPage from "./pages/FishesPage.jsx";
import PetAccessoriesPage from "./pages/PetAccessoriesPage.jsx";
import PetFood from "./pages/PetFood.jsx";
import ContactUsFrom from "./pages/Contact.jsx";
import About from "./pages/About";
import LandingPage from './pages/LandingPage';
import Cart from "./pages/CartPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ResetPassword from "./pages/ResetPassword";
import CatDetail from "./pages/CatDetail.jsx";
import DogDetail from "./pages/DogDetail.jsx";
import BirdDetail from "./pages/BirdDetail.jsx";
import FishDetail from "./pages/FishDetail.jsx";
import AccessoryDetail from "./pages/AccessoryDetail.jsx";
import PetFoodDetail from "./pages/PetFoodDetail.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import OrderListPage from './pages/admin/OrderListPage.jsx';
import UserListPage from './pages/admin/UserListPage.jsx';
import UserEditPage from './pages/admin/UserEditPage.jsx';
import BirdListPage from './pages/admin/BirdListPage.jsx';
import CatListPage from './pages/admin/CatListPage.jsx';
import BirdEditPage from './pages/admin/BirdEditPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      {/* PUBLIC ROUTES */}
      <Route index={true} path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/contactus" element={<ContactUsFrom />} />

      {/* Product routes */}
      <Route path="/cats" element={<CatPage />} />
      <Route path="/cat-detail/:id/:name" element={<CatDetail />} />
      <Route path="/dogs" element={<DogPage />} />
      <Route path="/dog-detail/:id/:name" element={<DogDetail />} />
      <Route path="/birds" element={<BirdPage />} />
      <Route path="/bird-detail/:id/:name" element={<BirdDetail />} />
      <Route path="/fishes" element={<FishesPage />} />
      <Route path="/fish-detail/:id/:name" element={<FishDetail />} />
      <Route path="/petaccessories" element={<PetAccessoriesPage />} />
      <Route path="/accessory-detail/:id/:name" element={<AccessoryDetail />} />
      <Route path="/petfoods" element={<PetFood />} />
      <Route path="/petfood-detail/:id/:name" element={<PetFoodDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      
      
     {/* Private routes */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage/>} />
          <Route path="/orders/:id" element={<OrderPage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
      </Route>
   {/* Admin routes */}
      <Route path="/" element={<AdminRoute />}>
     <Route path="/admin/orderlist" element={<OrderListPage />} />
     <Route path="/admin/userlist" element={<UserListPage />} />
     <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
     <Route path="/admin/birdlist" element={<BirdListPage />} />
     <Route path="/admin/birdlist/:id/edit" element={<BirdEditPage />} />
     <Route path="/admin/catlist" element={<CatListPage />} />
      </Route>
    </Route>

   
    
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
