import React, { useState, useMemo , useEffect} from 'react';
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
import { useGetClientDataByIDQuery, usePostUserInfoMutation } from "../../services/authApi";
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Alert } from "@mui/material";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Template from '../Template';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
function UpdateClient() {

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
    }
    const [country, setcountry] = useState('')
    const [region, setregion] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();
    const {id} = useParams()
    const [email, setemail] = useState({
        status: false,
        email: "",
    });

    const [name, setname] = useState({
        status: false,
        name: ""
    });

    // const [country, setcountry] = useState({
    //     status: false,
    //     country: "",
    // });
    const [city, setcity] = useState({
        status: false,
        city: "",
    });
    const [category, setcategory] = useState({
        status: false,
        category: "",
    });
    // eslint-disable-next-line no-unused-vars
    const [phoneNumber, setphoneNumber] = useState({
        status: false,
        phoneNumber: "",
    });
    const [address, setaddress] = useState({
        status: false,
        address: "",
    });
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: "",
    });
    const {data, isSuccess} = useGetClientDataByIDQuery(id);
    const navigate = useNavigate();

    const [age, setAge] = React.useState('');

    const [state, setState] = useState({
        value:'',
        email:'',
    });
    useEffect(() => {
        if(data && isSuccess){
            console.log(data,'data')
            setState({value: data.name})
            setState({email: data.email})

      
        }
      }, [data , isSuccess ])
  return (
    <div><Template>
          <div>
            <div className="home-btn d-none d-sm-block">
                <a href="index.html" className="text-dark"><i className="fas fa-home h2"></i></a>
            </div>
            {state.name}
            <div className="account-pages my-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card overflow-hidden">
                                <div className="bg-soft-primary">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p>Sign in to continue to Skote.</p>
                                            </div>
                                        </div>
                                        <div className="col-5 align-self-end">
                                            <img src="assets/images/profile-img.png" alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div>
                                        <a href="index.html">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <img src="assets/images/logo.svg" alt="" className="rounded-circle" height="34" />
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        <Box
                                            component="form"
                                            id="formid"
                                            noValidate
                                            // onSubmit={onSubmit}
                                            sx={{ mt: 3 }}
                                        >
                                            
                                         
                                              <Grid item xs={12}>
                                                <div className="form-group">
                                                    <label for="name">name</label>
                                                    <input type="text" name="name" value={state.value} id="name" placeholder="Enter name" className={`form-control ${errors.message && "invalid"}`}
                                                        {...register("name", {
                                                            onChange: (e) => { setname({ name: e.target.value }) },

                                                            required: "name is Required",
                                                            minLength: {
                                                                value: 2,
                                                                message: "name is Required",
                                                            },
                                                            maxLength: {
                                                                value: 50,
                                                                message: "Maximum allowed length is 50 ",
                                                            }
                                                        })}
                                                        onKeyUp={() => {
                                                            trigger("name");
                                                        }} />
                                                </div>


                                                <Grid item xs={12} className="mt-3">

                                                    {errors.name && (
                                                        <small className="text-danger">{errors.name.message}</small>
                                                    )}
                                                </Grid>

                                            </Grid>

                                            <Grid item xs={12}>
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="email" id="email" value={state.email} name="email" placeholder="Enter email" className={`form-control ${errors.email && "invalid"}`}
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
                                                <label for="country">Country</label>

                                                <CountryDropdown value={country} name="country" className="form-control" id="name" required onChange={(val) => setcountry(val)} />

                                                <Grid item xs={12} className="mt-3">
                                                    {errors.country ? errors.country.message : ""}

                                                    {errors.country && (
                                                        <small className="text-danger">{errors.country.message}</small>
                                                    )}
                                                </Grid>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <label for="province">Province</label>

                                                <RegionDropdown country={country} value={region} name="province" className="form-control" onChange={(val) => setregion(val)} />
                                                <Grid item xs={12} className="mt-3">

                                                    {errors.province && (
                                                        <small className="text-danger">{errors.province.message}</small>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>


                                                <div class="form-group">
                                                    <label for="city">city</label>
                                                    <input type="text" name="city" id="city" placeholder="Enter city" className={`form-control ${errors.message && "invalid"}`}
                                                        {...register("city", {
                                                            onChange: (e) => { setcity({ city: e.target.value }) },

                                                            required: "city is Required",
                                                            minLength: {
                                                                value: 2,
                                                                message: "city is Required",
                                                            },
                                                            maxLength: {
                                                                value: 100,
                                                                message: "Maximum allowed length is 50 ",
                                                            }
                                                        })}
                                                        onKeyUp={() => {
                                                            trigger("city");
                                                        }} />
                                                </div>
                                                <Grid item xs={12} className="mt-3">

                                                    {errors.city && (
                                                        <small className="text-danger">{errors.city.message}</small>
                                                    )}
                                                </Grid>

                                            </Grid>
                                            <Grid item xs={12}>

                                                <div className="form-group">
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
                                                                value: 2,
                                                                message: "address is Required",
                                                            },
                                                            maxLength: {
                                                                value: 100,
                                                                message: "Maximum allowed length is 50 ",
                                                            }
                                                        })}
                                                        onKeyUp={() => {
                                                            trigger("address");
                                                        }}
                                                    />
                                                </div>
                                                <Grid item xs={12} className="mt-3">

                                                    {errors.address && (
                                                        <small className="text-danger">{errors.address.message}</small>
                                                    )}
                                                </Grid>

                                            </Grid>                                         
                                            <Button
                                                type="submit"
                                                fullWidth
                                                disabled={!email.email || !name.name || !city.city || !phoneNumber.phoneNumber || !address.address}
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}

                                            >
                                                User Register
                                            </Button>
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
                         

                        </div>
                    </div>
                </div>
            </div>


        </div>
        
        
        </Template></div>
  )
}

export default UpdateClient