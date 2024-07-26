import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { editUserFail, editUserSuccess, fetchUserFail, fetchUserStart, fetchUserSuccess } from '../redux/slices/userSlice'
import Loading from './Loading'

const EditProfile = () => {
    const { id } = useParams()
    const { user, token } = useSelector(state => state.auth)
    const { user : userDetails } = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()


    const handleSaveClick = async () => {
        const data = {
          username : name,
          phone_no : phone
        }
        try{
          const response = await axios.put(`http://localhost:8000/users/${id}/`, data, {
            headers : {
              Authorization : `Bearer ${token.idToken}`
            }
          })
          if (response.status === 200){
            dispatch(editUserSuccess(response.data.message))
          }
        }catch(err){
          dispatch(editUserFail(err.toString()))
        }
    }

    useEffect(() => {

      const fetchUserDetails = async () => {
        try{
          dispatch(fetchUserStart())
          const response = await axios.get(`http://localhost:8000/users/${id}/`, {
            headers : {
              Authorization : `Bearer ${token.idToken}`
            }
          })
          if (response.status === 200) {
            dispatch(fetchUserSuccess(response.data))
          }  
        }catch(error){
          dispatch(fetchUserFail(error.toString()))
        }
      }

      fetchUserDetails()
    },[dispatch, id])

    useEffect(() => {

      if(userDetails) {
        setName(userDetails.username)
        setPhone(userDetails.phone_no)
      }
    }, [userDetails])

    if (userDetails){
      if (userDetails.status === 'loading') {
        return (
          <Loading />
        )
    }
  }

  return (
    <main id='main' className='main'>
        <div className="pagetitle">
            <h1><i className='bi bi-chevron-right'></i>Profile Edit</h1>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={user.email}
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
                    value={user.sub}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={user['custom:role']}
                    disabled
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

export default EditProfile