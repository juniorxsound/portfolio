import React, { Component } from 'react'
import Link from "gatsby-link";

import './style.scss'

class Button extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
  }
  showAlert(e){
    console.log(e);
  }
  render() {
    const concatanatedClassName = `col-xs-${this.props.mobileWidth} col-sm-${this.props.smallWidth} col-md-${this.props.mediumWidth}`
    return (
      <div className={concatanatedClassName}>

        {/* External button - i.e goes to new tab */}
        {(() => { if(this.props.externalLink)return <div>
        <a href={this.props.externalLink} style={{ textDecoration: 'none' }} target="_blank">
          <div className="btn">
              {this.props.text}
          </div>
        </a>
        </div>})()}

        {/* Internal button - i.e goes to React-Router */}
        {(() => { if(this.props.link)return <div>
        <Link to={this.props.link} style={{ textDecoration: 'none' }}>
          <div className="btn">
              {this.props.text}
          </div>
        </Link>
        </div>})()}
          
        {/* Scroll button */}
        {(() => { if(!this.props.link && !this.props.externalLink)return <div onClick={this.showAlert} className="btn">
          {this.props.text}
        </div>})()}

      </div>
    )
  }
}

export default Button
