import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import media from '../utils/media';

const Title = styled.h3`
  font-weight: 800;
  font-size: 2.6rem;
  margin: 6rem 0 0;

  ${media.phone`
    margin: 3rem 0 0;
  `}
`;

class TagIndex extends Component {
  render() {
    const { data } = this.props;
    const tags = data.tags.group;
    console.log(tags);
    return (
      <Layout>
        <SEO title="All Tags" keywords={[`tags`, `blog`, `react`]} />
        <main>
          <Title>All Tags</Title>
          <ul>
            {tags.map(({ fieldValue, totalCount }) => (
              <li key={fieldValue}>
                <Link to={`/tags/${fieldValue}/`}>
                  {fieldValue} ({totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </Layout>
    );
  }
}

export default TagIndex;

export const pageQuery = graphql`
  query {
    tags: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
