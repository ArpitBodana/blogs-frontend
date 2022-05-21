import React from 'react'

function Restricted() {
  return (
    <div className='container text-center mt-24 relative font-time animate-bounce text-xl md:text-2xl'>
        <h4> Only Admin Allowed</h4>
        <p>This section is Restricted. </p>
    </div>
  )
}

export default Restricted