import React, { Fragment, useState } from 'react'
import SideBar from '../components/Layouts/SideBar'
import ProfileSection from '../components/Profile/ProfileSection'
import UsersSection from '../components/Profile/UsersSection'
import ProjectsSection from '../components/Profile/ProjectsSection'
import TenantSection from '../components/Profile/TenantSection'

const Profile = () => {
        const [activeSec, setActiveSec] = useState('profile')

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
    <Fragment>
        <SideBar/>
        <main id="main" className="main">
            <div className="pagetitle">
                <h1><i className="bi bi-chevron-right"></i> User Profile</h1>
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
                <li className="nav-item">
                <button
                    className={`nav-link ${activeSec === 'tenants' ? 'active' : ''}`}
                    onClick={() => setActiveSec('tenants')}
                >
                    Tenants
                </button>
                </li>
            </ul>
            <div>
                {renderSection()}
            </div>
            </div>
            </section>
        </main>
    </Fragment>
  )
}

export default Profile