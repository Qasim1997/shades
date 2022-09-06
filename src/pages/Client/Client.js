import React from 'react'
import { useGetClientDataQuery } from '../../services/authApi'
import Template from '../Template'
import { Button, Box, Grid } from '@mui/material';
import { ButtonGroup } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
function Client() {
    const {data, isSuccess} = useGetClientDataQuery()
  return (
    <div>

<Template>

<div class="row">
                <div class="col-lg-12">
                  <div class="">
                    <div class="table-responsive">
                      <table class="table project-list-table table-nowrap table-centered table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" style={{ "width": "100px" }}>id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Country</th>
                            <th scope="col">Region</th>
                            <th scope="col">City</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            isSuccess && (
                              <>
                                {data.map((data, i) => (
                                  <tr key={i}>
                                    <td>{data.id}</td>
                                    <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.name}</a></h5>
                                    </td>
                                    <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.email}</a></h5>
                                    </td>  <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.country}</a></h5>
                                    </td>  <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.region}</a></h5>
                                    </td>  <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.city}</a></h5>
                                    </td>  <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.phone_number}</a></h5>
                                    </td>  <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.address}</a></h5>
                                    </td> 
                                    
   
                                    <td>

                                      <ButtonGroup>
                                        <Link to={`/client/${data.id}`}>

                                          <Button variant="contained" className="me-5 ms-4" >
                                            Edit
                                          </Button>
                                        </Link>


                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          className="me-5 ms-4"
                                        //   onClick={() => deletedata(data.id)}
                                        >
                                          Delete
                                        </Button>



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

</Template>

    </div>
  )
}

export default Client