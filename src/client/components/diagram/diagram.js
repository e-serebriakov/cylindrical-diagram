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
      return <p>Loading...</p>
    }

    if (errors) {
      return <p>Something went wrong. Try again or try later. :(</p>
    }

    return (
      <div className="diagram">
        { statistics.map(({ id, ...itemData }) => (
          <Cylinder
            opacity={ Math.round((Math.random() * 100)) } // исключительно для примера
            key={ `diagram-cylinder-${id}` }
            { ...itemData }
          />
        )) }
      </div>
    )
  }
}

export default graphql(statisticsQuery)(Diagram);
