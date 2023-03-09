import './App.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './components/Detail';
import About from './components/About';

function App() {
  const [items] = useState(data);
  const navigate = useNavigate();

  return (
    <div className='App'>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home' className='logo'>
            FERM LIVING
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => { navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail');}}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about'); }} > About </Nav.Link>
            <Nav.Link onClick={() => { navigate('/event'); }} > Event </Nav.Link>

            {/* <Link to='/' className='menu'> Home </Link>
            <Link to='/detail' className='menu'> Detail </Link>
            <Link to='/detail' className='menu'> About us </Link> */}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
            <>
              <div className='main-bg'></div>
              <Container>
                <Row>
                  {items.map((item, i) => {
                    return <Item items={items[i]} i={i + 1} />;
                  })}
                </Row>
              </Container>xssss
            </>
          }
        />

        <Route path='/detail' element={<Detail />} />
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/about/member' element={<About/>} />
        <Route path='/about/location' element={<About/>} /> */}

        // Nested Routes
        <Route path='/about' element={<About />} >
          <Route path='/about/member' element={<div>Member</div>} />
          <Route path='/about/location' element={<div>Location</div>} />
        </Route>
        <Route path='/event' element={<div>Today's event<Outlet></Outlet></div>}>
          <Route path='/event/one' element={<div>2 for 3</div>} />
          <Route path='/event/two' element={<div>birthday</div>} />
        </Route>
        <Route path='*' element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

const Item = (props) => {
  return (
    <Col sm className='products'>
      <img width='100%' src={props.items.img} />
      <h4>{props.items.title}</h4>
      <p>{props.items.price} DKK</p>
    </Col>
  );
};

export default App;
