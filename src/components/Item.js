import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DarkVariantExample from './DarkVariantExample';

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

  const price = props.items.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className='products'>
      <NavLink to={'/detail/' + props.items.id} className={'start ' + fade}>
        <DarkVariantExample items={props.items}></DarkVariantExample>
        <h4>{props.items.title}</h4>
        <p>{price} kr</p>
      </NavLink>
    </div>
  );
};

export default Item;
