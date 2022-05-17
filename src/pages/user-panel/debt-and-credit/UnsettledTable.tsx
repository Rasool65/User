import { useState, useEffect, FunctionComponent } from 'react';
import Card from '@uikits/card/CardWidget';
import {
  StyleContent,
  StylePages,
  StyleLoading,
  EmptyBox,
  StyleDivSort,
  StyleIconAscending,
  StyleIconDescending,
  StyleSortMenu,
} from './style';
import Table from '@uikits/table/TableWidget';
import Pagination from '@uikits/pagination/PaginationWidget';
import useHttpRequest from '@hooks/useHttpRequest';
import {
  DEBT_OR_CREDIT_DOWNLOAD_EXCEL_API,
  UNSETTLED_DOWNLOAD_EXCEL_API,
  USER_PANEL_GET_UNSETTLED_CHECK_API,
} from '@config/constantApi';
import sort from '@assets/img/icon/sort-select.svg';
import descendingIcon from '@assets/img/icon/sort-descending.svg';
import ascendingIcon from '@assets/img/icon/sort-ascending.svg';
import { DateHelper } from '@utils/dateHelper';
import { UtilsHelper } from '@utils/UtilsHelper';
import IconWidget from '@uikits/icon/IconWidget';
import EmptyCart from '@assets/img/icon/shopping-basket@2x.png';
import { colorPalette } from '@uikits/colors/Color';
import ReactLoading from 'react-loading';
import { IDebtCreditUnsettledProp } from './IDebtCreditUnsettledProp';
import CustomLoading from '@uikits/loading';
import useFileDownload from '@hooks/useFileDownload';
import { BASE_URL } from '@config/urls';
import { ClickAwayListener } from '@material-ui/core';
export const UnsettledTable: FunctionComponent<IDebtCreditUnsettledProp> = (
  props
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { getRequest } = useHttpRequest();
  const [currentData, setCurrentData] = useState([
    {
      checkNumber: '',
      amount: 0,
      dueDate: '',
    },
  ]);
  const [data, setData] = useState([
    {
      checkNumber: '',
      amount: 0,
      dueDate: '',
    },
  ]);
  const [perPage] = useState<number>(10);
  const [totalSize, setTotalSize] = useState(12);
  const [activeNumber, setActiveNumber] = useState(0);
  const [loading, setLoading] = useState(props.loading);
  const { downloadFile } = useFileDownload();
  const handlePageChange = (page: number) => {
    let startIndex = (page - 1) * perPage;
    setCurrentPage(page);
    setCurrentData(data.slice(startIndex, startIndex + perPage));
  };

  const [key, setKey] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleSortMode = (type: boolean, key: string) => {
    type ? ascending(key) : descending(key);
  };

  const ascending = (key: string) => {
    switch (key) {
      case 'checkNumber':
        return (
          setData(
            data.sort((a, b) => (a.checkNumber > b.checkNumber ? 1 : -1))
          ),
          setCurrentData(data.slice(0, perPage))
        );
      case 'amount':
        return (
          setData(data.sort((a, b) => (a.amount > b.amount ? 1 : -1))),
          setCurrentData(data.slice(0, perPage))
        );
      case 'dueDate':
        return (
          setData(data.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))),
          setCurrentData(data.slice(0, perPage))
        );
    }
  };

  const descending = (key: string) => {
    switch (key) {
      case 'checkNumber':
        return (
          setData(
            data.sort((a, b) => (a.checkNumber < b.checkNumber ? 1 : -1))
          ),
          setCurrentData(data.slice(0, perPage))
        );
      case 'amount':
        return (
          setData(data.sort((a, b) => (a.amount < b.amount ? 1 : -1))),
          setCurrentData(data.slice(0, perPage))
        );
      case 'dueDate':
        return (
          setData(data.sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1))),
          setCurrentData(data.slice(0, perPage))
        );
    }
  };

  const handleDownloadExcel = () => {
    data.length
      ? downloadFile(BASE_URL, `${UNSETTLED_DOWNLOAD_EXCEL_API}`, ``)
      : '';
  };

  const handleSearch = (e: any) => {
    let findData = data.filter((el: any) =>
      el.checkNumber.match(e.currentTarget.value)
    );
    e ? setCurrentData(findData) : setCurrentData(data);
  };
  const getOrders = () => {
    setLoading(true);
    getRequest(
      'http://127.0.0.1:3500/unsettled'
      // `${USER_PANEL_GET_UNSETTLED_CHECK_API}`
    )
      .then((response) => {
        setData(response.data);
        setTotalSize(response.data.length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [ascendingType, setAscendingType] = useState(true); // true ascending
  const handleClickAscending = () => {
    setAscendingType((prev) => !prev);
  };
  const columns = [
    {
      label: 'شماره چک',
      name: 'checkNumber',
      options: {},
    },
    {
      label: 'نام بانک',
      name: 'bankName',
      options: {},
    },

    {
      label: 'تاریخ دریافت',
      name: 'receiveDate',
      options: {
        renderBody: (row, index) => {
          return DateHelper.isoDateTopersian(row.receiveDate);
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

  useEffect(() => {
    data ? setCurrentData(data.slice(0, perPage)) : '';
  }, [data]);

  useEffect(() => {
    handleSortMode(ascendingType, key);
  }, [key, ascendingType]);
  return loading ? (
    <CustomLoading />
  ) : (
    <StyleContent>
      {!loading ? (
        <>
          <div className='sortIcon'>
            <IconWidget
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(!open);
              }}
              alt='sort'
              src={sort}
              width={'24px'}
              height={'24px'}
            />
          </div>
          {open ? (
            <ClickAwayListener onClickAway={() => setOpen(!open)}>
              <StyleDivSort>
                <div className='sortDiv'>
                  <div style={{ display: 'inline-flex' }}>
                    <StyleIconAscending ascending={ascendingType}>
                      <IconWidget
                        onClick={handleClickAscending}
                        alt='ascending'
                        src={ascendingIcon}
                        width={'24px'}
                        height={'24px'}
                      />
                    </StyleIconAscending>
                    <StyleIconDescending descending={ascendingType}>
                      <IconWidget
                        onClick={handleClickAscending}
                        style={{ marginRight: '10px' }}
                        alt='descending'
                        src={descendingIcon}
                        width={'24px'}
                        height={'24px'}
                      />
                    </StyleIconDescending>
                  </div>
                  <hr style={{ border: '1px solid red' }} />
                  <StyleSortMenu active={activeNumber}>
                    <p
                      className='checkNumber'
                      onClick={() => {
                        setKey('checkNumber');
                        setActiveNumber(5);
                        setOpen(false);
                      }}
                    >
                      {' '}
                      شماره چک{' '}
                    </p>
                    <p
                      className='dueDate'
                      onClick={() => {
                        setKey('dueDate');
                        setActiveNumber(1);
                        setOpen(false);
                      }}
                    >
                      {' '}
                      تاریخ سررسید
                    </p>
                    <p
                      className='amount'
                      onClick={() => {
                        setKey('amount');
                        setActiveNumber(3);
                        setOpen(false);
                      }}
                    >
                      مبلغ
                    </p>
                  </StyleSortMenu>
                </div>
              </StyleDivSort>
            </ClickAwayListener>
          ) : (
            ''
          )}
          <Table
            data={currentData}
            columns={columns}
            isSearch={true}
            isExport={true}
            exportFunction={handleDownloadExcel}
            search={handleSearch}
            pageSize={10}
            pageNumber={currentPage}
          />
        </>
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
          <h4>لیست چک های وصول نشده شما خالی است!</h4>
        </EmptyBox>
      )}
      {totalSize > perPage && (
        <StylePages>
          <Pagination
            currentPage={currentPage}
            totalCount={totalSize}
            pageSize={perPage}
            onPageChange={handlePageChange}
          />
        </StylePages>
      )}
    </StyleContent>
  );
};

export default UnsettledTable;
