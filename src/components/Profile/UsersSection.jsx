import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersByTenantFail, fetchUsersByTenantStart, fetchUsersByTenantSuccess, deleteSingleUserFail, deleteSingleUserStart, deleteSingleUserSuccess } from '../../redux/slices/usersByTenantsSlice'
import Loading from '../../pages/Loading'
import { Link } from 'react-router-dom'

const UsersSection = () => {
    const [ usersData, setUsersData ] = useState([])
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { users, status } = useSelector(state => state.usersByTenants)
    const { user : userDetails } = useSelector(state => state.user)

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

    if (status === 'loading') {
        return (
            <Loading/>
        )
    }

  return (
        <div className="container mt-4">
                <h2 className="mb-4">Users Information Table</h2>
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