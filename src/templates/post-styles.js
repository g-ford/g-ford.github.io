import styled from 'styled-components';

import media from '../utils/media';

export const Tags = styled.ul`
  list-style: none;
  margin: 0 -5px;
  padding: 0;

  li {
    display: inline-block;
    margin: 0.625rem 0.3125rem;

    a {
      background: #ebebeb;
      text-decoration: none;
      border: 0;
      border-radius: 0.1875rem;
      color: #555;
      line-height: 1.625;
      padding: 0.5rem 1rem;
    }
  }
`;

export const Container = styled.article`
  margin-top: 8rem;

  ${media.phone`
    margin-top: 4rem;
  `}

  p {
    line-height: 1.5;
  }

  blockquote {
    margin-left: 0.25rem;
    font-size: 1.6rem;
    color: inherit;
    font-style: italic;
    border-left: 0.2rem solid rgb(0, 0, 0);
    padding-left: 1rem;
    margin: 1rem 0;
  }

  pre {
    margin-bottom: 2rem;
  }

  h3 {
    line-height: 1.13;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2rem 0 2rem;
  }

  hr {
    border: 0;
    border-top: 0.1rem solid #ccc;
    display: block;
    height: 1rem;
    padding: 0;
  }

  .gatsby-highlight pre {
    display: block;
    position: relative;
    padding: 20px 0 0;
    background: #193549;
    color: #dcdcdc;
    border-radius: 5px;
    overflow-y: hidden;
  }
  .gatsby-highlight pre:before {
    display: inline-block;
    position: absolute;
    top: 15px;
    left: 20px;
    width: 10px;
    height: 10px;
    background-color: #ff5f56;
    border-radius: 50%;
    content: '';
  }
  .gatsby-highlight pre:after {
    display: inline-block;
    position: absolute;
    top: 15px;
    left: 40px;
    width: 10px;
    height: 10px;
    background-color: #ffbd2e;
    border-radius: 50%;
    content: '';
  }
  .gatsby-highlight pre code:before {
    display: inline-block;
    position: absolute;
    top: 15px;
    left: 60px;
    width: 10px;
    height: 10px;
    background-color: #27c93f;
    border-radius: 50%;
    content: '';
  }
  .gatsby-highlight pre code {
    background: none;
    border: none;
    border-radius: 3px;
    display: inline-block;
    overflow: inherit;
    padding: 1.58333rem;
    white-space: inherit;
    word-wrap: normal;
    font-family: Inconsolata, monospace;
  }
  .gatsby-highlight code {
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    white-space: pre;
    white-space: pre-wrap;
    white-space: pre-line;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -hp-pre-wrap;
    word-wrap: break-word;
    background: transparent;
    color: #3b9cff;
    display: inline;
    font-family: D2Coding, 'D2 coding', monospace, serif;
    max-width: 100%;
    overflow: auto;
    padding: 0 0.1625rem;
  }
  .gatsby-highlight pre code {
    color: #dcdcdc;
  }
`;

export const Header = styled.header`
  ${media.tablet`
    text-align: center;
  `};
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
`;

export const LinkList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0px;
`;
