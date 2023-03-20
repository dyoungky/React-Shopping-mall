import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { addItem, addCount } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DarkVariantExample from './DarkVariantExample';

const Detail = (props) => {
  const navigate = useNavigate();
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  // const [count, setCount] = useState(0);
  const [discount, setDiscount] = useState(true);
  const [tabs, setTabs] = useState(0);
  let [fade2, setFade2] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFade2('end');
    }, 100);

    return () => {
      setFade2('');
    };
  }, []);

  // useEffect
  useEffect(() => {
    let a = setTimeout(() => {
      setDiscount(false);
    }, 5000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  const [message, setMessage] = useState('');
  useEffect(() => {
    if (isNaN(message) == true) {
      alert('숫자만 입력가능합니다');
    }
  }, [message]);

  const { id } = useParams();
  let selectedItem = props.items.find(function (item) {
    return item.id == id;
  });

  // ///.localStorage save, remove overlap(set)
  useEffect(() => {
    let getItem = localStorage.getItem('watched');
    getItem = JSON.parse(getItem);
    getItem = new Set(getItem);
    getItem = Array.from(getItem);
    getItem.push(selectedItem.id);
    localStorage.setItem('watched', JSON.stringify(getItem));
  }, []);

  return (
    <>
      <div className={'container start ' + fade2}>
        {discount ? (
          <div className='alert alert-warning'>
            <b>JUST NOW</b>: SPRING DEALS Up to 30% EXTRA off
          </div>
        ) : (
          <></>
        )}
        {/* {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          plus
        </button> */}
        <div className='row'>
          <div className='col-md-6'>
            {/* <DarkVariantExample items={selectedItem}></DarkVariantExample> */}
            <img src={selectedItem.imgUrl} width='100%' />
            <img src={selectedItem.imgUrl1} width='30%' className='extra-img' />
            <img src={selectedItem.imgUrl2} width='30%' className='extra-img' />
          </div>
          <div className='col-md-6'>
            <h4 className='pt-5'>{selectedItem.title}</h4>
            <p className='detail-content'>{selectedItem.content}</p>
            <p className='detail-price'>{selectedItem.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} kr</p>
            {/* ///.order button */}
            <button
              className='btn btn-danger detail-order'
              onClick={() => {
                dispatch(addItem({ id: selectedItem.id, title: selectedItem.title, price: selectedItem.price, count: 1 }));
                if (window.confirm('Do you want to see your cart?')) {
                  return navigate('/Cart');
                } else {
                  return null;
                }
              }}
            >
              Order
            </button>

            {/* ///.product information tab */}
            <Nav variant='tabs' defaultActiveKey='link-0' className='detail-tabs'>
              <Nav.Item>
                <Nav.Link
                  eventKey='link-0'
                  onClick={() => {
                    setTabs(0);
                  }}
                >
                  Description
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='link-1'
                  onClick={() => {
                    setTabs(1);
                  }}
                >
                  Detail
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='link-2'
                  onClick={() => {
                    setTabs(2);
                  }}
                >
                  Leaving
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent tabs={tabs} selectedItem={selectedItem} />
          </div>
          {/* <input onChange={(e) => setMessage(e.target.value)}></input> */}
        </div>
      </div>
    </>
  );
};

const TabContent = (props) => {
  let [fade, setFade] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      setFade('');
    };
  }, [props.tabs]);

  // // method1
  // if (props.tabs === 0) {
  //   return <div>내용0</div>;
  // } else if (props.tabs === 1) {
  //   return <div>내용1</div>;
  // } else {
  //   return <div>내용2</div>;
  // }

  // method2
  return <div className={'start ' + fade}> {[<div className='detail-des'>{props.selectedItem.content}</div>, <div className='detail-detail'>{props.selectedItem.detail}</div>, <div className='detail-leaving'>{props.selectedItem.leaving}</div>][props.tabs]}</div>;
};
export default Detail;
