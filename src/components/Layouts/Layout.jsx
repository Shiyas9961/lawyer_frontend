import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { useSelector } from 'react-redux'
import Loading from '../../pages/Loading'
import SideBar from '../Layouts/SideBar'

const Layout = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return (
      <Loading />
    )
  }
  return (
    <Fragment>
      {/* Header */}
      <Header />
      {/* Main components */}
      <Fragment>
        <SideBar/>
        <Outlet/>
      </Fragment>
      {/* Footer */}
      <Footer/>
    </Fragment>
  )
}

export default Layout