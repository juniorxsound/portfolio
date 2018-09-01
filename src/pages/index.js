import React from 'react'
import GridUnit from '../components/GridUnit'
import Section from '../components/Section'
import Button from '../components/Button'
import ScrollableAnchor from 'react-scrollable-anchor'

import './style.scss'
import '../components/Button/style.scss'

const IndexPage = props => {

  const { edges: posts } = props.data.allMarkdownRemark
  
  return(
    <div className="index">
      <div className="main">

        {/* Header */}
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-9">
            <h5>
              Hi, I'm <span className="bold">Or Fleisher</span>
            </h5>

            <h3 className="bold">
              Director, developer and artist working at the intersection of technology and storytelling. Combining computer graphics, machine learning and immersive experience development in virtual, augmented and mixed realities.
            </h3>
          </div>
        </div>

        <div className="row">
          <Button text='Biography' link='/bio' mobileWidth={'6'} smallWidth={'4'} mediumWidth={'3'} />
          <a href="#contact" style={{ textDecoration: 'none' }} className='col-xs-6 col-sm-4 col-md-3'>
          <div className="btn">
              Contact
          </div>
        </a>
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
          <ScrollableAnchor id={'contact'}>
          <Section title="Contact">
          
          </Section>
          </ScrollableAnchor>
      </div>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
query pageAndImageQuery {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
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