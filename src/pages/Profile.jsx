import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const Profile = () => {
        const { user } = useSelector(state => state.user)
        const location = useLocation()
    
  return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>
                    <i className="bi bi-chevron-right"></i> User Profile</h1>
            </div>
            <section className='section dashboard'>
                <div className="container mt-5">
                    <ul className="nav nav-pills mb-3">
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${location.pathname === "/profile" ? 'active' : ''}`}
                                to={'/profile'}
                            >
                                Profile
                            </NavLink>
                        </li>
                        {
                            ["superadmin", "admin"].includes(user?.role) ? (
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink
                                            to={'/profile/users'}
                                            className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                        >
                                            Users
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                            to={'/profile/projects'}
                                        >
                                            Projects
                                        </NavLink>
                                    </li>
                                </Fragment>
                            ) : null
                        }
                        {
                            ["superadmin"].includes(user?.role) ? (
                                <li className="nav-item">
                                    <button
                                        className={({isActive}) => `nav-link ${isActive ?'active' : ''}`}
                                        to={'/profile/tenants'}
                                    >
                                        Tenants
                                    </button>
                                </li>
                            ) : null
                        }
                    </ul>
                    <div>
                        <Outlet/>
                    </div>
                </div>
            </section>
        </main>
  )
}

export default Profile