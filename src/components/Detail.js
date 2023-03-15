import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { addItem, addCount } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    }, 2000);
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

  return (
    <>
      <div className={'container start ' + fade2}>
        {discount ? <div className='alert alert-warning'>2초이내 구매시 할인</div> : <></>}
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
            <img src={selectedItem.imgUrl} width='100%' />
          </div>
          <div className='col-md-6'>
            <h4 className='pt-5'>{selectedItem.title}</h4>
            <p>{selectedItem.content}</p>
            <p>{selectedItem.price} kr</p>
            {/* ///.order button */}
            <button
              className='btn btn-danger'
              onClick={() => {
                const cartItem = state.cart;
                let a = cartItem.findIndex(checkAge);
                function checkAge(price) {
                  return price > 18;
                }
                console.log(a);

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
          </div>
          {/* <input onChange={(e) => setMessage(e.target.value)}></input> */}
        </div>
        {/* ///.product information tab */}
        <Nav variant='tabs' defaultActiveKey='link-0'>
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
              Specifications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey='link-2'
              onClick={() => {
                setTabs(2);
              }}
            >
              Delivery
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tabs={tabs} selectedItem={selectedItem} />
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
  return <div className={'start ' + fade}> {[<div>{props.selectedItem.content}</div>, <div>내용1</div>, <div>내용2</div>][props.tabs]}</div>;
};
export default Detail;
