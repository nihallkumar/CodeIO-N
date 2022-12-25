import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navabr/Navbar';
import Home from './pages/Home/Home';
import CreateRoom from './pages/CreateRoom/CreateRoom';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import JoinRoom from './pages/JoinRoom/JoinRoom';
import { socket } from './socket';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateuserid } from './actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('USER-CONNECTED', (data) => {
      console.log('Socket id = ' + data);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route exact path="/create-room">
            <CreateRoom />
          </Route> */}
          <Route exact path="/join-room">
            <JoinRoom />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

/*
background black - #212121
background red - #8EE4AF
heading red - #EDF5E1
text green - #5CDB95
#907163
#379683

*/
