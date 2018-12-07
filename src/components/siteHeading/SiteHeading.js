import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import palette from "../../utils/palette";
import { MOBILE_WIDTH } from "../../constants";

const HeadingWrapper = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 3rem;
  font-weight: normal;
  color: ${palette.white};
  text-transform: uppercase;

  &:after {
    content: " ";
    display: block;
    border: 1px solid ${palette.yellowLine};
    margin-top: 1.5rem;
    max-width: 700px;
  }

  & a {
    text-decoration: none;
    color: #fff;
  }

  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`;

export default class extends Component {
  render() {
    return (
      <HeadingWrapper>
        <Link to="/">Developing Writers</Link>
      </HeadingWrapper>
    );
  }
}
