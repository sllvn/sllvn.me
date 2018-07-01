import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div className='mb4 gray ph3'>
    <h1 className='ma0 f4'>
      <Link to="/" style={{ color: '#000' }} className='no-underline ttl'>{siteTitle}</Link>
    </h1>
    <ul className='list pa0 ml0'>
      <li className='dib mr3'><Link style={{ color: '#666' }} to='/blog'>blog</Link></li>
      <li className='dib mr3'><Link style={{ color: '#666' }} to='/projects'>projects</Link></li>
      <li className='dib mr3'><Link style={{ color: '#666' }} to='/about'>about</Link></li>
    </ul>
  </div>
)

export default Header
