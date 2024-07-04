import React, { Fragment } from 'react'
import SideBar from '../components/Layouts/SideBar'
import { useSelector } from 'react-redux'

const Home = () => {
  
  const { user } = useSelector(state => state.auth)

  return (
    <Fragment>
        {/* Side Bar Component */}
        <SideBar />
        <main id='main' className='main'>
          <div className="pagetitle">
          <h1><i className="bi bi-chevron-right"></i> Dashboard</h1>
          <section className='section dashboard'>
                <h2>Hello, {user.name}</h2>
                <h3>This is Dashboard Page</h3>
            </section>
          </div>
        </main>
    </Fragment>
    )

}

export default Home