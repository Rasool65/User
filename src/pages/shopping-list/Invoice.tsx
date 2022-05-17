import { StyleCustomBtn } from '@uikits/button/style';
import { colorPalette } from '@uikits/colors/Color';
import { StyleDivider } from '@uikits/divider/style';
import { UtilsHelper } from '@utils/UtilsHelper';
import {
  ShoppingContainer,
  Content,
  CartList,
  Aside,
  ItemContainer,
  ItemOptionContainer,
  ProductOption,
  AsideItemContainer,
  LoaderContainer,
} from './style';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import useHttpRequest from '@hooks/useHttpRequest';
import { PRODUCTS_WITH_PRICE } from '@config/constantApi';

const Invoice = ({
  handleSubmit,
  handleClickPrevious,
  finalizeInvoice,
  loadingOrder,
}) => {
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [invoiceValues, setInvoiceValues] = useState({
    sum: 0,
    discount: 0,
    total: 0,
    tax: 0,
  });
  const { getRequest } = useHttpRequest();

  const getInvoiceData = () => {
    getRequest(PRODUCTS_WITH_PRICE).then((result) => {
      let discount = 0,
        tax = 0,
        sum = 0;
      const data = result.data;
      data.forEach((item) => {
        sum += item.price;
        discount += item.discount;
        tax += item.tax;
      });
      setInvoiceValues({
        sum,
        discount,
        tax,
        total: sum + tax - discount,
      });
      setInvoiceData(data);
    });
  };

  useEffect(() => {
    getInvoiceData();
  }, []);

  return (
    <ShoppingContainer>
      <Content>
        {invoiceData.length > 0 ? (
          <CartList>
            {invoiceData.map((item: any, index: number) => {
              return (
                <ItemContainer key={index}>
                  <ItemOptionContainer>
                    <span>{index + 1}</span>
                    <StyleDivider
                      Width={'1px'}
                      Height={'5px'}
                      Type={'Vertical'}
                      Background={colorPalette.gray_55}
                    />
                    <ProductOption>{item.productName}</ProductOption>
                    <p>{item.count}</p>
                  </ItemOptionContainer>
                  {item.focIndicator ? (
                    <ItemOptionContainer>
                      <p>اشانتیون</p>
                    </ItemOptionContainer>
                  ) : (
                    <>
                      <ItemOptionContainer>
                        {!!item.discount && (
                          <>
                            <p>تخفیف</p>
                            <p>
                              {UtilsHelper.threeDigitSeparator(item.discount)}
                            </p>
                          </>
                        )}
                      </ItemOptionContainer>
                      <ItemOptionContainer>
                        <p>{UtilsHelper.threeDigitSeparator(item.price)}</p>
                        <p>ریال</p>
                      </ItemOptionContainer>
                    </>
                  )}
                </ItemContainer>
              );
            })}
          </CartList>
        ) : (
          <LoaderContainer>
            <ReactLoading
              type={'spinningBubbles'}
              color={colorPalette.red_650}
              height={60}
              width={60}
            />
          </LoaderContainer>
        )}
      </Content>
      <Aside>
        <AsideItemContainer>
          <p>قیمت کل</p>
          <p>{UtilsHelper.threeDigitSeparator(invoiceValues.sum)}</p>
        </AsideItemContainer>
        <AsideItemContainer>
          <p>مالیات</p>
          <p>
            {invoiceValues.tax
              ? UtilsHelper.threeDigitSeparator(invoiceValues.tax)
              : '0'}
          </p>
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
          disabled={(invoiceData.length === 0 ? true : false) || loadingOrder}
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
        <StyleCustomBtn
          onClick={handleClickPrevious}
          disabled={(invoiceData.length === 0 ? true : false) || loadingOrder}
          type='button'
          Width={'100%'}
          Height={'51px'}
          style={{ marginTop: '1rem', backgroundColor: 'gray' }}
        >
          {loadingOrder && (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={30}
              width={30}
            />
          )}
          بازگشت
        </StyleCustomBtn>
        {/* </TotalPrice> */}
      </Aside>
    </ShoppingContainer>
  );
};

export default Invoice;
