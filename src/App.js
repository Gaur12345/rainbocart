import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import RegisterForm from './moduls/ClientFolder/RegisterForm';
import UserLogin from './moduls/ClientFolder/UserLogin';
import ShopDetailsStepperForm from './moduls/ClientFolder/ShopDetailsStepperForm';
import Home from './moduls/ClientFolder/Home';
import AddColor from './moduls/ClientFolder/AddColors';
import AddSize from './moduls/ClientFolder/AddSize';
import AddCompany from './moduls/ClientFolder/AddCompany';
import AddNewProduct from './moduls/ClientFolder/NewProduct';
import AddProduct from './moduls/ClientFolder/AddProduct';
import ShowAllProduct from './moduls/ClientFolder/ShowAllProduct';
import Profile from './moduls/ClientFolder/Profile';
import NewOrder from './moduls/ClientFolder/NewOder';
import GenrateInvoice from './moduls/ClientFolder/GenrateInvoice';
import MyOrders from './moduls/Customer/MyOrders';
import OrderMoreDetails from './moduls/Customer/OrderMoreDetails';
import CustomerProfile from './moduls/Customer/CustomerProfile';
import SellerForgotPassword from './moduls/ClientFolder/ForgotPassword';
import SellerChangePassword from './moduls/ClientFolder/ChangePassword';
import OrderHistory from './moduls/ClientFolder/OrderHistory';
import ReturnOrderInfo from './moduls/ClientFolder/ReturnOrderInfo';
import HistoryMoreDetail from './moduls/ClientFolder/HistoryMoreDetail';
import ReturnMoreDetail from './moduls/ClientFolder/ReturnMoreDetails';
import AllCustomerInfo from './moduls/ClientFolder/AllCustomerInfo';
import ProductInfo from './moduls/Customer/ProductInfo';
/// Home Page 
import HomeCustomer from './moduls/HomePage/HomeCustomer';
import ContactUS from './moduls/HomePage/ContactUS.js';
import AboutUSComponent from './moduls/HomePage/AboutUS.js';
import PrivacyPolicy from './moduls/HomePage/PrivacyPolicy.js';
import CancellationPolicy from './moduls/HomePage/CancellationPolicy';
/// Customer 
import SearchShop from './moduls/Customer/SearchShop';
import ShowShopProduct from './moduls/Customer/ShowShopProduct';
import CustomerRegistration from './moduls/Customer/RegisterForm';
import CustomerLogin from './moduls/Customer/UserLogin';
import CustomerCart from './moduls/Customer/CustomerCart';
import CheckOut from './moduls/Customer/CheckOut';
import NewOrderDetails from './moduls/ClientFolder/NewOrderDetails';
import ShowInvoice from './moduls/ClientFolder/ShowInvoice';
import RozePay from './moduls/Customer/RozePay';
import Logout from './moduls/Customer/Logout';
import ReturnPolicy from './moduls/Customer/ReturnPolicy';
import TermCondition from './moduls/Customer/TermCondition';
import VerifyCustomerEmail from './moduls/Customer/VerifyEmail';
import ForgotCustomerPassword from './moduls/Customer/ForgotPassword';
import CustomerChnagePassword from './moduls/Customer/ChangePassword';
import BuyNowCheckOut from './moduls/Customer/BuyNowCheckOut';
import OrderConfirmed from './moduls/Customer/OrderConfirmed'
// Delivery Boy 

import DeliveryBoyRegistration from './moduls/Deliveryboy/RegisterForm';
import DelivertBoyLogin from './moduls/Deliveryboy/UserLogin';
import DeliveryBoyHome from './moduls/Deliveryboy/DeliveryBoyHome';
import DeliveryBoyForgetPassword from './moduls/Deliveryboy/ForgotPassword';
import DeliveryBoyChangePassword from './moduls/Deliveryboy/ChangePassword';
//Admin 
import AdminLogin from './moduls/Admin/Adminlogin';
import adminHome  from './moduls/Admin/adminHome';
import TotalCustomer from './moduls/Admin/TotalCustomer';
import SellerDetails from './moduls/Admin/SellerDetails';
import TotalDeliveryBoy from './moduls/Admin/TotalDeliveryBoy';
import AdminProfile from './moduls/Admin/AdminProfile';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
    <Switch>  
      <Route path="/shopRegistration" exact component={RegisterForm} ></Route>
      <Route path="/" exact component={HomeCustomer} ></Route>
      <Route path="/userLogin" exact component={UserLogin} />
      <Route path="/Home" exact component={Home} />
      <Route path="/ShopDetailsStepperForm" exact component={ShopDetailsStepperForm} />
      <Route path="/addColors" exact component={AddColor} />
      <Route path="/AddSize" exact component={AddSize} /> 
      <Route path="/addCompany" exact component={AddCompany} />
      <Route path="/addNewProduct" exact component={AddNewProduct} />
      <Route path="/addProduct" exact component={AddProduct} />
      <Route path="/ShowAllProduct" exact component={ShowAllProduct} />
      <Route path="/Profile" exact component={Profile} />
      <Route path="/NewOrder" exact component={NewOrder} />
      <Route path="/NewOrderDetails/:userData" exact component={NewOrderDetails} />
      <Route path="/ShowInvoice/:invoiceData" exact component={ShowInvoice} />
      <Route path="/GenrateInvoice/:invoiceData" exact component={GenrateInvoice} />
      <Route path="/SellerForgotPassword" exact component={SellerForgotPassword} />
      <Route path="/SellerChangePassword" exact component={SellerChangePassword} />
      <Route path="/OrderHistory" exact component={OrderHistory}/>
      <Route path="/ReturnOrderInfo" exact component={ReturnOrderInfo}/>
      <Route path="/HistoryMoreDetail/:userData" exact component={HistoryMoreDetail}/>
      <Route path="/ReturnMoreDetail/:userData" exact component={ReturnMoreDetail}/>
      <Route path="/AllCustomerInfo" exact component={AllCustomerInfo}/>
      <Route path="/ProductInfo" exact component={ProductInfo}/>

      <Route path="/CustomerUser" exact component={HomeCustomer} />
      <Route path="/SearchShop/:searchIteamData" exact component={SearchShop} />
      <Route path="/showShopProduct" exact component={ShowShopProduct} />
      <Route path="/CustomerRegistration" exact component={CustomerRegistration} />
      <Route path="/CustomerLogin" exact component={CustomerLogin} />
      <Route path="/CustomerCart" exact component={CustomerCart} />
      <Route path="/CheckOut" exact component={CheckOut} />
      <Route path="/onlinePayment" exact component={RozePay} />
      <Route path="/paymentOnline" />
      <Route path="/BuyNowCheckOut" exact component={BuyNowCheckOut} />
      <Route path="/MyOrders" exact component={MyOrders} />
      <Route path="/OrderMoreDetails/:orderNumber" exact component={OrderMoreDetails} />
      <Route path="/CustomerProfile" exact component={CustomerProfile} />
      <Route path="/Logout" exact component={Logout} />
      <Route path="/returnPolicy" exact component={ReturnPolicy} />
      <Route path="/TermCondition" exact component={TermCondition} />
      <Route path="/verifyCustomerEmail" exact component={VerifyCustomerEmail} />
      <Route path="/ForgotCustomerPassword" exact component={ForgotCustomerPassword} />
      <Route path="/CustormerChangePassword" exact component={CustomerChnagePassword} />
      <Route path="/OrderConfirmed" exact component={OrderConfirmed}/>
      <Route path="/ContactUS" exact component={ContactUS} />
      <Route path="/AboutUS" exact component={AboutUSComponent} />
      <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />
      <Route path="/CancellationPolicy" exact component={CancellationPolicy} />
      
      <Route path="/DeliveryBoyLogin" exact component={DelivertBoyLogin} />
      <Route path="/DeliveryBoyRegistration" exact component={DeliveryBoyRegistration} />
      <Route path="/deliveryBoyHome" exact component={DeliveryBoyHome} />
      <Route path="/DeliveryForgotPassword" exact component={DeliveryBoyForgetPassword} />
      <Route path="/DeliveryChangePassword" exact component={DeliveryBoyChangePassword} />

      <Route path="/AdminLogin" exact component={AdminLogin} />
      <Route path="/adminHome" exact component={adminHome} />
      <Route path="/TotalCustomer" exact component={TotalCustomer}/>
      <Route path="/SellerDetails" exact component={SellerDetails}/>
      <Route path="/TotalDeliveryBoy" exact component={TotalDeliveryBoy}/>
      <Route path="/AdminProfile" exact component={AdminProfile}/>




    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
