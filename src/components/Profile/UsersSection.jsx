import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const UsersSection = () => {
  return (
        <div className="container mt-4">
                <h2 className="mb-4">Users Information Table</h2>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Tenant</th>
                        <th scope="col">Phone no</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>john_doe</td>
                        <td>Admin</td>
                        <td>Company A</td>
                        <td>123-456-7890</td>
                        <td>john@example.com</td>
                        <td className='d-flex justify-content-center align-items-center'>
                            <button className="btn btn-warning btn-sm me-3">
                            <FaEdit />
                            </button>
                            <button className="btn btn-danger btn-sm">
                            <FaTrash />
                            </button>
                        </td>
                        </tr>
                        <tr>
                        <td>jane_smith</td>
                        <td>User</td>
                        <td>Company B</td>
                        <td>987-654-3210</td>
                        <td>jane@example.com</td>
                        <td className='d-flex justify-content-center align-items-center'>
                            <button className="btn btn-warning btn-sm me-3">
                                <FaEdit />
                            </button>
                            <button className="btn btn-danger btn-sm">
                                <FaTrash />
                            </button>
                        </td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                    </table>
            </div>
  )
}

export default UsersSection