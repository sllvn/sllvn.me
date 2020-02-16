import React from 'react'
import Link from 'gatsby-link'

import classNames from 'classnames'

const NavLink = ({ active, children, ...props }) => (
  props.href ? (
    <a className={classNames(['no-underline underline-hover b--light-blue bw2', active && 'bb'])} {...props}>{children}</a>
  ) : (
    <Link className={classNames(['no-underline underline-hover b--light-blue bw2', active && 'bb'])} style={{ color: '#666' }} {...props} />
  )
)

const Header = ({ siteTitle }) => (
  <div className='mb4 gray ph3'>
    <h1 className='ma0 f4'>
      <Link to="/" style={{ color: '#000' }} className='no-underline ttl'>{siteTitle}</Link>
      {' '}
      <small>personal blog</small>
    </h1>
    <ul className='list pa0 ml0'>
      <li className='dib mr3'><NavLink href='https://www.inkblot.io'>about</NavLink></li>
      <li className='dib mr3'><NavLink href='https://twitter.com/licyeus'>twitter</NavLink></li>
    </ul>
    {false && (
      <ul className='list pa0 ml0'>
        <li className='dib mr3'><NavLink active={true} to='/blog'>blog</NavLink></li>
        <li className='dib mr3'><NavLink to='/projects'>projects</NavLink></li>
        <li className='dib mr3'><NavLink to='/about'>about</NavLink></li>
      </ul>
    )}
  </div>
)

export default Header
