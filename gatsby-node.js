const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require ('path');

exports.modifyWebpackConfig = function ({ config, stage }) {
  config.merge({
    postcss(wp) {
      return [
        require('postcss-cssnext')({ browsers: ['last 2 versions', '> 2%', 'ie 9'] }),
      ]
    },
  })

  if (stage === 'build-css') {
    config.removeLoader('sass');
    config.loader('sass', {
      test: /\.(sass|scss)/,
      exclude: /\.module\.(sass|scss)$/,
      loader: extractTextWebpackPlugin.extract(['css?minimize', 'postcss', 'sass']),
    })
  }

  if (stage === 'develop') {
    config.removeLoader('sass');
    config.loader('sass', {
      test: /\.(sass|scss)/,
      exclude: /\.module\.(sass|scss)$/,
      loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
    })
  }

  return config
};

const createTagPages = (createPage, tags) => {
  const tagPageTemplate = path.resolve (`src/templates/tags.js`);
  const allTagsTemplate = path.resolve (`src/templates/all-tags.js`);

  createPage ({
    path: `/tags`,
    component: allTagsTemplate,
    context: {
      tags: tags.sort (),
    },
  });
  tags.forEach (tagName => {
    const posts = tags[tagName];

    createPage ({
      path: `/tags/${tagName}`,
      component: tagPageTemplate,
      context: {
        posts,
        tagName,
      },
    });
  });
};

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators;
  const projectPage = path.resolve (`src/templates/project-page.js`);

  return graphql (
    `{
    allMarkdownRemark {
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
  }`
  ).then (result => {
    if (result.errors) {
      return Promise.reject (result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    const postsByTags = {};

    posts.forEach (({node}) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.forEach (tag => {
          if (!postsByTags[tag]) {
            postsByTags[tag] = [];
          }
          postsByTags[tag].push (node);
        });
      }
    });
    const tags = Object.keys (postsByTags);

    createTagPages (createPage, tags);

    posts.forEach (({node}, index) => {
      createPage ({
        path: node.frontmatter.path,
        component: projectPage,
        context: {
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === posts.length - 1 ? null : posts[index + 1].node
        },
      });
    });
  });
};
