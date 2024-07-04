import React from 'react'

const UsersSection = () => {
  return (
    <div>
        <div className="container mt-5">
                <h2 className="mb-4">User Information Table</h2>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            <th scope="col">Tenant</th>
                            <th scope="col">Phone no</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>john_doe</td>
                            <td>Admin</td>
                            <td>Company A</td>
                            <td>123-456-7890</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr>
                            <td>jane_smith</td>
                            <td>User</td>
                            <td>Company B</td>
                            <td>987-654-3210</td>
                            <td>jane@example.com</td>
                        </tr>
                        {/* <!-- Add more rows as needed --> */}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default UsersSection