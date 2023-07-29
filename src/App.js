import './App.css';

// 引入路由
import { BrowserRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom'


// 引入
import Home from '@/components/Home';
import BusinessIndex from '@/components/business/Index';
import BusinessProfile from '@/components/business/Profile';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Order from '@/components/order/Order';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*默认首页  */}
          <Route path="/" element={<Home />}></Route>

          <Route path="/" element={<Outlet />}>

            <Route path="business" element={<Outlet />}>
              <Route path="index" element={<BusinessIndex />}></Route>
              <Route path="profile" element={<BusinessProfile />}></Route>
            </Route>

            <Route path="order" element={<Outlet />}>
              <Route path="order" element={<Order />}></Route>
            </Route>


          </Route>




          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;