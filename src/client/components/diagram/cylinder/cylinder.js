/* @flow */

import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './cylinder.styl';

type AnimatedPropsType = {
  children: any,
}

const Animated = ({ children, ...props }: AnimatedPropsType) => (
  <CSSTransition
    {...props}
    timeout={250}
    classNames={{
      appear: 'cylinder--folded',
    }}
    appear
  >
    {children}
  </CSSTransition>
);

type CylinderPropsType = {
  value: number,
  opacity: number,
  topSign: string,
  bottomSign: string
};

const Cylinder = ({ value, opacity, topSign, bottomSign }: CylinderPropsType) => (
  <Animated in>
    <div className={`cylinder cylinder--height_${value}`}>
      <div className="cylinder__shape" style={{ opacity: opacity / 100 }}>
        <div className="cylinder__cap cylinder__cap--top" />
        <div className="cylinder__glare" />
        <div className="cylinder__cap cylinder__cap--bottom" />
      </div>
      <p className="cylinder__sign cylinder__sign--top">Top Sign: {topSign}</p>
      <p className="cylinder__sign cylinder__sign--bottom">{bottomSign}</p>
    </div>
  </Animated>
);

export default Cylinder;
