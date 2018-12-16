import React, { Component } from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import palette from "../../utils/palette";
import { textCss } from "../text/Text";

const padding = 20;

export const Link = styled(GatsbyLink)`
  color: ${palette.white};
  ${textCss};
  font-size: 2rem;
  text-decoration: none;
  position: flex;

  &:after {
    content: " ";
    display: block;
    opacity: 0.5;
  }
`;

const ListContainer = styled.ul`
  padding: ${padding}px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  list-style-type: none;
  position: relative;
  min-height: 500px;
`;

export const LinkBackground = `
  background-color: rgba(${palette.rgbContentBackground}, 0.8);
  padding: 1.5rem;
  border-radius: 1.5rem;
`;

const ListItem = styled.li`
  ${LinkBackground}
  position: absolute;
  left: ${props => props.left}%;
  top: ${props => props.top + padding}px;
`;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default class extends Component {
  state = { paddingHeight: 90 };
  mounted = false;

  componentDidMount() {
    this.getPaddingAmount();
    window.addEventListener("resize", this.getPaddingAmount);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getPaddingAmount);
  }

  getPaddingAmount = () => {
    const { linkProperties } = this.props;
    const height = this.container.clientHeight / linkProperties.length;
    this.setState({ paddingHeight: height > 90 ? 90 : height });
  };

  render() {
    const { linkProperties } = this.props;
    const { paddingHeight } = this.state;

    if (!linkProperties) {
      return null;
    }
    return (
      <ListContainer ref={node => (this.container = node)}>
        {linkProperties.map((link, index) => (
          <ListItem
            key={link.href}
            left={getRandomInt(35)}
            top={index * paddingHeight}
          >
            <Link to={link.href}>{link.title}</Link>
          </ListItem>
        ))}
      </ListContainer>
    );
  }
}
