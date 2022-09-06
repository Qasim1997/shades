/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useRegisterUserMutation, useServiceProviderregisterMutation } from "../services/authApi";
import { useNavigate } from 'react-router-dom';
import { Link, Alert } from "@mui/material";

import Select from '@mui/material/Select';
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [email, setemail] = useState({
    status: false,
    email: "",
  });

  const [companyName, setcompanyName] = useState({
    status: false,
    companyName: ""
  });

  const [category, setcategory] = useState({
    status: false,
    category: "",
  });
  const [subCategory, setsubCategory] = useState({
    status: false,
    subCategory: "",
  });
  const [totalEmployee, settotalEmployee] = useState({
    status: false,
    totalEmployee: "",
  }); const [phoneNumber, setphoneNumber] = useState({
    status: false,
    phoneNumber: "",
  }); const [address, setaddress] = useState({
    status: false,
    address: "",
  });
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [serviceProviderregister] = useServiceProviderregisterMutation();
  const navigate = useNavigate();

  const [age, setAge] = React.useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("companyName"),
      email: data.get("email"),
      category: data.get("category"),
      total_employees: data.get("totalEmployees"),
      phone_no: data.get("phoneNumber"),
      address: data.get("address"),

    });
    const ActualData = {
      name: data.get("companyName"),
      email: data.get("email"),
      category: data.get("category"),
      total_employees: data.get("totalEmployees"),
      phone_no: data.get("phoneNumber"),
      address: data.get("address"),
    }
    if(ActualData.name && ActualData.email && ActualData.category && ActualData.total_employees && ActualData.phone_no && ActualData.address)
    {
      const res = await serviceProviderregister(ActualData)
      console.log(res,'res')     
        if (res.data.status ==='success') {
          setError({ status: true, msg: res.data.message, type: "success" });
          document.getElementById("formid").reset();
          navigate("/login");
        }
        if(res.data.status ==='failed'){
          setError({ status: true, msg: res.data.message, type: "error" });
          document.getElementById("formid").reset();
        }      
    }
    
    



  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>

      <div class="home-btn d-none d-sm-block">
        <a href="index.html" class="text-dark"><i class="fas fa-home h2"></i></a>
      </div>
      <div class="account-pages my-5 pt-sm-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card overflow-hidden">
                <div class="bg-soft-primary">
                  <div class="row">
                    <div class="col-7">
                      <div class="text-primary p-4">
                        <h5 class="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </div>
                    <div class="col-5 align-self-end">
                      <img src="assets/images/profile-img.png" alt="" class="img-fluid" />
                    </div>
                  </div>
                </div>
                <div class="card-body pt-0">
                  <div>
                    <a href="index.html">
                      <div class="avatar-md profile-user-wid mb-4">
                        <span class="avatar-title rounded-circle bg-light">
                          <img src="assets/images/logo.svg" alt="" class="rounded-circle" height="34" />
                        </span>
                      </div>
                    </a>
                  </div>
                  <div class="p-2">
                    <Box
                      component="form"
                      id="formid"
                      noValidate
                      onSubmit={onSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <div class="form-group">
                            <label for="username">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter email" className={`form-control ${errors.email && "invalid"}`}
                              {...register("email", {
                                onChange: (e) => { setemail({ email: e.target.value }) },

                                required: "Email is Required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                }
                              })}
                              onKeyUp={() => {
                                trigger("email");
                              }} />
                          </div>
                          <Grid item xs={12} className="mt-3">

                            {errors.email && (
                              <small className="text-danger">{errors.email.message}</small>
                            )}
                          </Grid>

                        </Grid>

                        <Grid item xs={12}>
                          <div class="form-group">
                            <label for="username">companyName</label>
                            <input type="text" name="companyName" id="companyName" placeholder="Enter companyName" className={`form-control ${errors.message && "invalid"}`}
                              {...register("companyName", {
                                onChange: (e) => { setcompanyName({ companyName: e.target.value }) },

                                required: "companyName is Required",
                                minLength: {
                                  value: 4,
                                  message: "companyName is Required",
                                },
                                maxLength: {
                                  value: 50,
                                  message: "Maximum allowed length is 50 ",
                                }
                              })}
                              onKeyUp={() => {
                                trigger("companyName");
                              }} />
                          </div>


                          <Grid item xs={12} className="mt-3">

                            {errors.companyName && (
                              <small className="text-danger">{errors.companyName.message}</small>
                            )}
                          </Grid>

                        </Grid>



                        <Grid item xs={12}>
                          <label for="Category">Category</label>

                          <select class="form-select form-control" aria-label="Default select example" name="category" onChange={(e) => { setcategory({ category: e.target.value }) }}>

                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>

                  
                          <Grid item xs={12} className="mt-3">

                            {errors.category && (
                              <small className="text-danger">{errors.category.message}</small>
                            )}
                          </Grid>

                        </Grid>
                        <Grid item xs={12}>
                          <div class="form-group">
                            <label for="totalEmployees">Total Employees</label>
                            <input type="number" name="totalEmployees" id="totalEmployees" placeholder="Enter totalEmployees" className={`form-control ${errors.message && "invalid"}`}
                              {...register("totalEmployees", {
                                onChange: (e) => { settotalEmployee({ totalEmployee: e.target.value }) },

                                required: "totalEmployees is Required",
                                minLength: {
                                  value: 4,
                                  message: "totalEmployees is Required",
                                },
                                maxLength: {
                                  value: 50,
                                  message: "Maximum allowed length is 50 ",
                                }
                              })}
                              onKeyUp={() => {
                                trigger("totalEmployees");
                              }} />
                          </div>
                          <Grid item xs={12} className="mt-3">

                            {errors.totalEmployees && (
                              <small className="text-danger">{errors.totalEmployees.message}</small>
                            )}
                          </Grid>

                        </Grid>

                        <Grid item xs={12}>

                          <div class="form-group">
                            <label for="phoneNumber">Phone Number</label>
                            <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phoneNumber" className={`form-control ${errors.message && "invalid"}`}
                              {...register("phoneNumber", {
                                onChange: (e) => { setphoneNumber({ phoneNumber: e.target.value }) },

                                required: "phoneNumber is Required",
                                minLength: {
                                  value: 11,
                                  message: "phoneNumber is Required",
                                },
                                maxLength: {
                                  value: 50,
                                  message: "Maximum allowed length is 50 ",
                                }
                              })}
                              onKeyUp={() => {
                                trigger("phoneNumber");
                              }} />
                          </div>
                          <Grid item xs={12} className="mt-3">

                            {errors.phoneNumber && (
                              <small className="text-danger">{errors.phoneNumber.message}</small>
                            )}
                          </Grid>

                        </Grid>

                        <Grid item xs={12}>


                          <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" name="address" id="address" placeholder="Enter address" className={`form-control ${errors.message && "invalid"}`}
                              {...register("address", {
                                onChange: (e) => { setaddress({ address: e.target.value }) },

                                required: "address is Required",
                                minLength: {
                                  value: 30,
                                  message: "address is Required",
                                },
                                maxLength: {
                                  value: 100,
                                  message: "Maximum allowed length is 50 ",
                                }
                              })}
                              onKeyUp={() => {
                                trigger("address");
                              }} />
                          </div>
                          <Grid item xs={12} className="mt-3">

                            {errors.address && (
                              <small className="text-danger">{errors.address.message}</small>
                            )}
                          </Grid>

                        </Grid>

                        <Button
                          type="submit"
                          disabled={!email.email || !companyName.companyName || !category.category || !totalEmployee.totalEmployee || !phoneNumber.phoneNumber || !address.address}
                          fullWidth

                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}

                        >
                          Sign Up
                        </Button>
                      </Grid>
                      <div class="mt-4 text-center">
                        <p class="mb-0">By registering you agree to the Skote <a href="#" class="text-primary">Terms of Use</a></p>
                      </div>
                    </Box>
                    {error.status ? (
                      <Alert severity={error.type} sx={{ mt: 3 }}>
                        {error.msg}
                      </Alert>
                    ) : (
                      ""
                    )}


                  </div>

                </div>
              </div>
              <div class="mt-5 text-center">
                <p>Already have an account ? <a href="/login" class="font-weight-medium text-primary"> Login</a> </p>
                <p>© 2020 Skote. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
              </div>
              {error.msg}

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Signup