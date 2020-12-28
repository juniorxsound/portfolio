import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const LinkWrapper = styled(Link)`
  padding-bottom: 15px;
  img {
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.6s ease;
    -webkit-transition: all 0.6s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 5px 18px 0px rgba(0, 0, 0, 0.3);
    }
  }
`

const GridUnitWrapper = styled.div`
  padding-right: 20px;  
  .title {
    padding: 8px 0px;
    font-size: 1.8rem;
  }

  .tag {
    font-size: 1.0rem;
    line-height: 1.5rem;
    color: grey;
  }

  .subtitle {
    color: $grey-color;
    font-size: 1.4rem;
  }

  img {
    width: 100%;
  }

  @include media('<=medium', '>xsmall') {
    padding-bottom: 20px;
  }

  @include media('<=xsmall') {
    padding-bottom: 20px;
  }
`

const GridUnit = ({
  alt_text,
  link,
  title,
  subtag,
  subtitle,
  projectImage,
}) => {
  return (
    <GridUnitWrapper>
      <LinkWrapper to={link}>
        <img alt={alt_text} src={projectImage} />
        <h3 className="title">{title}</h3>
      </LinkWrapper>
      <p className="tag">{subtag}</p>
      <p className="subtitle">{subtitle}</p>
    </GridUnitWrapper>
  )
}

export default GridUnit
