import React, { useState } from 'react';

import { StyleContainer } from '../../uiKits/product/style';

import Product from '../../uiKits/product/ProductWidget';
import Carousel from '@uikits/carousel/CarouselWidget';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Products = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<any>({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  function Alert(Props) {
    return <MuiAlert elevation={3} variant='filled' {...Props} />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyleContainer>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity='success'>
          محصول با موفقیت به سبد خرید اضافه شد
        </Alert>
      </Snackbar>

      <Carousel setting='product'>
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <Product
                id={product.id}
                title={product.name}
                price={product.price}
                img={product.image}
                openSnackbar={() => {
                  setOpen(true);
                }}
                key={index}
                CountProduct={products.length}
              />
            );
          })}
      </Carousel>
    </StyleContainer>
  );
};

export default Products;
