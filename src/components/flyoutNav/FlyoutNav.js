import React from "react";
import styled from "styled-components";

import { Menu, MenuButton, MenuList, MenuLink } from "@reach/menu-button";

import { Spring, animated } from "react-spring";

const List = styled.ul`
  list-style-type: none;
`;
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function buildSettings(numChildren, settings = {}) {
  const defaultSettings = {
    buttonDiameter: 90,
    menuButtonDiameter: 50,
    offset: 0.5,
    separationAngle: 0,
    flyoutRadius: 130,
    baseAngle: -90,
    minAngle: 0,
    maxAngle: 360,
    yOffset: 0,
    xOffset: 0
  };

  const localSettings = {
    ...defaultSettings,
    ...settings
  };

  const separationAngle =
    (localSettings.maxAngle - localSettings.minAngle) / numChildren;
  localSettings.separationAngle = separationAngle;

  return localSettings;
}

function getChildPosition(index, settings) {
  const angle = settings.baseAngle + index * settings.separationAngle;

  const coords = {
    x:
      settings.flyoutRadius * Math.cos(degreesToRadians(angle)) -
      settings.menuButtonDiameter / 2 +
      settings.xOffset,
    y:
      settings.flyoutRadius * Math.sin(degreesToRadians(angle)) +
      settings.menuButtonDiameter / 2 +
      settings.yOffset
  };

  return coords;
}

export default class FlyoutNav extends React.Component {
  settings = null;
  state = { childPositions: [], showItems: false, shouldHide: false };

  static defaultProps = {
    children: []
  };

  componentDidMount() {
    const { children, angleSettings } = this.props;
    this.settings = buildSettings(children.length, angleSettings);

    const childPositions = children.map((item, index) =>
      getChildPosition(index, this.settings)
    );

    this.setState({ childPositions });
  }

  componentDidUpdate() {}

  toggleItems = () => {
    this.setState(p => {
      if (p.showItems === true) {
        return { shouldHide: true };
      }

      return { showItems: true };
    });
  };
  render() {
    const { childPositions, showItems, shouldHide } = this.state;
    const { children, renderToggle, style, listStyle } = this.props;

    return childPositions.length > 0 ? (
      <div
        style={{
          ...style
        }}
      >
        <List style={listStyle}>
          {showItems &&
            childPositions.map((position, index) => (
              <Spring
                reset={this.state.showItems}
                reverse={this.state.shouldHide}
                from={{ top: 0, left: 0, opacity: 0 }}
                onStart={() => {
                  setTimeout(() => {
                    if (this.state.shouldHide) {
                      this.setState({ shouldHide: false, showItems: false });
                    }
                  }, 500);
                }}
                to={{
                  top: position.y,
                  left: position.x,
                  opacity: 1
                }}
              >
                {props => (
                  <animated.li
                    style={{
                      position: "absolute",
                      top: props.top,
                      left: props.left,
                      opacity: props.opacity
                    }}
                  >
                    {children[index]}
                  </animated.li>
                )}
              </Spring>
            ))}
        </List>
        {renderToggle(this.toggleItems)}
      </div>
    ) : null;
  }
}