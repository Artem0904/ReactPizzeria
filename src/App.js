import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Pizzas from './components/Pizzas';
import Beverages from './components/Beverages';
import CreateForm from './components/CreateForm';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pizzas" element={<Pizzas/>}/>
          <Route path="login" element={<Login />} />
          <Route path="pizzas/create" element={<CreateForm />} />
          <Route path="pizzas/edit/:id" element={<CreateForm />} />
          <Route path="beverages" element={<Beverages />} />
          <Route path="*" element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;