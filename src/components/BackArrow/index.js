import React from 'react'
import Link from 'gatsby-link'
import Arrow from '../../assets/images/ui/left-arrow.svg'
import styled from 'styled-components'

const BackArrowWrapper = styled.div`
  width: 20px;

  img {
    width: 20px;
    position: relative;
    margin-top: 15px;
  }
`

const BackArrow = ({ route, alt }) => (
  <BackArrowWrapper>
    <Link to={route}>
      <img alt={alt} src={Arrow} />
    </Link>
  </BackArrowWrapper>
)

export default BackArrow
