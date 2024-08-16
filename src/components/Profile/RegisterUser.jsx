import React, { useEffect, useState } from 'react';
import { registerUserFail, registerUserStart, registerUserSuccess } from '../../redux/slices/userRegisterslice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../pages/Loading';

const RegisterUser = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone_no, setPhoneNo] = useState('')
  const [role, setRole] = useState('user')
  const [country, setCountry] = useState('IN')
  const [phoneCode, setPhoneCode] = useState('+91')
  const [pwdError, setPwdError] = useState('')
  const [formErr, setFormErr] = useState('')
  const dispatch = useDispatch()

  const { token } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user)
  const { error, status } = useSelector(state => state.registerUser)

  useEffect(() => {
    if (status === 'success') {
      // Close the modal manually by interacting with the DOM
      const modalElement = document.querySelector('.modal');
      if (modalElement) {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        if (modalBackdrop) {
          modalBackdrop.remove(); // Remove the modal backdrop
        }
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = ''; // Remove body padding added by Bootstrap modal
      }
    }
  }, [status]);

  const countries = [
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
    // Add more countries as needed
  ];

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if(!passwordRegex.test(e.target.value)) {
      setPwdError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character")
    }
    if(passwordRegex.test(e.target.value)){
      setPwdError(null)
    }
  }

  const handleCountryChange = (e) => {
    console.log(e.target.value)
    const selectedCountry = countries.find(country => country.code === e.target.value);
    setCountry(selectedCountry.code)
    setPhoneCode(selectedCountry.dialCode)
  };

  const registerUserApi = async (data_some) => {
    try{
      dispatch(registerUserStart())
      await axios.post('http://localhost:8000/users/user/', data_some, {
        headers : {
          Authorization : `Bearer ${token.idToken}`
        }
      })
      dispatch(registerUserSuccess("User created succefully"))
    }catch(e){
      dispatch(registerUserFail(e.toString()))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      username,
      email,
      password,
      role,
      phone_no : `${phoneCode}${phone_no}`
    }
    if(pwdError){
      setFormErr(pwdError)
      return
    }
    console.log(data)
    registerUserApi(data)
  };

  if (status === "loading"){
    return (
      <Loading compon={"not-main"} />
    )
  }

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>

      {formErr ? <div className='alert alert-danger'>{formErr}</div> : null}
      {error ? <div className='alert alert-danger'>{error}</div> : null}
      <form onSubmit={handleSubmit}>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${pwdError ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <div className="input-group">
            <select
              className="form-select"
              value={country}
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.dialCode})
                </option>
              ))}
            </select>
            <span className="input-group-text">{phoneCode}</span>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phone_no}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Role */}
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            { user?.role === "admin" ? <option value="admin">Admin</option> : null}
            <option value="user">User</option>
            { user?.role === "superadmin" ? <option value="superadmin">Super Admin</option> : null }
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" >Register</button>
      </form>
    </div>
  );
};

export default RegisterUser
