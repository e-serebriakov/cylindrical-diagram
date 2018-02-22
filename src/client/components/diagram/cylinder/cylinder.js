import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

import './cylinder.styl';

export default class Cylinder extends Component {
  /**
   * @inheritDoc
   */
  render() {
    const {
      value,
      opacity,
      topSign,
      bottomSign,
    } = this.props;
    const heightClass = value ? `cylinder--height_${value}` : '';
    const opacityClass = opacity ? `cylinder__shape--opacity_${opacity}` : '';

    return (
      <div className={ `cylinder ${heightClass}` }>
        <div className={ `cylinder__shape ${opacityClass}` } />
        <p className="cylinder__sign cylinder__sign--top">Top Sign: {topSign}</p>
        <p className="cylinder__sign cylinder__sign--bottom">Bottom Sign: {bottomSign}</p>
      </div>
    )
  }
}

