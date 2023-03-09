import data from '../data';
import { useState } from 'react';

const Detail = (props) => {
  const [items] = useState(data);
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img src='https://codingapple1.github.io/shop/shoes1.jpg' width='100%' />
          </div>
          <div className='col-md-6'>
            <h4 className='pt-5'>아아아</h4>
            <p>상품설명</p>
            <p>120000원</p>
            <button className='btn btn-danger'>주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
