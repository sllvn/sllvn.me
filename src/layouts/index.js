import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

import 'tachyons/css/tachyons.css'

const Layout = ({ children, data }) => (
  <div className=''>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'A blog on technology and software from Andrew Sullivan.' },
        { name: 'keywords', content: 'andrew sullivan, seattle, software' },
      ]}
      bodyAttributes={{
        class: 'bg-near-white sans-serif'
      }}
    />
    <div
      className='measure-xwide center pa3'
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
