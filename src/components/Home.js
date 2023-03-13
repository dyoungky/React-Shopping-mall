import { Routes, Route, Link, useNavigate, Outlet, useParams, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from '../data';

const Home = (props, i) => {
  return (
    <>
      <div className='main-bg'></div>

      <button
        className='sort'
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
        className='sort'
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
