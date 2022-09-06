/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { second } from '../../'
import { useForm } from 'react-hook-form';
import { useGetRoleQuery, usePostRoleMutation } from '../../services/authApi';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
function Roles() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();
    const [postRole] = usePostRoleMutation()
    const { data, error, isLoading, isSuccess } = useGetRoleQuery();
    const [name, setname] = useState({
        status: false,
        name: "",
    });
    const [status, setstatus] = useState({
        status: false,
        status: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get("name"),
            status: data.get("status"),
        });
        const actualData = {
            name: data.get("name"),
            status: data.get("status"),
        }
        if (actualData.name && actualData.status) {
            const res = await postRole(actualData)
            console.log(res, 'res')
        }

    }
    return (
        <>
            <div className='isErrorIsLoading'>
                {error && <p>An error occured</p>}
                {isLoading && <p>Loading...</p>}
            </div>
            <div className="site-button-ghost-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 col-sm-12">
                            <form onSubmit={onSubmit}
                            >
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" name="name" id="name" placeholder="Enter name" className={`form-control ${errors.message && "invalid"}`}
                                        {...register("name", {
                                            onChange: (e) => { setname({ name: e.target.value }) }, required: "Name is Required",
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
                                            trigger("name");
                                        }} />
                                </div>
                                {errors.name && (
                                    <small className="text-danger">{errors.name.message}</small>
                                )}

                                <div class="form-group">
                                    <label for="status">Choose Your status</label>
                                    <select class="form-control" id="status" name="status" {...register('status', {
                                        required: "Statu is required", onChange: (e) => { setstatus({ status: e.target.value }) },
                                    })} onKeyUp={() => {
                                        trigger("status");
                                    }} onClick={() => {
                                        trigger("status");
                                    }} >
                                        {/* {
                                            isSuccess && (
                                                <>
                                                    <option value="">--- Select Your State ---</option>

                                                    {data.map((o, i) => (
                                                        <>
                                                            <option key={o.value} value={o.value}>
                                                                {o.name}
                                                            </option>
                                                        </>
                                                    ))}
                                                </>
                                            )
                                        } */}
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>

                                    </select>
                                </div>
                                {errors.status && (
                                    <small className="text-danger">{errors.status.message}</small>
                                )}
                                <br />
                                <Button
                                    type="submit"

                                    fullWidth

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}

                                >
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-12">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        isSuccess && (
                                            <>
                                                {data.map((data, i) => (
                                                    <tr key={i}>

                                                        <td>{i + 1}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.status}</td>

                                                        <td>

                                                            <ButtonGroup>
                                                                <Link to={`/admin/role/${data.id}`}>

                                                                    <Button variant="contained" className="me-2" >
                                                                        Edit
                                                                    </Button>
                                                                </Link>

                                                                <Link to={`/admin/role/${data.id}`}>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        className="me-2"
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Link>


                                                            </ButtonGroup>


                                                        </td>

                                                    </tr>

                                                ))}



                                            </>
                                        )
                                    }
                                </tbody>


                            </table>
                        </div>
                    </div>



                </div>





            </div>



        </>



    )
}

export default Roles
