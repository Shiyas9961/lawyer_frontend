import React from 'react'

const Loading = ({ compon }) => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${compon === "main" ? 'main_loader' : 'sub_loader'}`}>
        <div className='spinner-border'>
            <span className='sr-only'></span>
        </div>
    </div>
  )
}

export default Loading