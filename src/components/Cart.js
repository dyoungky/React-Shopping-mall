import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { changeAge, changeName } from '../store/userSlice';
import { addCount, changeOrder, removeCount, removeItem, addNewItem } from '../store';

const Cart = (props) => {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  return (
    <div className='container'>
      {/* <span style={{ textAlign: 'center' }}>
        {state.user.name}'s(age:{state.user.age}) {state.cart.count} Cart
      </span>

      <button
        className='btn'
        onClick={() => {
          dispatch(changeName());
        }}
      >
        이름변경
      </button>
      <button
        className='btn'
        onClick={() => {
          dispatch(changeAge(10));
        }}
      >
        나이변경
      </button> */}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((item, i) => {
            // count is more than 1
            if (state.cart[i].count > 0) {
              return (
                <tr key={i}>
                  <td>{state.cart[i].id}</td>
                  <td>{state.cart[i].title}</td>
                  <td>
                    {state.cart[i].count}&nbsp;&nbsp;&nbsp;
                    <button
                      className='btn'
                      onClick={() => {
                        dispatch(addCount(state.cart[i].id));
                      }}
                    >
                      +
                    </button>
                    <button
                      className='btn'
                      onClick={() => {
                        dispatch(removeCount(state.cart[i].id));
                      }}
                    >
                      -
                    </button>
                  </td>
                  <td>{state.cart[i].price} kr</td>
                  <td>
                    <button
                      className='btn'
                      onClick={() => {
                        dispatch(removeItem(state.cart[i].id));
                      }}
                    >
                      remove
                    </button>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th> kr</th>
            <th></th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default Cart;
