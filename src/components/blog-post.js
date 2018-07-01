import React from "react"
import Helmet from "react-helmet"

const BlogPost = ({ data }) => {
  const { markdownRemark: post, site } = data

  return (
    <div className='bg-white mb5'>
      <Helmet title={`${post.frontmatter.title} | ${site.siteMetadata.title}`} />
      <div className='dib bg-near-white gray b ph3 pv1'>{post.frontmatter.date}</div>
      <div className='pa3 lh-copy'>
        <h3 className='mt1'>{post.frontmatter.title}</h3>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}

export default BlogPost

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
