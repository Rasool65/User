import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@uikits/card/CardWidget';
import {
  StyleContent,
  StylePages,
  Message,
  Loading,
  StatusMode,
  EmptyBox,
  StyleLoading,
} from './style';
import Table from '@uikits/table/TableWidget';
import Pagination from '@uikits/pagination/PaginationWidget';
import { IUser } from './User';
import { Accepted, Reject, Pending } from '@uikits/table/style';
import useHttpRequest from '@hooks/useHttpRequest';
import { USER_PANEL_ORDER_API } from '@config/constantApi';
import { DateHelper } from '@utils/dateHelper';
import { UtilsHelper } from '@utils/UtilsHelper';
import IconWidget from '@uikits/icon/IconWidget';
import EmptyCart from '@assets/img/icon/shopping-basket@2x.png';
import { useSelector } from 'react-redux';
import {
  USER_PANEL_DASHBOARD,
  USER_PANEL_PAYMENT_LIST,
} from '@config/constantUrl';
import ReactLoading from 'react-loading';
import { colorPalette } from '@uikits/colors/Color';
import { useDispatch } from 'react-redux';
import {
  TablePaginationAction,
  PageUrlAction,
} from '@redux/tablePagination/action';

const UserPanelDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.userInfoReducer);

  const { currentTablePagination } = useSelector(
    (state: any) => state.TablePaginationReducer
  );
  const { currentPageUrl } = useSelector(
    (state: any) => state.TablePaginationReducer
  );

  const crdit =
    userInfo?.creditLimit === 0
      ? ' 0 '
      : UtilsHelper.threeDigitSeparator(userInfo?.creditLimit);
  const crditUsed =
    userInfo?.creditExposure === 0
      ? ' 0 '
      : UtilsHelper.threeDigitSeparator(userInfo?.creditExposure);

  const history = useHistory();
  const { getRequest, deleteRequest } = useHttpRequest();

  const [loading, setLoading] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [renderPage, setRenderPage] = useState(false);
  const [isSearch, setIsSearch] = useState('');
  const [loadingText, setLodingText] = useState('درحال بارگذاری...');

  const getOrders = (
    page = 1,
    limit = 5,
    Search = '',
    Sort = '',
    Desc = ''
  ) => {
    setLoading(true);
    getRequest(
      `${USER_PANEL_ORDER_API}?page=${page ? page : 1}&Limit=${
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
    // {
    //     label: 'شماره مشتری',
    //     name: 'quotationNumber',
    //     options: {}
    // },
    {
      label: 'شماره سفارش',
      name: 'orderNumber',
      options: {},
    },
    // {
    //     label: 'تحویل گیرنده',
    //     name: 'deliveryName',
    //     options: {}
    // },
    {
      label: 'قیمت نهایی',
      name: 'finalAmount',
      options: {
        renderBody: (row, index) => {
          return `${UtilsHelper.threeDigitSeparator(row?.finalAmount)} ریال`;
        },
      },
    },
    {
      label: 'موفقیت آمیز',
      name: 'isSuccess',
      options: {
        renderBody: (row, index) => {
          switch (row.isSuccess) {
            case true:
              return <Accepted>بله</Accepted>;
            case false:
              return <Reject>خیر</Reject>;
            default:
              return <Reject>خیر</Reject>;
          }
        },
      },
    },
    {
      label: 'وضعیت',
      name: 'orderStatus',
      options: {
        renderBody: (row, index) => {
          return renderStatus(row.orderStatus);
        },
      },
    },
    {
      label: 'تاریخ',
      name: 'createDate',
      options: {
        renderBody: (row, index) => {
          return DateHelper.isoDateTopersian(row.createDate);
        },
      },
    },
    {
      label: '',
      name: '',
      options: {
        renderBody: (row, index) => {
          return (
            <button
              onClick={() =>
                history.push(`${USER_PANEL_PAYMENT_LIST}/${row.id}`)
              }
            >
              جزییات سفارش
            </button>
          );
        },
      },
    },
  ];

  const changePage = (page) => {
    setCurrentPage(page);
    dispatch(TablePaginationAction(page));
    dispatch(PageUrlAction(USER_PANEL_DASHBOARD));
  };

  useEffect(() => {
    if (currentPageUrl === USER_PANEL_DASHBOARD) {
      changePage(currentTablePagination);
    } else {
      dispatch(TablePaginationAction(1));
      dispatch(PageUrlAction(USER_PANEL_DASHBOARD));
    }
  }, []);

  return (
    <StyleContent>
      <Card>
        <Message>
          کاربر گرامی میزان اعتبار شما
          <span style={{ padding: '0px 4px' }}>{crdit}</span>
          ريال می‌باشد، میزان اعتبار مصرفی
          <span style={{ padding: '0px 4px' }}> {crditUsed}</span>
          ريال می‌باشد.
        </Message>
      </Card>
      <Card>
        {!loading ? (
          <Table
            title={'ليست سفارش‌های جاری'}
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
            <h4>لیست سفارشات شما خالی است!</h4>
            <p>
              می‌توانید برای مشاهده محصولات بیشتر به صفحه محصولات مراجعه کنید.
            </p>
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

export default UserPanelDashboard;
