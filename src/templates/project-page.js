import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import BackArrow from '../components/BackArrow'
import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCubes, faCodeBranch, faWrench } from '@fortawesome/free-solid-svg-icons'

import '../pages/style.scss'

const Template = ({data, location, pathContext}) => {
  const {markdownRemark: post} = data;
  const {frontmatter, html} = post;
  const {title, date} = frontmatter;
  const {next, prev} = pathContext;

  let tags = '';
  for (let tag in frontmatter.tags){
    if(tag != frontmatter.tags.length - 1){
      tags += frontmatter.tags[tag] + ' / ';
    } else {
      tags += frontmatter.tags[tag];
    }
  }

  return (
    <div className="index">
      <div className="main">
        <Helmet title={`Or Fleisher | ${title}`} />
        <BackArrow />
        <h3 className="bold">
          {title}
        </h3>
        <p style={{marginTop: '-14px'}} className="bold gray_text">{tags}</p>
        <img alt={post.frontmatter.title} className="img_banner" src={require("../assets/images/headers/" + post.frontmatter.cover)}></img>
        <div>
          <div dangerouslySetInnerHTML={{__html: post.frontmatter.embed}} />
          <div dangerouslySetInnerHTML={{__html: html}} />
          <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <br /><h4 className="bold">About</h4>
                <p>{post.frontmatter.about}</p>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
              <br /><h4 className="bold">Components</h4>
                <ul>
                  {post.frontmatter.components.map(node=>{
                      switch (node[0]) {
                        case 'code':
                          return <p key={node.toString()} className="bold"><FontAwesomeIcon icon={faCode} /><span className="component">{' '}{node[1]}</span></p>
                          break;
                        case 'software':
                          return <p key={node.toString()} className="bold"><FontAwesomeIcon icon={faCodeBranch} /><span className="component">{' '}{node[1]}</span></p>
                          break;
                        case '3d':
                          return <p key={node.toString()} className="bold"><FontAwesomeIcon icon={faCubes} /><span className="component">{' '}{node[1]}</span></p>
                          break;
                        default:
                          console.warn('[Website] Icon type not specified in the template, returning default icon');
                          return <p key={node.toString()} className="bold"><FontAwesomeIcon icon={faWrench} /><span className="component">{' '}{node[1]}</span></p>
                          break;
                      } 
                  })}
                
                </ul>
              </div>

              {/* Links */}
              <div className="col-xs-12 col-sm-4 col-md-4">
              <br /><h4 className="bold">Links</h4>
                <div className="row">
                  {post.frontmatter.links.map(node=>{
                    return <Button key={node.toString()} text={node[0]} link={node[1]} mobileWidth={'12'} smallWidth={'6'} mediumWidth={'6'}/>
                  })}
                </div>
              </div>

              {/* Press */}
              <div className="col-xs-12 col-sm-8 col-md-8">
              {(() => { if(post.frontmatter.press && post.frontmatter.press.length > 0)return <div>
              <br /><h4 className="bold row">Recognition</h4>
                  <span>{' • '}</span>
                  {post.frontmatter.press.map(node=>{
                    return <span key={node.toString()}><a target="_blank" href={node[1]}>{node[0]}</a>{' • '}</span>
                  })}
                </div>
              })()}
              </div>

              {/* Credits */}
              <div className="col-xs-12 col-sm-4 col-md-4">
              {(() => { if(post.frontmatter.credits && post.frontmatter.credits.length > 0)return <div>
                <br /><h4 className="bold">Credits</h4>
                <p dangerouslySetInnerHTML={{__html: post.frontmatter.credits}} />
                </div>
              })()}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        about
        cover
        credits
        components
        press
        links
        embed
        tags
        excerpt
      }
    }
  }
`;

export default Template;