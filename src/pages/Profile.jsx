import React, { Fragment, useState } from 'react'
import SideBar from '../components/Layouts/SideBar'
import ProfileSection from '../components/Layouts/Profile/ProfileSection'
import UsersSection from '../components/Layouts/Profile/UsersSection'
import ProjectsSection from '../components/Layouts/Profile/ProjectsSection'
import TenantSection from '../components/Layouts/Profile/TenantSection'

const Profile = () => {
        const [activeSec, setActiveSec] = useState('profile')

        const renderSection = () => {
            switch (activeSec) {
                case 'profile' :qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
                    return <ProfileSection/>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
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
                    className={`nav-link ${activeSection === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveSection('profile')}
                >
                    Profile
                </button>
                </li>
                <li className="nav-item">
                <button
                    className={`nav-link ${activeSection === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveSection('users')}
                >
                    Users
                </button>
                </li>
                <li className="nav-item">
                <button
                    className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveSection('projects')}
                >
                    Projects
                </button>
                </li>
                <li className="nav-item">
                <button
                    className={`nav-link ${activeSection === 'tenants' ? 'active' : ''}`}
                    onClick={() => setActiveSection('tenants')}
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