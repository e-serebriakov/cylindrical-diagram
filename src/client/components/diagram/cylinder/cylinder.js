import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './cylinder.styl';

const Animated = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={250}
    classNames={{
      appear: 'folded',
    }}
    appear
  >
    {children}
  </CSSTransition>
);

const Cylinder = ({ value, opacity, topSign, bottomSign }) => (
  <Animated in>
    <div className={`cylinder cylinder--height_${value}`}>
      <div className={`cylinder__shape cylinder__shape--opacity_${opacity}`} >
        <div className="cylinder__cap cylinder__cap--top" />
        <div className="cylinder__blic" />
        <div className="cylinder__cap cylinder__cap--bottom" />
      </div>
      <p className="cylinder__sign cylinder__sign--top">Top Sign: {topSign}</p>
      <p className="cylinder__sign cylinder__sign--bottom">{bottomSign}</p>
    </div>
  </Animated>
);

export default Cylinder;
