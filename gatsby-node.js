const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require ('path');

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators;
  const projectPage = path.resolve (`src/templates/project-page.js`);

  return graphql (`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      ){   
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
            links
            credits
            press
            components
            cover
            about
            embed
            excerpt
            tags
          }
        }
      }
    }
  }`).then (result => {
    if (result.errors) {
      return Promise.reject (result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach (({node}, index) => {
      createPage ({
        path: node.frontmatter.path,
        component: projectPage
      });
    });
  });
};
