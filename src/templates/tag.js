import React from 'react';

// Components
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Post from '../components/post';
import { Title } from './post-styles';

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.tag;

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout>
      <SEO title={tagHeader} keywords={[`gatsby`, `blog`, `react`]} />
      <main>
        <Title>{tagHeader}</Title>
        {edges.map(({ node }) => {
          return <Post key={node.id} node={node} />;
        })}
      </main>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    tag: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
