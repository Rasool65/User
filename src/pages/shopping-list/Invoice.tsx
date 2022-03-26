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
  Loader,
  LoaderContainer,
} from './style';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import useHttpRequest from '@hooks/useHttpRequest';
import { PRODUCTS_WITH_PRICE } from '@config/constantApi';

const Invoice = ({ handleSubmit, finalizeInvoice, loadingOrder }) => {
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [invoiceValues, setInvoiceValues] = useState({
    sum: 0,
    discount: 0,
    total: 0,
  });
  const { getRequest } = useHttpRequest();

  const getInvoiceData = () => {
    getRequest(PRODUCTS_WITH_PRICE).then((result) => {
      let sum = 0;
      let discount = 0;
      const data = result.data;
      data.forEach((item) => {
        sum = item.count * item.price + sum;
        discount = item.count * item.discount + discount;
      });
      setInvoiceValues({
        sum,
        discount,
        total: sum - discount,
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
                    <p>{index + 1}</p>
                    <ProductOption>{item.productName}</ProductOption>
                  </ItemOptionContainer>
                  {item.focIndicator ? (
                    <ItemOptionContainer>
                      <p>اشانتیون</p>
                    </ItemOptionContainer>
                  ) : (
                    <>
                      <ItemOptionContainer>
                        <p>{item.count}</p>
                        <p>{UtilsHelper.threeDigitSeparator(item.price)}</p>
                      </ItemOptionContainer>
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
          disabled={invoiceData.length === 0 ? true : false}
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
