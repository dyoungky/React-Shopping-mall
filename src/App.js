import './App.css';

// Component
import Detail from './components/Detail';
import About from './components/About';
import Home from './components/Home';
import Cart from './components/Cart';
import DarkVariantExample from './components/DarkVariantExample';

// data
import data from './data';
import axios from 'axios';

// react-bootstrap
import { Container, Nav, Navbar } from 'react-bootstrap';

// etc
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';

function App() {
  // * When you click product, add to LocalStorage
  useEffect(() => {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify([]));
    } else {
      return;
    }
  });

  // * save data using UseState
  const [items, setItems] = useState(data);

  // * useNavigate
  const navigate = useNavigate();

  // // /.React-query
  // let userName = useQuery('query', () => {
  //   return axios.get('./data-user.json').then((a) => {
  //     return a.data;
  //   });
  // });
  // userName.isLoading; // Loading
  // userName.error; // error
  // userName.data; // success

  // * React Bootstrap, navigate
  return (
    <div className='App'>
      <Navbar bg='light' variant='light'>
        {/* Navbar */}
        <Container>
          <Navbar.Brand
            href='#home'
            className='logo'
            onClick={() => {
              navigate('/');
            }}
          >
            FERM <span className='living'>LIVING</span>
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              <FontAwesomeIcon icon={faHouse} style={{ color: '#222' }} />
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} style={{ color: '#222' }} />
            </Nav.Link>
          </Nav>

          {/* * React-query */}
          {/* <Nav>{userName.isLoading ? 'Loading' : userName.data.name}</Nav> */}
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home items={items} setItems={setItems} />} />
        <Route path='/detail/:id' element={<Detail items={items} />} />
        <Route path='/cart' element={<Cart items={items} setItems={setItems}></Cart>} />
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/about/member' element={<About/>} />
        <Route path='/about/location' element={<About/>} /> */}
        // Nested Routes
        <Route path='/about' element={<About />}>
          <Route path='/about/member' element={<div>Member</div>} />
          <Route path='/about/location' element={<div>Location</div>} />
        </Route>
        <Route path='*' element={<div>Error</div>} />
      </Routes>
    </div>
  );
}

export default App;
