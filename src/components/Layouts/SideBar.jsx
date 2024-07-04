import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item">
                    <Link to='/' className="nav-link " >
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="/">
                    <i className="bi bi-layout-text-window-reverse"></i><span>Tables</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="tables-general.html">
                        <i className="bi bi-circle"></i><span>General Tables</span>
                        </a>
                    </li>
                    <li>
                        <a href="tables-data.html">
                        <i className="bi bi-circle"></i><span>Data Tables</span>
                        </a>
                    </li>
                    </ul>
                </li>

                <li className="nav-heading">Pages</li>

                <li className="nav-item">
                    <Link to='/profile' className="nav-link collapsed" >
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-faq.html">
                    <i className="bi bi-question-circle"></i>
                    <span>F.A.Q</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-contact.html">
                    <i className="bi bi-envelope"></i>
                    <span>Contact</span>
                    </a>
                </li>
            </ul>
        </aside>
  )
}

export default SideBar