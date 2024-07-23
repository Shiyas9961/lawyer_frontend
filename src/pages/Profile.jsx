import React, { Fragment, useState } from 'react'
import ProfileSection from '../components/Profile/ProfileSection'
import UsersSection from '../components/Profile/UsersSection'
import ProjectsSection from '../components/Profile/ProjectsSection'
import TenantSection from '../components/Profile/TenantSection'
import { useSelector } from 'react-redux'

const Profile = () => {
        const [activeSec, setActiveSec] = useState('profile')
        const { user } = useSelector(state => state.auth)

        const renderSection = () => {
            switch (activeSec) {
                case 'profile' :
                    return <ProfileSection/>
                case 'users' :
                    return <UsersSection />
                case 'projects' :
                    return <ProjectsSection/>
                case 'tenants' :
                    return <TenantSection />
                default :
                    return <ProfileSection/>
            }
        }
    
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
                            <button
                                className={`nav-link ${activeSec === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveSec('profile')}
                            >
                                Profile
                            </button>
                        </li>
                        {
                            ["superadmin", "admin"].includes(user['custom:role']) ? (
                                <Fragment>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeSec === 'users' ? 'active' : ''}`}
                                            onClick={() => setActiveSec('users')}
                                        >
                                            Users
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeSec === 'projects' ? 'active' : ''}`}
                                            onClick={() => setActiveSec('projects')}
                                        >
                                            Projects
                                        </button>
                                    </li>
                                </Fragment>
                            ) : null
                        }
                        {
                            ["superadmin"].includes(user['custom:role']) ? (
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeSec === 'tenants' ? 'active' : ''}`}
                                        onClick={() => setActiveSec('tenants')}
                                    >
                                        Tenants
                                    </button>
                                </li>
                            ) : null
                        }
                    </ul>
                    <div>
                        {renderSection()}
                    </div>
                </div>
            </section>
        </main>
  )
}

export default Profile