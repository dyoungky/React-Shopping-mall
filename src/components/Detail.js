import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Detail = (props) => {
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
            <button className='btn btn-danger'>주문하기</button>
          </div>
          {/* <input onChange={(e) => setMessage(e.target.value)}></input> */}
        </div>

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
        <TabContent tabs={tabs} />
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
  return <div className={'start ' + fade}> {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tabs]}</div>;
};
export default Detail;
