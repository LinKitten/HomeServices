import './App.css';

// 引入路由
import { BrowserRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom'

// 用于验证是否登录
import AuthRouter from './auth';

// 引入
import Home from '@/components/Home';
import BusinessIndex from '@/components/business/Index';
import BusinessProfile from '@/components/business/Profile';
import BusinessCoupon from '@/components/business/Coupon';
import BusinessComment from '@/components/business/Comment';

import Register from '@/components/Register';
import Login from '@/components/Login';
import Order from '@/components/order/Order';
import Info from '@/components/project/Info';
import Coupon from '@/components/Coupon';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*默认首页  */}
          <Route path="/" element={<Home />}></Route>

          <Route path="/" element={<Outlet />}>
            <Route path="business" element={<Outlet />}>
              <Route path="index" element={<AuthRouter auth={true} component={<BusinessIndex />} />}></Route>
              <Route path="profile" element={<AuthRouter auth={true} component={<BusinessProfile />} />}></Route>
              <Route path="coupon" element={<AuthRouter auth={true} component={<BusinessCoupon />} />}></Route>
              <Route path="comment" element={<AuthRouter auth={true} component={<BusinessComment />} />}></Route>
            </Route>
          </Route>


          <Route path="/" element={<Outlet />}>
            <Route path="order" element={<Outlet />}>
              <Route path="order" element={<Order />}></Route>
            </Route>
          </Route>

          <Route path="/" element={<Outlet />}>
            <Route path="project" element={<Outlet />}>
              <Route path="info" element={<Info />}></Route>
            </Route>
          </Route>

          <Route path="/" element={<Outlet />}>
            <Route path="order" element={<Outlet />}>
              <Route path="order" element={<Order />}></Route>
            </Route>
          </Route>



          <Route path="/coupon" element={<AuthRouter auth={true} component={<Coupon />} />}></Route>


          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
