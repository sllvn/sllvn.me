import React from 'react'
import Link from 'gatsby-link'
// import BlogPost from '../components/blog-post'
// import PostLink from '../components/post-link'

const BlogPost = ({ data }) => {
  const { id, html, frontmatter } = data

  return (
    <div className='bg-white mb5'>
      <div className='dib bg-near-white gray b ph3 pv1'>{frontmatter.date}</div>
      <div className='pa3 lh-copy'>
        <h3 className='mt1'>{frontmatter.title}</h3>
        <div
          className='blog-post-content'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogPost key={edge.node.id} data={edge.node} />)

  return (
    <div>
      {Posts}
      <div className='pa3'><Link to='/blog/archive'>Archive</Link></div>
    </div>
  )
}

export default IndexPage

export const blogIndexQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 2) {
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
