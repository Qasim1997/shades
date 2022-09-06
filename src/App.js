import React from "react";
import logo from "./logo.svg";
import FunctionForm from "./pages/FunctionForm";
import Login from "./pages/Login";
import ServiceProvider from "./pages/ServiceProvider";

import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from "./pages/Client/User";
import Roles from "./pages/admin/Roles";
import EditRole from "./pages/admin/EditRole";
import 'antd/dist/antd.css';
import Client from "./pages/Client/Client";
import UpdateClient from "./pages/Client/UpdateClient";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<FunctionForm />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/serviceProvider" element={<ServiceProvider />} />
          <Route path="/admin/role" element={<Roles />} />
          <Route path="/admin/role/:id" element={<EditRole />} />
          <Route path="/client" element={<Client />} />
          <Route path="/client/:id" element={<UpdateClient />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
