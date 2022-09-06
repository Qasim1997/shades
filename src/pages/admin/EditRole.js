/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useGetRoleQuery, useGetRolebyIdQuery, useUpdaterolenameMutation } from '../../services/authApi';
import { Button, Box, Alert } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import Template from '../Template';


function EditRole() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const responseInfo = useGetRolebyIdQuery(id)
    console.log(responseInfo, 'getRolebyId');
    const { data, isLoading, isSuccess } = useGetRoleQuery();

    const [status, setstatus] = useState({
        status: false,
        status: "",
    });
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: "",
    });
    const [updaterolename] = useUpdaterolenameMutation()
    const [name, setname] = useState('');
      const onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          name: data.get("name"),
        });
        const actual_data = {
          name: data.get("name"),
        };
        if (actual_data.name) {
            console.log(actual_data.name);
          const res = await updaterolename({actual_data , id});
          console.log(res, "res");
          console.log(res, 'res')
          if (res.data.status === 'success') {
              setError({ status: true, msg: res.data.message, type: "success" });
              document.getElementById("formid").reset();
              navigate('/admin/role')
          }
          else{
            console.log('asasa')
          }
        }
      
      };
      const [state, setState] = useState({
        value:'',
        show:''
    });
    const handleChange = (e) => {
        setState({value: e.target.value})
    }
    

      useEffect(() => {
        if(responseInfo.data && responseInfo.isSuccess){
            setState({value: responseInfo.data.name})
        }
      }, [responseInfo.data , responseInfo.isSuccess ])
      
    return (
      <>
      <Template>
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
                            <input type="text" id="name" className="form-control" name="name"
                              placeholder="Enter name" value={state.value} onChange={(e)=>handleChange(e)} 
                              />
                          </div>
                        
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          //   disabled={!email.email || !password.password}
                          >
                            Edit
                          </Button>
                          {error.status ? (
                          <Alert severity={error.type} sx={{ mt: 3 }}>
                            {error.msg}
                          </Alert>
                        ) : (
                          ""
                        )}
                       
    
                          
                        </Box>
    
                      </div>
    
                    </div>
                  </div>
                  
    
                </div>
              </div>
            </div>
          </div>
    
    
        </div>
      </Template>
      
      </>
        
     
    )
}

export default EditRole