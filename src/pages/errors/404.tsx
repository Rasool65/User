import React from 'react';
import { Container } from 'src/style';
import Error_Image from 'assets/img/404.png';
import { ErrorPageBody } from './style';

const Error404 = () => {
  return (
    <>
      <Container isHidden={false}>
        <ErrorPageBody>
          <div>
            <img src={Error_Image} alt='404 Error' />
            <h3>هیچ صفحه ای پیدا نشد!</h3>
            <div className='mt-15 mb-15'>
              <a href='/'>بازگشت به صفحه اصلی</a>
            </div>
          </div>
        </ErrorPageBody>
      </Container>
    </>
  );
};

export default Error404;
