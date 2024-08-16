import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { useSelector } from 'react-redux'
import Loading from '../../pages/Loading'
import SideBar from '../Layouts/SideBar'
import ErrorMessage from './ErrorMessage'

const Layout = ({handleToggleClick}) => {
  const { user } = useSelector(state => state.auth)
  const { status, error } = useSelector(state => state.user)
  const [ showError, setShowError ] = useState(false)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 500); // Delay of 2 seconds before showing the error

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [error]);

  if (showError && error){
    return (
      <ErrorMessage error_msg={error} is_main={true} />
    )
  }

  if (!user || status === "loading") {
    return (
      <Loading compon={"main"}/>
    )
  }
  return (
    <Fragment>
      {/* Header */}
      <Header handleToggleClick={handleToggleClick}/>
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