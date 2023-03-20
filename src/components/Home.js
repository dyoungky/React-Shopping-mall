import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import axios from 'axios';
import Item from './Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import DarkVariantExample from './DarkVariantExample';

const Home = (props) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className='main-bg'></div>
      <Container>
        {/* Order button */}
        <div className='orderBtn'>
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
            A to Z <FontAwesomeIcon icon={faArrowDown} />
          </button>
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
            Z to A <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              let copy = [...props.items];
              copy.sort((a, b) => {
                return b.price > a.price ? 1 : -1;
              });
              props.setItems(copy);
            }}
          >
            Highest price <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              let copy = [...props.items];
              copy.sort((a, b) => {
                return a.price > b.price ? 1 : -1;
              });
              props.setItems(copy);
            }}
          >
            Lowest price <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>

        {/* Items at Main page */}
        <div className='items'>
          {props.items.map((item, i) => {
            return <Item items={props.items[i]} key={i} />;
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          {/* Loading */}
          {loading == true ? (
            <div style={{ marginBottom: '1px' }}>
              <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : null}

          {/* Show more button  */}
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
              Show more <FontAwesomeIcon icon={faCaretDown} />
            </button>
          ) : null}
        </div>
      </Container>

      <section className='bottom'>
        <h5 className='bottom-title'>
          FERM LIVING using <span>React</span>
        </h5>
        <h5 className='bottom-dy'>
          <a href='https://dyoungky.dk/' target='_blank' rel='noreferrer'>
            dyoungky.dk
          </a>
        </h5>
      </section>
    </>
  );
};

export default Home;
