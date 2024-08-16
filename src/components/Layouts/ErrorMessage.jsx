import React from 'react'

const ErrorMessage = ({ error_msg, is_main }) => {

  const handleTryClick = () => {
    window.location.reload()
  }

  return (
    <div className={`d-flex justify-content-center align-items-center ${is_main ? 'vh-100' : 'vh-50'}`}>
      <div className="card shadow-sm" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <div className="display-1 text-danger">
            <i className="bi bi-x-circle"></i>
          </div>
          <h5 className="card-title mt-3">ERROR</h5>
          <p className="card-text">{error_msg}!</p>
          <button className="btn btn-danger" onClick={handleTryClick}>Try Again</button>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage