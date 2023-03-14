import { Routes, Route, Link, useNavigate, Outlet, useParams, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import data from '../data';
import axios from 'axios';

const Home = (props, i) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className='main-bg'></div>

      <button
        className='button'
        type='button'
        onClick={() => {
          let copy = [...props.items];
          copy.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });
          props.setItems(copy);
        }}
      >
        Ascending order
      </button>
      <button
        className='button'
        type='button'
        onClick={() => {
          let copy = [...props.items];
          copy.sort((a, b) => {
            return b.title > a.title ? 1 : -1;
          });
          props.setItems(copy);
        }}
      >
        Descending order
      </button>

      <Container>
        <Row>
          {props.items.map((item, i) => {
            return <Item items={props.items[i]} i={i + 1} key={i} />;
          })}
        </Row>

        {count < 3 ? (
          <button
            className='more'
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                axios
                  .get('/data' + (count + 1) + '.json')
                  .then((data) => {
                    let copy = [...props.items, ...data.data];
                    props.setItems(copy);
                    setCount(count + 1);
                    setLoading(false);
                  })
                  .catch(() => {
                    setLoading(false);
                    alert('Error');
                  });
              }, 2000);
            }}
          >
            See more
          </button>
        ) : null}
        {loading === true ? <div>Loading...</div> : null}
      </Container>
    </>
  );
};

const Item = (props) => {
  return (
    <Col sm className='products'>
      <NavLink to={'/detail/' + props.items.id}>
        <img width='100%' src={props.items.imgUrl} />
        <h4>{props.items.title}</h4>
        <p>{props.items.price} DKK</p>
      </NavLink>
    </Col>
  );
};

export default Home;
