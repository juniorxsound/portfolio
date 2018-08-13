import React, { Component } from 'react'
import Link from "gatsby-link";

import Arrow from '../../assets/images/ui/left-arrow.svg'

class BackArrow extends Component {
  render() {
    return (
        <div>
            <Link to='/'>
                <img style={{position: 'fixed', left: '35px', top: '63px', width: '20px'}} src={Arrow} />
            </Link>
        </div>
    )
  }
}

export default BackArrow
