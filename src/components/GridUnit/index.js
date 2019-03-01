import React, { Component } from 'react'
import Link from 'gatsby-link'
import './style.scss'

export default class GridUnit extends Component {
  render() {
    return (
      <div className="experience-unit col-xs-12 col-sm-6 col-md-4">
        <Link to={this.props.link}>
          <img alt={this.props.alt_text} src={this.props.logo} />
        </Link>
        <div className="title bold">
          <Link
            to={this.props.link}
            style={{ textDecoration: 'none', color: '#000' }}
          >
            {this.props.title}
          </Link>
        </div>
        <div className="time-period">{this.props.subtag}</div>
        <div className="subtitle">{this.props.subtitle}</div>
      </div>
    )
  }
}
