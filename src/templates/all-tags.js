import React, { Component } from 'react';
import Link from 'gatsby-link';

export default class AllTags extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {

    const { tags } = this.props.pathContext;

    if (tags) {
      return (
        <div>
          <ul>
            {tags.map(tag => {
              return (
                <li>
                  <Link to={`tags/${tag}`}>
                    {tag}
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