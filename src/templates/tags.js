import React, { Component } from 'react';
import Link from 'gatsby-link';

export default class Tags extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {posts, tagName} = this.props.pathContext;

    if (posts) {
      return (
        <div>
          <span>
            Posts about {tagName};
          </span>

          <ul>
            {posts.map (post => {
              return (
                <li>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )
    }
  }

}