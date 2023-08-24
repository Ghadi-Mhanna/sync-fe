import React from "react";
import {Routes, Route} from "react-router-dom";
//Private route
import PrivateRoute from "./routes/PrivateRoute";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import NewsDetails from "./pages/NewsDetails";
import CategoryDetailsPage from "./pages/CategoryDetails";
import CategoryDetails from "./pages/CategoryDetails";
import UserDetails from "./pages/UserDetails";
import NewCategory from "./pages/NewCategory";
import NewUser from "./pages/NewUser";
import NewNews from "./pages/NewNews";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route exact path='/' element={<Home />} />
      </Route>
      <Route exact path='/news' element={<PrivateRoute />}>
        <Route exact path='/news' element={<News />} />
      </Route>
      <Route exact path='/news/:uuid' element={<PrivateRoute />}>
        <Route exact path='/news/:uuid' element={<NewsDetails />} />
      </Route>
      <Route exact path='/create-news' element={<PrivateRoute />}>
        <Route exact path='/create-news' element={<NewNews />} />
      </Route>
      <Route exact path='/categories' element={<PrivateRoute />}>
        <Route exact path='/categories' element={<Categories />} />
      </Route>
      <Route exact path='/categories/:uuid' element={<PrivateRoute />}>
        <Route exact path='/categories/:uuid' element={<CategoryDetails />} />
      </Route>
      <Route exact path='/create-category' element={<PrivateRoute />}>
        <Route exact path='/create-category' element={<NewCategory />} />
      </Route>
      <Route exact path='/users' element={<PrivateRoute />}>
        <Route exact path='/users' element={<Users />} />
      </Route>
      <Route exact path='/user/:uuid' element={<PrivateRoute />}>
        <Route exact path='/user/:uuid' element={<UserDetails />} />
      </Route>
      <Route exact path='/create-user' element={<PrivateRoute />}>
        <Route exact path='/create-user' element={<NewUser />} />
      </Route>
    </Routes>
  );
}

export default App;
