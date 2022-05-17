import { StyleCustomBtn } from '@uikits/button/style';
import { colorPalette } from '@uikits/colors/Color';
import { StyleDivider } from '@uikits/divider/style';
import IconWidget from '@uikits/icon/IconWidget';
import {
  ShoppingContainer,
  Content,
  CartList,
  Option,
  ListItem,
  ItemContent,
  Aside,
  PriceDescription,
  EmptyContent,
} from './style';
import EmptyCart from '@assets/img/icon/shopping-basket@2x.png';
import CounterWidget from '@uikits/counter/CounterWidget';
import closeIcon from '@assets/img/icon/close.png';
import ReactLoading from 'react-loading';

const Basket = ({
  currentData,
  handleDeleteProduct,
  handleClickNext,
  handleSubmit,
  loadingEmpyBox,
  loadingPage,
  loadingOrder,
}) => {
  const getValue = (count, id) => {
    const value = {
      productId: id,
      count,
    };
    handleSubmit(value);
  };

  return (
    <ShoppingContainer>
      <Content>
        {currentData.length > 0 && (
          <CartList>
            {currentData.map((item: any, index) => {
              return (
                <ListItem key={index + 1}>
                  <Option className='name'>
                    <span style={{ color: '#707070' }}>{index + 1}</span>
                    <StyleDivider
                      Width={'1px'}
                      Height={'5px'}
                      Type={'Vertical'}
                      Background={colorPalette.gray_55}
                    />
                    <p>{item.productName}</p>
                  </Option>
                  <ItemContent>
                    <p>{item.productName}</p>
                    <Option className='remov-xs'>
                      <StyleDivider
                        Width={'1px'}
                        Height={'5px'}
                        Type={'Vertical'}
                        Background={colorPalette.gray_55}
                      />
                      <div
                        onClick={() => {
                          handleDeleteProduct(item.id);
                        }}
                      >
                        <IconWidget
                          alt='close'
                          src={closeIcon}
                          width={'10px'}
                          height={'10px'}
                        />
                      </div>
                    </Option>

                    <CounterWidget
                      initial={item.count}
                      data={item.productId}
                      handleChange={getValue}
                    />
                  </ItemContent>
                  <Option className='remove'>
                    <StyleDivider
                      Width={'1px'}
                      Height={'5px'}
                      Type={'Vertical'}
                      Background={colorPalette.gray_55}
                    />
                    <div
                      onClick={() => {
                        handleDeleteProduct(item.id);
                      }}
                    >
                      <IconWidget
                        alt='close'
                        src={closeIcon}
                        width={'10px'}
                        height={'10px'}
                      />
                    </div>
                  </Option>
                </ListItem>
              );
            })}
          </CartList>
        )}
        {loadingEmpyBox && !loadingPage && (
          <EmptyContent>
            <IconWidget
              alt='EmptyCart'
              src={EmptyCart}
              width={'57px'}
              height={'57px'}
            />
            <h4>سبد خرید شما خالی است!</h4>
            <p>
              می‌توانید برای مشاهده محصولات بیشتر به صفحه محصولات مراجعه کنید.
            </p>
          </EmptyContent>
        )}
      </Content>
      <Aside>
        <PriceDescription>
          لطفا برای پیگیری سفارش وارد پروفایل شده واز طریق منوی "سفارش های من" و
          دکمه جزئیات سفارش از پیشرفت سفارش مطلع گردید.
        </PriceDescription>
        <StyleCustomBtn
          onClick={handleClickNext}
          disabled={currentData.length === 0 ? true : false}
          type='button'
          style={{ margin: 0 }}
          Width={'100%'}
          Height={'51px'}
        >
          {loadingOrder && (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={30}
              width={30}
            />
          )}
          ادامه
        </StyleCustomBtn>
        {/* </TotalPrice> */}
      </Aside>
    </ShoppingContainer>
  );
};

export default Basket;
