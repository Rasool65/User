import { useState, useMemo, useEffect } from 'react';
import Card from '@uikits/card/CardWidget';
import {
  StyleContent,
  StylePages,
  PriceRow,
  StyleLoading,
  StatusMode,
  EmptyBox,
} from './style';
import Table from '@uikits/table/TableWidget';
import Pagination from '@uikits/pagination/PaginationWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { IUser } from './User';
import { Accepted, Reject } from '@uikits/table/style';
import { useHistory } from 'react-router-dom';
import useHttpRequest from '@hooks/useHttpRequest';
import {
  USER_PANEL_TRANSACTION_API,
  USER_PANEL_UNSETTLED_API,
} from '@config/constantApi';
import { DateHelper } from '@utils/dateHelper';
import { UtilsHelper } from '@utils/UtilsHelper';
import {
  USER_PANEL_PAYMENT_LIST,
  USER_PANEL_TRANSACTION,
} from '@config/constantUrl';
import IconWidget from '@uikits/icon/IconWidget';
import EmptyCart from '@assets/img/icon/shopping-basket@2x.png';
import { colorPalette } from '@uikits/colors/Color';
import ReactLoading from 'react-loading';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  TablePaginationAction,
  PageUrlAction,
} from '@redux/tablePagination/action';

const UserPanelUnsettledAccounts = () => {
  const dispatch = useDispatch();

  const { currentTablePagination } = useSelector(
    (state: any) => state.TablePaginationReducer
  );
  const { currentPageUrl } = useSelector(
    (state: any) => state.TablePaginationReducer
  );

  const { getRequest, deleteRequest } = useHttpRequest();
  const history = useHistory();
  const [myOrders, setMyOrders] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [renderPage, setRenderPage] = useState(false);
  const [isSearch, setIsSearch] = useState('');
  const [loadingText, setLodingText] = useState('درحال بارگذاری...');
  const [loading, setLoading] = useState(false);

  const getOrders = (
    page = 1,
    limit = 5,
    Search = '',
    Sort = '',
    Desc = ''
  ) => {
    setLoading(true);
    getRequest(
      `${USER_PANEL_TRANSACTION_API}?page=${page ? page : 1}&Limit=${
        limit ? limit : 5
      }&Search=${Search ? Search : ''}&Sort=${Sort ? Sort : ''}&Desc=${
        Desc ? Desc : false
      }`
    )
      .then((response) => {
        setLoading(false);
        setPageSize(response.data.pageSize);
        setTotalSize(response.data.totalSize);
        setMyOrders(response.data.items);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getCurrentData = () => {
    setCurrentData(myOrders);
    setRenderPage(true);
  };

  useEffect(() => {
    if (myOrders.length < 0) {
      setLoading(true);
      getOrders();
    }
  }, []);

  useMemo(() => {
    if (myOrders.length > 0) {
      getCurrentData();
    }
  }, [isSearch]);

  useEffect(() => {
    setRenderPage(false);
  }, [isSearch]);

  useMemo(() => {
    if (myOrders.length > 0) {
      getCurrentData();
    }
  }, [myOrders]);

  useMemo(() => {
    getOrders(currentTablePagination);
  }, [currentTablePagination]);

  const renderStatus = (item) => {
    if (item === 1) {
      return (
        <StatusMode colorType='#f74848'>
          <span>لغو شده</span>
        </StatusMode>
      );
    } else if (item === 2) {
      return (
        <StatusMode colorType='#c7c224'>
          <span>در انتظار تایید</span>
        </StatusMode>
      );
    } else if (item === 3) {
      return (
        <StatusMode colorType='#249ac7'>
          <span>تایید شده</span>
        </StatusMode>
      );
    } else if (item === 4) {
      return (
        <StatusMode colorType='#8124c7'>
          <span>در حال ارسال</span>
        </StatusMode>
      );
    } else if (item === 5) {
      return (
        <StatusMode colorType='#3dc724'>
          <span>تحویل داده شده</span>
        </StatusMode>
      );
    } else if (item === 6) {
      return (
        <StatusMode colorType='#ffa331'>
          <span>در سبد خرید</span>
        </StatusMode>
      );
    } else if (item === 7) {
      return (
        <StatusMode colorType='#0de2ce'>
          <span>آماده پرداخت</span>
        </StatusMode>
      );
    }
  };

  const columns = [
    {
      label: 'شماره سند',
      name: 'documentNumber',
      options: {},
    },
    {
      label: 'شماره سفارش',
      name: 'orderNumber',
      options: {},
    },
    {
      label: 'مبلغ',
      name: 'price',
      options: {
        renderBody: (row, index) => {
          return `${
            row?.price === 0 ? '0' : UtilsHelper.threeDigitSeparator(row?.price)
          } ریال`;
        },
      },
    },

    {
      label: ' شماره پیگیری',
      name: 'refId',
      options: {},
    },
    {
      label: 'تاریخ',
      name: 'createDate',
      options: {
        renderBody: (row, index) => {
          return DateHelper.isoDateTopersian(row.dueDate);
        },
      },
    },
  ];

  const changePage = (page) => {
    setCurrentPage(page);
    dispatch(TablePaginationAction(page));
    dispatch(PageUrlAction(USER_PANEL_TRANSACTION));
  };

  useEffect(() => {
    if (currentPageUrl === USER_PANEL_TRANSACTION) {
      changePage(currentTablePagination);
    } else {
      dispatch(TablePaginationAction(1));
      dispatch(PageUrlAction(USER_PANEL_TRANSACTION));
    }
  }, []);

  return (
    <StyleContent>
      <Card>
        {!loading ? (
          <Table
            title={'ليست پرداخت ها'}
            description={
              'پرداخت های شما بعد از تایید نهایی به این لیست اضافه می شوند'
            }
            data={renderPage ? currentData : []}
            columns={columns}
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
        {currentData.length === 0 && !loading && (
          <EmptyBox>
            <IconWidget
              alt='EmptyCart'
              src={EmptyCart}
              width={'57px'}
              height={'57px'}
            />
            <h4>لیست پرداخت های شما خالی است!</h4>
          </EmptyBox>
        )}
        {renderPage && totalSize > PageSize && (
          <StylePages>
            <Pagination
              currentPage={currentTablePagination}
              totalCount={totalSize}
              pageSize={PageSize}
              onPageChange={changePage}
            />
          </StylePages>
        )}
      </Card>
    </StyleContent>
  );
};

export default UserPanelUnsettledAccounts;
