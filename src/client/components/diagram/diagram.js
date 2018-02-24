/* @flow */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Cylinder from './cylinder/cylinder';
import './diagram.styl';

import type { DiagramPropsType } from './flow-types';

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
const randomValue = (min: number, max: number): number => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

const Diagram = ({ title, data }: DiagramPropsType) => {
  const {
    loading,
    statistics,
    errors,
  } = data;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errors) {
    return <p>Something went wrong. Try again or try later. :(</p>;
  }

  return (
    <div className="diagram">
      <h3 className="diagram__title">{ title }</h3>
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
};

export default graphql(statisticsQuery)(Diagram);
