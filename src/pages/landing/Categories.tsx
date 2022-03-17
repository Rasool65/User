import { useSelector } from 'react-redux';
import Category from '../../uiKits/category/CategoryWidget';
import { StyleContainerCategory } from '../../uiKits/category/style';
import { BASE_URL } from '@config/urls';
import Slider from 'react-slick';
import 'node_modules/slick-carousel/slick/slick.css';
import 'node_modules/slick-carousel/slick/slick-theme.css';
import { CustomArrow, StyleCarousel } from '@uikits/carousel/style';

const Categories = () => {
  const { allApis } = useSelector((state: any) => state.landingReducer);

  const settingsDefault = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 5,
    initialSlide: 4,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow name='category' type='next' />,
    prevArrow: <CustomArrow name='category' type='prev' />,
    rtl: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <StyleContainerCategory>
      <Slider {...settingsDefault}>
        {!!allApis &&
          allApis?.productCategies.length > 0 &&
          allApis?.productCategies.map((_item) => (
            <Category
              categoryId={_item.id}
              key={_item.id}
              title={_item.name}
              img={
                _item.image
                  ? `${BASE_URL}${
                      _item?.image ? _item.image.replace('.', '_n.') : ''
                    }`
                  : ''
              }
            />
          ))}
      </Slider>
    </StyleContainerCategory>
  );
};

export default Categories;
