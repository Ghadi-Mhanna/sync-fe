import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
//Private route
import PrivateRoute from "./routes/PrivateRoute";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import NewsDetails from "./pages/NewsDetails";
import CategoryDetails from "./pages/CategoryDetails";
import UserDetails from "./pages/UserDetails";
import NewCategory from "./pages/NewCategory";
import NewUser from "./pages/NewUser";
import NewNews from "./pages/NewNews";
import {useSelector} from "react-redux";

function App() {
  const {user} = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/news/:uuid' element={<NewsDetails />} />
        <Route path='/create-news' element={<NewNews />} />
        {(user?.role === "superAdmin" || user?.role === "admin") && (
          <>
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/:uuid' element={<CategoryDetails />} />
            <Route path='/create-category' element={<NewCategory />} />
          </>
        )}

        {user?.role === "superAdmin" && (
          <>
            <Route path='/users' element={<Users />} />
            <Route path='/user/:uuid' element={<UserDetails />} />
            <Route path='/create-user' element={<NewUser />} />
          </>
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
}

export default App;
