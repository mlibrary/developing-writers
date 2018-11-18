import React, { Component } from "react";
import styled from "styled-components";

import palette from "../../utils/palette";

const HeadingWrapper = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 45px;
  font-weight: normal;
  color: ${palette.white};
  text-transform: uppercase;

  &:after {
    content: " ";
    display: block;
    border: 1px solid ${palette.yellowLine};
    margin-top: 20px;
  }
`;

export default class extends Component {
  render() {
    return <HeadingWrapper>Developing Writers</HeadingWrapper>;
  }
}