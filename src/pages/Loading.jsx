import React from 'react'

const Loading = ({ popup }) => {
  return (
    <div className={'d-flex justify-content-center align-items-center center-page loading'}>
        <div className='spinner-border'>
            <span className='sr-only'></span>
        </div>
    </div>
  )
}

export default Loading