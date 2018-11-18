import React from "react";
import styled from "styled-components";

const hiddenCss = `
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
`;

export const visuallyHiddenWrapper = component => styled(component)`
  ${hiddenCss};
`;

const VisuallyHidden = styled.span`
  ${hiddenCss};
`;

export default VisuallyHidden;