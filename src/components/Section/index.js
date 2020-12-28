import React from 'react'
import styled from 'styled-components'

const SectionWrapper = styled.section`
  padding-top: 20px;
  padding-bottom: 20px;

  h2 {
    margin-top: 15px;
  }
`

const Section = React.forwardRef(({ title, children }, ref) => (
  <SectionWrapper ref={ref}>
    <h2>{title}</h2>
    {children}
  </SectionWrapper>
))

export default Section
