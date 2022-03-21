import { StyleCustomBtn } from '@uikits/button/style';
import { colorPalette } from '@uikits/colors/Color';
import { StyleDivider } from '@uikits/divider/style';
import { UtilsHelper } from '@utils/UtilsHelper';
import {
  ShoppingContainer,
  Content,
  CartList,
  Option,
  ListItem,
  ItemContent,
  Aside,
  PriceDescription,
  ItemContainer,
  ItemOptionContainer,
  ProductOption,
  AsideItemContainer,
} from './style';
import ReactLoading from 'react-loading';

const Invoice = ({
  currentData,
  handleSubmit,
  invoiceValues,
  finalizeInvoice,
  loadingOrder,
}) => {
  console.log(loadingOrder);
  return (
    <ShoppingContainer>
      <Content>
        {currentData.length > 0 && (
          <CartList>
            {currentData.map((item: any, index: number) => {
              return (
                <ItemContainer key={index}>
                  <ItemOptionContainer>
                    <p>{index + 1}</p>
                    <ProductOption>{item.productName}</ProductOption>
                  </ItemOptionContainer>
                  <ItemOptionContainer>
                    <p>{item.count}</p>
                    <p>{UtilsHelper.threeDigitSeparator(item.price)}</p>
                  </ItemOptionContainer>
                  <ItemOptionContainer>
                    {!!item.discount && (
                      <>
                        <p>تخفیف</p>
                        <p>{UtilsHelper.threeDigitSeparator(item.discount)}</p>
                      </>
                    )}
                  </ItemOptionContainer>
                  <ItemOptionContainer>
                    <p>ریال</p>
                  </ItemOptionContainer>
                </ItemContainer>
              );
            })}
          </CartList>
        )}
        {/* {loadingEmpyBox && !loadingPage && (
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
      )} */}
      </Content>
      <Aside>
        <AsideItemContainer>
          <p>قیمت کل</p>
          <p>{UtilsHelper.threeDigitSeparator(invoiceValues.sum)}</p>
        </AsideItemContainer>
        <AsideItemContainer>
          <p>تخفیف</p>
          <p>
            {invoiceValues.discount
              ? UtilsHelper.threeDigitSeparator(invoiceValues.discount)
              : '0'}
          </p>
        </AsideItemContainer>
        <AsideItemContainer>
          <p>مبلغ قابل پرداخت</p>
          <p>{UtilsHelper.threeDigitSeparator(invoiceValues.total)}</p>
        </AsideItemContainer>
        <StyleCustomBtn
          onClick={finalizeInvoice}
          disabled={currentData.length === 0 ? true : false}
          type='button'
          Width={'100%'}
          Height={'51px'}
          style={{ marginTop: '1rem' }}
        >
          {loadingOrder && (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={30}
              width={30}
            />
          )}
          تکمیل خرید
        </StyleCustomBtn>
        {/* </TotalPrice> */}
      </Aside>
    </ShoppingContainer>
  );
};

export default Invoice;
