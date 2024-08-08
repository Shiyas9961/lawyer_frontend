import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { editSingleUserFail, editSingleUserStart, editSingleUserSuccess, fetchSingleUserFail, fetchSingleUserStart, fetchSingleUserSuccess } from '../redux/slices/singleUserSlice'
import axios from 'axios'
import Loading from './Loading'

const EditUser = () => {

  const { user : singleUser, status } = useSelector(state => state.singleUser)
  const { user : userDetails } = useSelector(state => state.user)
  const { token } = useSelector(state => state.auth)
  const [username, setUsername] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [role, setRole] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()

  const handleSaveClick = async () => {
    const data = {}
    if (username) {
      data['username'] = username
    }
    if (phoneNo) {
      data['phone_no'] = phoneNo
    }
    if (role) {
      data['role'] = role
    }
    try{
      dispatch(editSingleUserStart())
      const response = await axios.put(`http://localhost:8000/users/user/${id}/`, data, {
        headers : {
          Authorization : `Bearer ${token.idToken}`
        }
      })
      if (response.status === 200){
        dispatch(editSingleUserSuccess(response.data.message))
      }
    }catch(err){
      dispatch(editSingleUserFail(err.toString()))
        }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try{
        dispatch(fetchSingleUserStart())
        const response = await axios.get(`http://localhost:8000/users/user/${id}/`, {
          headers : {
            Authorization : `Bearer ${token.idToken}`
          }
        })
        if (response.status === 200){
          dispatch(fetchSingleUserSuccess(response.data))
        }
      }catch(err){
        dispatch(fetchSingleUserFail(err.toString()))
      }
    }
    fetchUserDetails()
  },[dispatch, id])

  useEffect(() => {
    if (singleUser) {
      setUsername(singleUser.username)
      setPhoneNo(singleUser.phone_no)
      setRole(singleUser.role)
    }
  },[singleUser])

  if (status === "loading") {
    return <Loading/>
  }

  return (
    <main id='main' className='main'>
        <div className="pagetitle">
            <h1><i className='bi bi-chevron-right'></i>Edit User</h1>
        </div>
        <section className='dashboard section'>
          <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="card shadow-sm">
                  <div className="card-body px-4">
                    <div className="row mb-4">
                      <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                        Username:
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled = { (singleUser?.role === "superadmin") || (((userDetails?.role === "admin") &&  (singleUser?.role === "admin"))) }
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                        Email:
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={singleUser?.email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                        User ID:
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="userid"
                          value={singleUser?.user_id}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                        Phone Number:
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="phone_no"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          disabled = { (singleUser?.role === "superadmin") || (((userDetails?.role === "admin") &&  (singleUser?.role === "admin"))) }
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                        Role:
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          disabled = { (singleUser?.role === "superadmin") || (((userDetails?.role === "admin") &&  (singleUser?.role === "admin"))) }
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="button" className="btn btn-success btn-lg" onClick={handleSaveClick}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
    </main>
  )
}

export default EditUser