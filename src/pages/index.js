import React from 'react'
import GridUnit from '../components/GridUnit'
import Section from '../components/Section'
import Button from '../components/Button'

import './style.scss'

const IndexPage = props => {

  const { edges: posts } = props.data.allMarkdownRemark
  
  return(
    <div className="index">
      <div className="main">

        {/* Header */}
        <h5>
          Hi, I'm <span className="bold">Or Fleisher</span>
        </h5>

        <h3 className="bold">
          Director, developer and artist working at the intersection of technology and storytelling. Combining computer graphics, machine learning and immersive experience development in virtual, augmented and mixed realities.
        </h3>

        <Button text='Resume' link='https://volume.gl' mobileWidth={'6'} smallWidth={'4'} mediumWidth={'3'} />

        {/* Projects */}
        <Section title="Projects">
        <div className="row">
          {posts.map(({ node: post }) => {
              const { frontmatter } = post
              let tags = ''
              for (let tag in frontmatter.tags){
                if(tag != frontmatter.tags.length - 1){
                  tags += frontmatter.tags[tag] + ' / '
                } else {
                  tags += frontmatter.tags[tag]
                }
              }
              return (
                <GridUnit key={post.frontmatter.path}
                logo={frontmatter.thumbnail}
                colour="#BDBDBD"
                title={frontmatter.title}
                link={frontmatter.path}
                subtag={tags}
                subtitle={frontmatter.excerpt}
              />
              )
            })}
          </div>
          </Section>
      </div>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query pageQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            thumbnail
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`