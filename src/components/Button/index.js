import React, { useState } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background: none;
  border: 1px solid #404040;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  margin-right: 10px;

  .link {
    color: #404040;
    text-decoration: none;
  }

  &:hover {
    color: #000;
    border: 1px solid #000;
    box-shadow: 0px 5px 18px 0px rgba(0, 0, 0, 0.1);
  }
`

const Button = ({
  showAlert,
  link,
  externalLink,
  text,
  mobileWidth,
  smallWidth,
  mediumWidth,
}) => {
  return (
    <ButtonWrapper>
      {externalLink ? (
        <a className="link" href={externalLink}>
          {text}
        </a>
      ) : (
        <Link className="link" to={link}>
          {text}
        </Link>
      )}
    </ButtonWrapper>
  )
}

export default Button
