import React from "react";
// import PostLink from "../components/post-link";
import Link from "gatsby-link";
import Layout from '../../components/layout'

const PostLink = ({ post }) => (
  <div className='mb3 pa3 lh-copy bg-white'>
    <div>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title}
      </Link>
    </div>
    {post.frontmatter.date}
  </div>
);

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <div className='mb5'>{Posts}</div>
    </Layout>
  )
};

export default IndexPage;

export const pageQuery = graphql`
  query BlogArchiveQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
