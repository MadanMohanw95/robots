import React, { useEffect } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { connect } from 'react-redux';
import { requestRobots, setSearchField } from '../action';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

const App = (props) => {

  const { searchField, onSearchChange, onRequestRobots, robots, isPending } = props;
  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots]);

  const filteredRobots = robots?.filter(robot => {
    return robot.name?.toLowerCase().includes(searchField?.toLowerCase());
  })

  return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f2'>Robots</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundary fallback="Error">
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      )

}

export default connect(mapStateToProps, mapDispatchToProps) (App);
