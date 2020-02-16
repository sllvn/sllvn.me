import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'prism-themes/themes/prism-ghcolors.css'

import Header from '../components/header'
import './layout.css'

import 'tachyons/css/tachyons.css'

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children, data }) => (
  <StaticQuery
    query={query}
    render={data => (
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
          {children}
          <div className='mt5 pa3'>
            Licensed under <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          </div>
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
