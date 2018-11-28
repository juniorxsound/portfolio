import React, { Component } from 'react'
import Link from 'gatsby-link';
import Arrow from '../../assets/images/ui/left-arrow.svg'

export default class BackArrow extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <img alt='Home button' style={{
                        top: '66px',
                        width: '20px'
                    }} src={Arrow} />
                </Link>
            </div>
        )
    }

}
