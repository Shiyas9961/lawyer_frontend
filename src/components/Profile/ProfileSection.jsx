import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileSection = () => {

  const { user : userDetails } = useSelector(state => state.user)

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>My Profile</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body px-4">
              <div className="row mb-4">
                <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                  Username:
                </div>
                <div className="col-12 col-md-9">
                  <p className="h5">{userDetails?.username}</p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                  Email:
                </div>
                <div className="col-12 col-md-9">
                  <p className="h5">{userDetails?.email}</p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                  User ID:
                </div>
                <div className="col-12 col-md-9">
                  <p className="h5">{userDetails?.user_id}</p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                  Tenant ID:
                </div>
                <div className="col-12 col-md-9">
                  <p className="h5">{userDetails?.tenant}</p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 col-md-3 text-muted text-right font-weight-bold">
                  Role:
                </div>
                <div className="col-12 col-md-9">
                  <p className="h5">{userDetails?.role}</p>
                </div>
              </div>

              <div className="text-center">
                <Link to={`/profile/my-self/${userDetails?.user_id}`} className="btn btn-primary btn-lg" >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection