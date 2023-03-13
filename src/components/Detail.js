import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = (props) => {
  const [count, setCount] = useState(0);
  const [discount, setDiscount] = useState(true);

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
      <div className='container'>
        {discount ? <div className='alert alert-warning'>2초이내 구매시 할인</div> : <></>}
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          plus
        </button>
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
          <input onChange={(e) => setMessage(e.target.value)}></input>
        </div>
      </div>
    </>
  );
};
export default Detail;
