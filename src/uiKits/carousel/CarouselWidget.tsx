import React, { useState } from 'react';
import Slider from 'react-slick';
import 'node_modules/slick-carousel/slick/slick.css';
import 'node_modules/slick-carousel/slick/slick-theme.css';
import { CustomArrow, StyleCarousel } from './style';

const settingsDefault = {
  dots: false,
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 5,
  initialSlide: 4,
  autoplay: false,
  autoplaySpeed: 3000,
  nextArrow: <CustomArrow type='next' />,
  prevArrow: <CustomArrow type='prev' />,
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

const Carousel = (props) => {
  const { setting, children } = props;

  return (
    <StyleCarousel>
      <Slider {...settingsDefault}>{children}</Slider>
    </StyleCarousel>
  );
};

export default Carousel;
