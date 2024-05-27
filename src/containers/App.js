import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
  const [searchfield, setSearchfield] = useState('');
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setRobots(users))
  }, [])

  const onSearchChange = (event) => {
    const searchValue = event.target.value;
    if (searchfield !== searchValue) {
      setSearchfield(event.target.value)
    }
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  return !robots.length ?
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

export default App;
