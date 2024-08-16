import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersByTenantFail, fetchUsersByTenantStart, fetchUsersByTenantSuccess, deleteSingleUserFail, deleteSingleUserStart, deleteSingleUserSuccess } from '../../redux/slices/usersByTenantsSlice'
import Loading from '../../pages/Loading'
import { Link } from 'react-router-dom'
import RegisterUser from './RegisterUser'
import ErrorMessage from '../Layouts/ErrorMessage'

const UsersSection = () => {
    const [ usersData, setUsersData ] = useState([])
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { users, status, error } = useSelector(state => state.usersByTenants)
    const { user : userDetails } = useSelector(state => state.user)
    const { status : registerSts } = useSelector(state => state.registerUser)
    const [showError, setShowError] = useState(false)

    const fetchUsersByTenants = async () => {
        try{
            dispatch(fetchUsersByTenantStart())
            const response  = await axios.get(`http://localhost:8000/users/t-users/`, {
                headers : {
                    Authorization : `Bearer ${token.idToken}`
                }
            })
            if (response.status === 200) {
                dispatch(fetchUsersByTenantSuccess(response.data))
            }
        }catch(err){
            dispatch(fetchUsersByTenantFail(err.toString()))
        }
    }

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setShowError(true);
          }, 500); // Delay of 2 seconds before showing the error
    
          return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [error]);

    useEffect(() => {
        if(registerSts === "success"){
            fetchUsersByTenants()
        }
    },[registerSts])

    useEffect(() => {
        fetchUsersByTenants()
    },[dispatch])

    useEffect(() => {
        if (users){
            setUsersData(users)
        }
    }, [users])
    

    const handleDeleteClick = async (userId) => {
            try{
                dispatch(deleteSingleUserStart())
                const response  = await axios.delete(`http://localhost:8000/users/user/${userId}/`, {
                    headers : {
                        Authorization : `Bearer ${token.idToken}`
                    }
                })
                if (response.status === 200) {
                    dispatch(deleteSingleUserSuccess(response.data))
                    fetchUsersByTenants()
                }
            }catch(err){
                dispatch(deleteSingleUserFail(err.toString()))
            }
    }

    if (showError){
        return (
            <div className='container mt-4'>
                <ErrorMessage error_msg={error} is_main={false}/>
            </div>
            
        )
    }

    if (status === 'loading') {
        return (
            <Loading compon={"not-main"}/>
        )
    }

  return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className="">Users Information Table</h2>
                <button type="button" className="btn btn-primary d-flex align-items-center gap-2 font-weight-bold" data-toggle="modal" data-target="#exampleModalCenter">
                    Create <FaPlus/>
                </button>
            </div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Register User</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <RegisterUser />
                </div>
                </div>
            </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead >
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Tenant</th>
                    <th scope="col">Phone no</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersData && (
                            usersData.map(each_user => {
                                return (
                                    <tr key={each_user.user_id}>
                                        <td>{each_user.username}</td>
                                        <td>{each_user.role}</td>
                                        <td>{each_user.tenant}</td>
                                        <td>{each_user.phone_no}</td>
                                        <td>{each_user.email}</td>
                                        <td className='d-flex justify-content-center align-items-center'>
                                            <Link to={`/user/${each_user.user_id}`} className="btn btn-warning btn-sm me-3">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => handleDeleteClick(each_user.user_id)} className="btn btn-danger btn-sm" disabled = { (each_user?.role === "superadmin") || (((userDetails?.role === "admin") &&  (each_user?.role === "admin"))) }>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
  )
}

export default UsersSection