import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample(props) {
  return (
    <Carousel variant='dark' slide={false}>
      <Carousel.Item>
        <img className='d-block w-100' src={props.items.imgUrl} alt='First slide' />
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={props.items.imgUrl1} alt='Second slide' />
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={props.items.imgUrl2} alt='Third slide' />
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
