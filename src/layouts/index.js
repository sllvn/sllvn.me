import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'prismjs/themes/prism.css'

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
        class: 'bg-near-white'
      }}
    />
    <div
      className='measure-xwide center pa3'
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      {children()}
      <div className='mt5 pa3'>
        All content, unless otherwise noted, is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
      </div>
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
