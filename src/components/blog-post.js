import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import Layout from '../components/layout'

export const BlogPost = ({ post }) => {
  const { id, html, frontmatter } = post

  return (
    <div className='bg-white mb5'>
      <div className='dib bg-near-white gray b ph3 pv1'>{frontmatter.date}</div>
      <div className='pa3 lh-copy'>
        <h3 className='mt1'>
          <Link className='no-underline underline-hover' style={{ color: 'black' }} to={frontmatter.path}>{frontmatter.title}</Link>
        </h3>
        <div
          className='blog-post-content'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

const ConnectedBlogPost = ({ data }) => {
  const { markdownRemark: post, site } = data

  return (
    <Layout>
      <Helmet titre={`${post.frontmatter.title} | ${site.siteMetadata.title}`} />
      <BlogPost post={post} />
    </Layout>
  )
}


export default ConnectedBlogPost

export const blogQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
