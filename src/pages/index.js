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

        <div className="row">
          <Button text='Biography'link='/bio' mobileWidth={'6'} smallWidth={'4'} mediumWidth={'3'} />
          <Button text='Contact' link='' mobileWidth={'6'} smallWidth={'4'} mediumWidth={'3'} />
        </div>
        
        {/* Projects */}
        <Section title="Projects">
        <div className="row">
          {posts.map(({ node: post }) => {

              const { frontmatter } = post

              //Bio page doesn't get a grid cube
              if(post.frontmatter.title == 'Bio') return;

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
                alt_text={post.frontmatter.path}
                logo={require("../assets/images/gifs" + frontmatter.path + ".gif")}
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

          <Section title="Experience">
          <div className="row">
          <GridUnit
                alt_text="Phenomena Labs"
                logo={require("../assets/images/gifs/volume.gif")}
                colour="#BDBDBD"
                title="Phenomena Labs"
                subtag="2011 - 2016"
                subtitle="Co-Founder"
          />
          <GridUnit
                alt_text="Viacom"
                logo={require("../assets/images/gifs/volume.gif")}
                colour="#BDBDBD"
                title="Viacom"
                subtag="2017 - 2018"
                subtitle="VR Research Fellow"
          />
          <GridUnit
                alt_text="Vimeo"
                logo={require("../assets/images/gifs/volume.gif")}
                colour="#BDBDBD"
                title="Vimeo"
                subtag="2018 - current"
                subtitle="Principle Creative Technologist"
          />          
          </div>
          </Section>
      </div>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query pageAndImageQuery {
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
`;