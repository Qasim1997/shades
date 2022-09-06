import React, { useReducer, useState, useEffect } from 'react'
import Header from '../../component/Header'
import SideBar from '../../component/SideBar'
import { Modal } from 'antd';
import { useDeleteRoleMutation, useGetRolebyIdQuery, useGetRoleQuery, useUpdateRoleMutation } from '../../services/authApi'
import Data from './Data'
import EditRole from './EditRole'
import { Button, Box, Grid } from '@mui/material';
import { ButtonGroup } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import Template from '../Template'
import { Axios } from 'axios';
function Roles() {
  const { data, isSuccess, } = useGetRoleQuery()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const [addname, setaddname] = useState({
    status: false,
    addname: ""
  });
  useEffect(() => {
    if (isSuccess && data)
      window.location.reload();
  }, [forceUpdate])
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [deleteRole] = useDeleteRoleMutation();
  const deletedata = async (id) => {
    const res = await deleteRole(id);
    console.log(res, "res");
    // navigate("/client");
    if (res.data.status === 200) {
      window.location.reload();
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setname] = useState({
    status: false,

    name: "",
  }); const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [updateRole] = useUpdateRoleMutation()

  const changestatus = async (id) => {

    const res = await updateRole(id)
    console.log(res,'res')
    window.location.reload()
  }




  // forceUpdate()
  return (
    <div>

      <Template>
        <div class="main-content">

          <div>
            <div>
              <>
                <Button variant="primary" onClick={handleShow}>
                  Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>



           
              <div class="row">
                <div class="col-lg-12">
                  <div class="">
                    <div class="table-responsive">
                      <table class="table project-list-table table-nowrap table-centered table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" style={{ "width": "100px" }}>id</th>
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
                                    <td>{data.id}</td>
                                    <td>
                                      <h5 class="text-truncate font-size-14"><a href="#" class="text-dark">{data.name}</a></h5>
                                    </td>
                                    <td>{data.status === 'Active' ? <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  onClick={() => changestatus(data.id)} checked /> : <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() => changestatus(data.id)} />

                                    }</td>
                                    <td>

                                      <ButtonGroup>
                                        <Link to={`/admin/role/${data.id}`}>

                                          <Button variant="contained" className="me-5 ms-4" >
                                            Edit
                                          </Button>
                                        </Link>


                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          className="me-5 ms-4"
                                          onClick={() => deletedata(data.id)}
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






              <div class="row">
                <div class="col-12">
                  <div class="text-center my-3">
                    <a href="javascript:void(0);" class="text-success"><i class="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i> Load more </a>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <footer class="footer">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <script>document.write(new Date().getFullYear())</script>2022 © Skote.
                </div>
                <div class="col-sm-6">
                  <div class="text-sm-right d-none d-sm-block">
                    Design &amp; Develop by Themesbrand
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Template>

    </div>
  )
}

export default Roles