import React from 'react'
import classNames from 'classnames'
import Link from 'gatsby-link'

const NavLink = ({ active, ...props }) => (
  <Link className={classNames(['no-underline underline-hover b--light-blue bw2', active && 'bb'])} style={{ color: '#666' }} {...props} />
)

const Header = ({ siteTitle }) => (
  <div className='mb4 gray ph3'>
    <h1 className='ma0 f4'>
      <Link to="/" style={{ color: '#000' }} className='no-underline ttl'>{siteTitle}</Link>
    </h1>
    <ul className='list pa0 ml0'>
      <li className='dib mr3'><NavLink active={true} to='/blog'>blog</NavLink></li>
      <li className='dib mr3'><NavLink to='/projects'>projects</NavLink></li>
      <li className='dib mr3'><NavLink to='/about'>about</NavLink></li>
    </ul>
  </div>
)

export default Header
