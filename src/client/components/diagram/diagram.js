import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Cylinder from './cylinder/cylinder';
import './diagram.styl';

const statisticsQuery = gql`query statistics {
  statistics {
    id
    value
    topSign
    bottomSign  
  }
}`;

/**
 * Return random value from min to max
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const randomValue = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

class Diagram extends Component {
  /**
   * @inheritDoc
   */
  render() {
    const {
      loading,
      statistics,
      errors,
    } = this.props.data;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (errors) {
      return <p>Something went wrong. Try again or try later. :(</p>;
    }

    return (
      <div className="diagram">
        <h3 className="diagram__title">{ this.props.title }</h3>
        <div className="diagram__items">
          { statistics.map(({ id, ...itemData }) => (
            <Cylinder
              opacity={randomValue(50, 100)} // исключительно для примера
              key={`diagram-cylinder-${id}`}
              {...itemData}
            />
          )) }
        </div>
      </div>
    );
  }
}

export default graphql(statisticsQuery)(Diagram);
