import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const EditProfile = () => {

    const { user } = useSelector(state => state.auth)
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone_number)

    const handleSaveClick = () => {
        console.log(user)
    }

    useEffect(() => {
        setName(user.name)
    },[user])

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