import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersByTenantFail, fetchUsersByTenantStart, fetchUsersByTenantSuccess } from '../../redux/slices/usersByTenantsSlice'
import Loading from '../../pages/Loading'

const UsersSection = () => {
    const [ usersData, setUsersData ] = useState([])
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { users, status } = useSelector(state => state.usersByTenants)


    useEffect(() => {
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
        fetchUsersByTenants()
    },[dispatch])

    useEffect(() => {
        if (users){
            setUsersData(users)
        }
    }, [users])

    if (status && status === 'loading') {
        return (
            <Loading/>
        )
    }

  return (
        <div className="container mt-4">
                <h2 className="mb-4">Users Information Table</h2>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
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
                                                    <button className="btn btn-warning btn-sm me-3">
                                                    <FaEdit />
                                                    </button>
                                                    <button className="btn btn-danger btn-sm">
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