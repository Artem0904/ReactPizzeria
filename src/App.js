import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from './components/Layout';
import Pizzas from './components/Pizzas';
import CreateForm from './components/CreateForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<p>Home</p>} />
          <Route path="pizzas" element={<Pizzas/>}/>
          <Route path="pizzas/create" element={<CreateForm />} />
          <Route path="beverages" element={<p>Beverages</p>} />
          <Route path="*" element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;