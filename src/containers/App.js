import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { connect } from 'react-redux';
import { setSearchField } from '../action';

const mapStateToProps = (state) => {
  return {
    searchField: state.robots.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

const App = (props) => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setRobots(users))
  }, [])

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(props.searchField.toLowerCase());
  })

  return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f2'>Robots</h1>
          <SearchBox searchChange={props.onSearchChange} />
          <Scroll>
            <ErrorBoundary fallback="Error">
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      )

}

export default connect(mapStateToProps, mapDispatchToProps) (App);
