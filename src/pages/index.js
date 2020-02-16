import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import { BlogPost } from '../components/blog-post'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogPost key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <div>
        {Posts}
        <div className='pa3'><Link to='/blog/archive'>View more posts</Link></div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const blogIndexQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 5) {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
