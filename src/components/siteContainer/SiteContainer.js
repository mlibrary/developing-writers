import React, { Component } from "react";
import styled from "styled-components";
import Background from "../background";
import SiteHeading from "../siteHeading";
import Breadcrumbs from "../breadcrumbs";
import FlyoutMenu from "../flyoutMenu";
import Portal from "../portal";
import HamburgerIcon from "../hamburgerIcon";
import TouchableOpacity from "../touchableOpacity";
import { buildFrontmatterLookup } from "../../utils/node";

import styles from "../../styles/reset.css";
import global from "../../styles/global.css";

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ContentArea = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  position: relative;
`;
export default class extends Component {
  static defaultProps = {
    showBreadcrumbs: true,
    breadcrumbLinks: []
  };

  state = { showFlyout: false };

  shouldShowBreadcrumbs = () => {
    return (
      this.props.showBreadcrumbs &&
      this.props.data &&
      this.props.data.allMdx &&
      this.props.data.allMdx.edges
    );
  };

  componentDidMount() {
    this.buildLinkTree();
  }

  buildLinkTree = () => {
    const {
      pageContext: { key },
      data: {
        allMdx: { edges: nodes }
      }
    } = this.props;

    const lookup = buildFrontmatterLookup(nodes, true, true);

    return lookup;
  };

  buildBreadcrumbLinks = () => {
    if (this.shouldShowBreadcrumbs()) {
      const {
        pageContext: { key },
        data: {
          allMdx: { edges: nodes }
        }
      } = this.props;
      const lookup = buildFrontmatterLookup(nodes, true);

      // walk backwards up the lookup starting with this key
      let currentKey = key;
      let list = [];
      while (currentKey) {
        const data = lookup[currentKey];
        list.push({
          title: data.title,
          slug: data.slug
        });
        currentKey = data.parentKey;
      }

      list.push({
        title: "home",
        slug: "/"
      });
      const output = list.reverse();
      return output;
    }
  };

  render() {
    const shouldShowBreadcrumbs = this.shouldShowBreadcrumbs();
    return (
      <Background>
        <HeadingWrapper>
          <SiteHeading />
          {
            <TouchableOpacity
              onClick={() => this.setState({ showFlyout: true })}
            >
              <HamburgerIcon />
            </TouchableOpacity>
          }
        </HeadingWrapper>
        <Portal>
          <FlyoutMenu
            onClose={() => this.setState({ showFlyout: false })}
            isVisible={this.state.showFlyout}
            items={this.buildLinkTree()}
          />
        </Portal>
        <Breadcrumbs items={this.buildBreadcrumbLinks()} />
        <ContentArea>{this.props.children}</ContentArea>
      </Background>
    );
  }
}
