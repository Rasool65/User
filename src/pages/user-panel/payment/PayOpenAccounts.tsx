import { USER_PANEL_GET_DEBT_OR_CREDIT_API } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import Table from '@uikits/table/TableWidget';
import { colorPalette } from '@uikits/colors/Color';
import IconWidget from '@uikits/icon/IconWidget';
import { CustomLoading } from '@uikits/loading';
import { DateHelper } from '@utils/dateHelper';
import { UtilsHelper } from '@utils/UtilsHelper';
import { FunctionComponent, useEffect, useState } from 'react';
import { StyleContent, StylePages, StyleLoading, EmptyBox } from './style';
import IPayOpenAccountsProp from './IPayOpenAccountsProp';
import ReactLoading from 'react-loading';
import Pagination from '@uikits/pagination/PaginationWidget';
import EmptyCart from '@assets/img/icon/shopping-basket@2x.png';
import { BtnsRow, FormRow, LabelRow } from '../style';
import { StyleCustomBtn } from '@uikits/button/style';
import Num2persian from 'num2persian';
import { StyleNumber, StylePrice } from '../debt-and-credit/style';

export const PayOpenAccounts: FunctionComponent<IPayOpenAccountsProp> = (
  props
) => {
  const { getRequest } = useHttpRequest();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(props.loading);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleSelectionChange = (data: any) => {
    let sumAmount = 0;
    data.map((item) => {
      sumAmount = sumAmount + item.amount;
    });
    setTotalAmount(sumAmount);
  };

  const getOrders = () => {
    setLoading(true);
    getRequest(`${USER_PANEL_GET_DEBT_OR_CREDIT_API}?IsDebtor=true`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      label: 'شماره سند',
      name: 'documentNumber',
      options: {},
    },
    {
      label: 'نوع سند',
      name: 'documentTypeTitle',
      options: {},
    },
    {
      label: 'گروه اعتباری',
      name: 'creditGroupTitle',
      options: {},
    },
    {
      label: 'شماره مرجع',
      name: 'paymentRef',
      options: {},
    },
    {
      label: 'تاریخ ایجاد',
      name: 'postingDate',
      options: {
        renderBody: (row, index) => {
          return DateHelper.isoDateTopersian(row.postingDate);
        },
      },
    },
    {
      label: 'تاریخ سررسید',
      name: 'dueDate',
      options: {
        renderBody: (row, index) => {
          return DateHelper.isoDateTopersian(row.dueDate);
        },
      },
    },
    {
      label: 'مهلت باقیمانده',
      name: 'arrearsAfterNetDueDate',
      options: {
        renderBody: (row, index) => {
          return <StyleNumber>{`${row?.arrearsAfterNetDueDate}`}</StyleNumber>;
        },
      },
    },
    {
      label: 'مبلغ (ریال)',
      name: 'amount',
      options: {
        renderBody: (row, index) => {
          return `${
            row?.amount === null
              ? '0'
              : UtilsHelper.threeDigitSeparator(row?.amount)
          }`;
        },
      },
    },
  ];

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <CustomLoading />
  ) : (
    <StyleContent>
      {!loading ? (
        <Table
          checkbox={true}
          data={data}
          columns={columns}
          showLineNumber={false}
          selectHigherRows={true}
          onChangeSelection={handleSelectionChange}
        />
      ) : (
        <StyleLoading>
          <ReactLoading
            type={'spinningBubbles'}
            color={colorPalette.red_650}
            height={60}
            width={60}
          />
        </StyleLoading>
      )}
      {data.length === 0 && !loading && (
        <EmptyBox>
          <IconWidget
            alt='EmptyCart'
            src={EmptyCart}
            width={'57px'}
            height={'57px'}
          />
          <h4>لیست بدهی های شما خالی است!</h4>
        </EmptyBox>
      )}

      <LabelRow>
        <label>جمع کل : </label>
        <label>
          <b>{UtilsHelper.threeDigitSeparator(totalAmount)}</b>
        </label>
        {totalAmount > 0 ? <label>ریال</label> : <></>}
      </LabelRow>
      <LabelRow>
        <label>جمع کل به حروف : </label>
        <label style={{ marginLeft: '1px' }}>
          {totalAmount > 0 ? Num2persian(totalAmount) + ' ریال' : ''}{' '}
        </label>
      </LabelRow>
      <BtnsRow>
        <StyleCustomBtn type='submit' Width={'160px'} Height={'42px'}>
          {/* {httpLoading && (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={25}
              width={25}
            />
          )} */}
          پرداخت آنلاین
        </StyleCustomBtn>
      </BtnsRow>
    </StyleContent>
  );
};
