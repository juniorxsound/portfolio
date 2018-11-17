import React, { Component } from 'react'
import GridUnit from '../components/GridUnit'
import Section from '../components/Section'
import Button from '../components/Button'
import ScrollableAnchor from 'react-scrollable-anchor'
import './style.scss'
import '../components/Button/style.scss'

export default class IndexPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark

    return (
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
                if (post.frontmatter.title == 'Bio') return;

                let tags = ''
                for (let tag in frontmatter.tags) {
                  if (tag != frontmatter.tags.length - 1) {
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
            <Section title="">
              <p>Email me at <span className="bold">contact@orfleisher.com</span></p>
              <div className="row">
                <a target="_blank" href="http://github.com/juniorxsound"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg=="></img></a>&nbsp;&nbsp;
              <a target="_blank" href="http://twitter.com/juniorxsound"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptNi4wNjYgOS42NDVjLjE4MyA0LjA0LTIuODMgOC41NDQtOC4xNjQgOC41NDQtMS42MjIgMC0zLjEzMS0uNDc2LTQuNDAyLTEuMjkxIDEuNTI0LjE4IDMuMDQ1LS4yNDQgNC4yNTItMS4xODktMS4yNTYtLjAyMy0yLjMxNy0uODU0LTIuNjg0LTEuOTk1LjQ1MS4wODYuODk1LjA2MSAxLjI5OC0uMDQ5LTEuMzgxLS4yNzgtMi4zMzUtMS41MjItMi4zMDQtMi44NTMuMzg4LjIxNS44My4zNDQgMS4zMDEuMzU5LTEuMjc5LS44NTUtMS42NDEtMi41NDQtLjg4OS0zLjgzNSAxLjQxNiAxLjczOCAzLjUzMyAyLjg4MSA1LjkyIDMuMDAxLS40MTktMS43OTYuOTQ0LTMuNTI3IDIuNzk5LTMuNTI3LjgyNSAwIDEuNTcyLjM0OSAyLjA5Ni45MDcuNjU0LS4xMjggMS4yNy0uMzY4IDEuODI0LS42OTctLjIxNS42NzEtLjY3IDEuMjMzLTEuMjYzIDEuNTg5LjU4MS0uMDcgMS4xMzUtLjIyNCAxLjY0OS0uNDUzLS4zODQuNTc4LS44NyAxLjA4NC0xLjQzMyAxLjQ4OXoiLz48L3N2Zz4="></img></a>&nbsp;&nbsp;
              <a target="_blank" href="http://facebook.com/or.fleisher"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMyA4aC0xLjM1Yy0uNTM4IDAtLjY1LjIyMS0uNjUuNzc4djEuMjIyaDJsLS4yMDkgMmgtMS43OTF2N2gtM3YtN2gtMnYtMmgydi0yLjMwOGMwLTEuNzY5LjkzMS0yLjY5MiAzLjAyOS0yLjY5MmgxLjk3MXYzeiIvPjwvc3ZnPg=="></img></a>&nbsp;&nbsp;
              <a target="_blank" href="http://linkedin.com/in/orfleisher/"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTIgMTZoLTJ2LTZoMnY2em0tMS02Ljg5MWMtLjYwNyAwLTEuMS0uNDk2LTEuMS0xLjEwOSAwLS42MTIuNDkyLTEuMTA5IDEuMS0xLjEwOXMxLjEuNDk3IDEuMSAxLjEwOWMwIC42MTMtLjQ5MyAxLjEwOS0xLjEgMS4xMDl6bTggNi44OTFoLTEuOTk4di0yLjg2MWMwLTEuODgxLTIuMDAyLTEuNzIyLTIuMDAyIDB2Mi44NjFoLTJ2LTZoMnYxLjA5M2MuODcyLTEuNjE2IDQtMS43MzYgNCAxLjU0OHYzLjM1OXoiLz48L3N2Zz4="></img></a>&nbsp;&nbsp;
              <a target="_blank" href="https://www.youtube.com/channel/UCLCfTDhutnzsBoxeSlUls9A"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAuOTE4IDEzLjkzM2guNzA2djMuNzk1aC0uNzA2di0uNDE5Yy0uMTMuMTU0LS4yNjYuMjcyLS40MDUuMzUzLS4zODEuMjE4LS45MDIuMjEzLS45MDItLjU1N3YtMy4xNzJoLjcwNXYyLjkwOWMwIC4xNTMuMDM3LjI1Ni4xODguMjU2LjEzOCAwIC4zMjktLjE3Ni40MTUtLjI4NHYtMi44ODF6bS42NDItNC4xODFjLjIgMCAuMzExLS4xNi4zMTEtLjM3N3YtMS44NTRjMC0uMjIzLS4wOTgtLjM4LS4zMjQtLjM4LS4yMDggMC0uMzA5LjE2MS0uMzA5LjM4djEuODU0Yy0uMDAxLjIxLjExNy4zNzcuMzIyLjM3N3ptLTEuOTQxIDIuODMxaC0yLjQzOXYuNzQ3aC44MjN2NC4zOThoLjc5NXYtNC4zOThoLjgyMXYtLjc0N3ptNC43MjEgMi4yNTN2Mi4xMDVjMCAuNDctLjE3Ni44MzQtLjY0NS44MzQtLjI1OSAwLS40NzQtLjA5NC0uNjcxLS4zNHYuMjkyaC0uNzEydi01LjE0NWguNzEydjEuNjU2Yy4xNi0uMTk0LjM3NS0uMzU0LjYyOC0uMzU0LjUxNy4wMDEuNjg4LjQzNy42ODguOTUyem0tLjcyNy4wNDNjMC0uMTI4LS4wMjQtLjIyNS0uMDc1LS4yOTItLjA4Ni0uMTEzLS4yNDQtLjEyNS0uMzY3LS4wNjJsLS4xNDYuMTE2djIuMzY1bC4xNjcuMTM0Yy4xMTUuMDU4LjI4My4wNjIuMzYxLS4wMzkuMDQtLjA1NC4wNjEtLjE0MS4wNjEtLjI2MnYtMS45NnptMTAuMzg3LTIuODc5YzAgNi42MjctNS4zNzMgMTItMTIgMTJzLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyIDEyIDUuMzczIDEyIDEyem0tMTAuNzQ2LTIuMjUxYzAgLjM5NC4xMi43MTIuNTE5LjcxMi4yMjQgMCAuNTM0LS4xMTcuODU1LS40OTh2LjQ0aC43NDF2LTMuOTg2aC0uNzQxdjMuMDI1Yy0uMDkuMTEzLS4yOTEuMjk5LS40MzYuMjk5LS4xNTkgMC0uMTk3LS4xMDgtLjE5Ny0uMjY5di0zLjA1NWgtLjc0MXYzLjMzMnptLTIuNzc5LTIuMjk0djEuOTU0YzAgLjcwMy4zNjcgMS4wNjggMS4wODUgMS4wNjguNTk3IDAgMS4wNjUtLjM5OSAxLjA2NS0xLjA2OHYtMS45NTRjMC0uNjI0LS40NjUtMS4wNzEtMS4wNjUtMS4wNzEtLjY1MiAwLTEuMDg1LjQzMi0xLjA4NSAxLjA3MXptLTIuNzYxLTIuNDU1bC45OTMgMy4yMTF2Mi4xOTFoLjgzNXYtMi4xOTFsLjk3MS0zLjIxMWgtLjg0OGwtLjUzNSAyLjE2LS41NzUtMi4xNmgtLjg0MXptMTAuMTE5IDEwLjIwOGMtLjAxMy0yLjYwNS0uMjA0LTMuNjAyLTEuODQ4LTMuNzE0LTEuNTE4LS4xMDQtNi40NTUtLjEwMy03Ljk3MSAwLTEuNjQyLjExMi0xLjgzNSAxLjEwNC0xLjg0OCAzLjcxNC4wMTMgMi42MDYuMjA0IDMuNjAyIDEuODQ4IDMuNzE1IDEuNTE2LjEwMyA2LjQ1My4xMDMgNy45NzEgMCAxLjY0My0uMTEzIDEuODM1LTEuMTA0IDEuODQ4LTMuNzE1em0tLjg4NS0uMjU1di45NjZoLTEuMzV2LjcxNmMwIC4yODUuMDI0LjUzMS4zMDguNTMxLjI5OCAwIC4zMTUtLjIuMzE1LS41MzF2LS4yNjRoLjcyN3YuMjg1YzAgLjczMS0uMzEzIDEuMTc0LTEuMDU3IDEuMTc0LS42NzYgMC0xLjAxOS0uNDkxLTEuMDE5LTEuMTc0di0xLjcwNGMwLS42NTkuNDM1LTEuMTE2IDEuMDcxLTEuMTE2LjY3OC4wMDEgMS4wMDUuNDMxIDEuMDA1IDEuMTE3em0tLjcyNi0uMDA3YzAtLjI1Ni0uMDU0LS40NDUtLjMwOS0uNDQ1LS4yNjEgMC0uMzE0LjE4NC0uMzE0LjQ0NXYuMzg1aC42MjN2LS4zODV6Ii8+PC9zdmc+"></img></a>&nbsp;&nbsp;
              <a target="_blank" href="http://vimeo.com/orfleisher"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptNS44MiAxMS40MTljLTEuMzA2IDIuNzkyLTQuNDYzIDYuNTk1LTYuNDU4IDYuNTk1LTEuOTY2IDAtMi4yNS00LjE5Mi0zLjMyNC02Ljk4My0uNTI3LTEuMzcyLS44NjgtMS4wNTgtMS44NTgtLjM2NGwtLjYwNC0uNzc5YzEuNDQ0LTEuMjcgMi44ODktMi43NDUgMy43NzgtMi44MjYuOTk4LS4wOTYgMS42MTUuNTg3IDEuODQ1IDIuMDUxLjMwNSAxLjkyNC43MjkgNC45MSAxLjQ3MiA0LjkxLjU3NyAwIDIuMDAzLTIuMzY5IDIuMDc2LTMuMjE1LjEzLTEuMjQtLjkxMi0xLjI3Ny0xLjgxNS0uODkgMS40My00LjY4OSA3LjM4My0zLjgyNSA0Ljg4OCAxLjUwMXoiLz48L3N2Zz4="></img></a>&nbsp;&nbsp;
              <a target="_blank" href="http://instagram.com/juniorxsound/"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTQuODI5IDYuMzAyYy0uNzM4LS4wMzQtLjk2LS4wNC0yLjgyOS0uMDRzLTIuMDkuMDA3LTIuODI4LjA0Yy0xLjg5OS4wODctMi43ODMuOTg2LTIuODcgMi44Ny0uMDMzLjczOC0uMDQxLjk1OS0uMDQxIDIuODI4cy4wMDggMi4wOS4wNDEgMi44MjljLjA4NyAxLjg3OS45NjcgMi43ODMgMi44NyAyLjg3LjczNy4wMzMuOTU5LjA0MSAyLjgyOC4wNDEgMS44NyAwIDIuMDkxLS4wMDcgMi44MjktLjA0MSAxLjg5OS0uMDg2IDIuNzgyLS45ODggMi44Ny0yLjg3LjAzMy0uNzM4LjA0LS45Ni4wNC0yLjgyOXMtLjAwNy0yLjA5LS4wNC0yLjgyOGMtLjA4OC0xLjg4My0uOTczLTIuNzgzLTIuODctMi44N3ptLTIuODI5IDkuMjkzYy0xLjk4NSAwLTMuNTk1LTEuNjA5LTMuNTk1LTMuNTk1IDAtMS45ODUgMS42MS0zLjU5NCAzLjU5NS0zLjU5NHMzLjU5NSAxLjYwOSAzLjU5NSAzLjU5NGMwIDEuOTg1LTEuNjEgMy41OTUtMy41OTUgMy41OTV6bTMuNzM3LTYuNDkxYy0uNDY0IDAtLjg0LS4zNzYtLjg0LS44NCAwLS40NjQuMzc2LS44NC44NC0uODQuNDY0IDAgLjg0LjM3Ni44NC44NCAwIC40NjMtLjM3Ni44NC0uODQuODR6bS0xLjQwNCAyLjg5NmMwIDEuMjg5LTEuMDQ1IDIuMzMzLTIuMzMzIDIuMzMzcy0yLjMzMy0xLjA0NC0yLjMzMy0yLjMzM2MwLTEuMjg5IDEuMDQ1LTIuMzMzIDIuMzMzLTIuMzMzczIuMzMzIDEuMDQ0IDIuMzMzIDIuMzMzem0tMi4zMzMtMTJjLTYuNjI3IDAtMTIgNS4zNzMtMTIgMTJzNS4zNzMgMTIgMTIgMTIgMTItNS4zNzMgMTItMTItNS4zNzMtMTItMTItMTJ6bTYuOTU4IDE0Ljg4NmMtLjExNSAyLjU0NS0xLjUzMiAzLjk1NS00LjA3MSA0LjA3Mi0uNzQ3LjAzNC0uOTg2LjA0Mi0yLjg4Ny4wNDJzLTIuMTM5LS4wMDgtMi44ODYtLjA0MmMtMi41NDQtLjExNy0zLjk1NS0xLjUyOS00LjA3Mi00LjA3Mi0uMDM0LS43NDYtLjA0Mi0uOTg1LS4wNDItMi44ODYgMC0xLjkwMS4wMDgtMi4xMzkuMDQyLTIuODg2LjExNy0yLjU0NCAxLjUyOS0zLjk1NSA0LjA3Mi00LjA3MS43NDctLjAzNS45ODUtLjA0MyAyLjg4Ni0uMDQzczIuMTQuMDA4IDIuODg3LjA0M2MyLjU0NS4xMTcgMy45NTcgMS41MzIgNC4wNzEgNC4wNzEuMDM0Ljc0Ny4wNDIuOTg1LjA0MiAyLjg4NiAwIDEuOTAxLS4wMDggMi4xNC0uMDQyIDIuODg2eiIvPjwvc3ZnPg=="></img></a>&nbsp;&nbsp;
            </div>
            </Section>
          </ScrollableAnchor>
        </div>
      </div>
    )
  }

}


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