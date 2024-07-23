import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  
  const { user } = useSelector(state => state.auth)

  return (
        <main id='main' className='main'>
          <div className="pagetitle">
          <h1><i className="bi bi-chevron-right"></i> Dashboard</h1>
          <section className='section dashboard'>
            <div className='container mt-5'>
              <h2>Hello, {user.name}</h2>
              <h3>This is Dashboard Page</h3>
            </div>
          </section>
          </div>
        </main>
    )

}

export default Home