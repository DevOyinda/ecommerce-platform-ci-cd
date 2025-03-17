import React from 'react'
import {Link} from 'react-router-dom'

function NoPage() {
  return (

    <div>
    <h2 style={{color:"yellow", textAlign:"center"}}>Page Not Found</h2>

    <Link  to='/'>Go Back TO hOME page</Link>

    </div>
  )
}

export default NoPage
