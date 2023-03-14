import { Routes, Route, Link, useNavigate, Outlet, useParams, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from '../data';
import axios from 'axios';
import { useEffect } from 'react';

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
        A to Z
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
        Z to A
      </button>

      <Container>
        <Row>
          {props.items.map((item, i) => {
            return <Item items={props.items[i]} i={i + 1} key={i} />;
          })}
        </Row>
        {loading == true ? <div style={{ margin: '30px 0' }}>Loading...</div> : null}
        {count < 3 ? (
          <button
            className='more'
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                axios
                  .get('./data' + (count + 1) + '.json')
                  .then((result) => {
                    let copy = [...props.items, ...result.data];
                    props.setItems(copy);
                    setCount(count + 1);
                    setLoading(false);
                  })
                  .catch(() => {
                    console.log('error');
                  });
              }, 2000);
            }}
          >
            Show more
          </button>
        ) : null}
      </Container>
    </>
  );
};

const Item = (props) => {
  let [fade, setFade] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      setFade('');
    };
  }, [props.tabs]);

  return (
    <Col sm className='products'>
      <NavLink to={'/detail/' + props.items.id} className={'start ' + fade}>
        <img width='100%' src={props.items.imgUrl} />
        <h4>{props.items.title}</h4>
        <p>{props.items.price} DKK</p>
      </NavLink>
    </Col>
  );
};

export default Home;
