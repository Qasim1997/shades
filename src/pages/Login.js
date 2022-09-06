import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link, Alert } from "@mui/material";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../services/authApi";
import { storeToken } from "../services/token";
import { useNavigate } from 'react-router-dom';
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (actualData.email && actualData.password) {
      const res = await loginUser(actualData);
      console.log(res, "res");
      if (res.data && res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });
        document.getElementById("formid").reset();
        storeToken(res.data.token);
        navigate("/");
      }
      if (res.error && res.error.data.status == "failed") {
        setError({ status: true, msg: res.error.data.message, type: "error" });
        console.log('clicked')
        console.log('clicked', error.msg)

      }
    }
     else {
      const res = await loginUser(actualData);
      console.log(res, "res eror");
      setemail({ status: true, email: res.data.validate_error.email[0] });
      setpassword({
        status: true,
        password: res.data.validate_error.password[0],
      });
    }
  };
  const [email, setemail] = useState({
    status: false,
    email: "",
  });
  const [password, setpassword] = useState({
    status: false,
    password: "",
  });
  console.log(password);
  const [buttonDisabled, setbuttonDisabled] = useState(true)


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
                    <Box component="form" id="formid" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>

                      <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="email" name="email"
                          placeholder="Enter email"
                          className={`form-control ${errors.email && "invalid"}`}
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
                      {errors.email && (
                        <small className="text-danger">{errors.email.message}</small>
                      )}

                      <div class="form-group">
                        <label for="userpassword">Password</label>
                        <input type="password" name="password" id="userpassword" placeholder="Enter password" className={`form-control ${errors.message && "invalid"}`}
                          {...register("password", {
                            onChange: (e) => { setpassword({ password: e.target.value }) }, required: "password is Required",
                            minLength: {
                              value: 8,
                              message: "Minimum Required length is 8",
                            },
                            maxLength: {
                              value: 50,
                              message: "Maximum allowed length is 50 ",
                            }
                          })}
                          onKeyUp={() => {
                            trigger("password");
                          }} />
                      </div>

                      <Grid item xs={12}>

                        {errors.password && (
                          <small className="text-danger">{errors.password.message}</small>
                        )}
                      </Grid>
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customControlInline" />
                        <label class="custom-control-label" for="customControlInline">Remember me</label>
                      </div>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!email.email || !password.password}
                      >
                        Sign In
                      </Button>
                      {error.status ? (
                        <Alert severity={error.type} sx={{ mt: 3 }}>
                          {error.msg}
                        </Alert>
                      ) : (
                        ""
                      )}

                      <div class="mt-4 text-center">
                        <a href="auth-recoverpw.html" class="text-muted"><i class="mdi mdi-lock mr-1"></i> Forgot your password?</a>
                      </div>
                    </Box>

                  </div>

                </div>
              </div>
              <div class="mt-5 text-center">
                <p>Don't have an account ? <a href="/signup" class="font-weight-medium text-primary"> Signup now </a> </p>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Login