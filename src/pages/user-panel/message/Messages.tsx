import { useState, useMemo, useEffect, FC } from 'react';
import Pagination from '@uikits/pagination/PaginationWidget';
import Card from '@uikits/card/CardWidget';
import IconWidget from '@uikits/icon/IconWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { colorPalette } from '@uikits/colors/Color';
import {
  StyleMessages,
  StyleTable,
  StyleOptions,
  StylePages,
  MessagesTitle,
  EmptyBox,
} from '../style';
import deleteIcon from '@assets/img/icon/tabler-trash.svg';
import viewIcon from '@assets/img/icon/tabler-eye.svg';
import addIcon from '@assets/img/icon/tabler-minus.svg';
import CheckBox from '@uikits/table/CheckBox';
import { DateHelper } from '@utils/dateHelper';
import { IUser } from '../User';
import useHttpRequest from '@hooks/useHttpRequest';
import { USER_PANEL_MESSAGE_API } from '@config/constantApi';
import ReactLoading from 'react-loading';
import MessageIcon from '@assets/img/icon/messageIcon.png';

const Messages: FC<IUser.IChangePage> = ({ onChagePage, handleSnackbar }) => {
  const { getRequest, deleteRequest } = useHttpRequest();
  const [myMessages, setMyMessages] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [renderPage, setRenderPage] = useState(false);
  const [loadingText, setLodingText] = useState(
    <p className='loading'>درحال بارگزاری...</p>
  );
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState();

  const getMessages = (
    page = 1,
    limit = 5,
    Search = '',
    Sort = '',
    Desc = ''
  ) => {
    getRequest(
      `${USER_PANEL_MESSAGE_API}?page=${page ? page : 1}&Limit=${
        limit ? limit : 5
      }&Search=${Search ? Search : ''}&Sort=${Sort ? Sort : ''}&Desc=${
        Desc ? Desc : false
      }`
    )
      .then((response) => {
        setPageSize(response.data.pageSize);
        setTotalSize(response.data.totalSize);
        setMyMessages(response.data.items);
        if (response.data.items.length === 0) {
          setLodingText(
            <EmptyBox>
              <IconWidget
                alt='EmptyCart'
                src={MessageIcon}
                width={'57px'}
                height={'57px'}
              />
              <h4>لیست پیغام های شما خالی است!</h4>
              <p>می‌توانید برای افزودن پیام به صفحه درج پیام مراجعه کنید.</p>
            </EmptyBox>
          );
        }
      })
      .catch(() => {
        return;
      });
  };

  const getCurrentData = () => {
    setCurrentData(myMessages);
    setRenderPage(true);
  };

  useEffect(() => {
    if (myMessages.length < 0) {
      getMessages();
    }
  }, []);

  useMemo(() => {
    if (myMessages.length > 0) {
      getCurrentData();
    }
  }, [myMessages]);

  useMemo(() => {
    getMessages(currentPage);
  }, [currentPage]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    if (myMessages.length > 0) {
      setIsCheckAll(false);
      setIsCheck([]);
      const newArray = myMessages.map((item, id) => {
        return { id };
      });
      setList([...list, ...newArray]);
    }
  }, [currentData]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((item) => item.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (id, e) => {
    const isChecked = e.target.checked;
    setIsCheck([...isCheck, id]);
    if (!isChecked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const deleteMessage = (id) => {
    setLoading(true);
    deleteRequest(`${USER_PANEL_MESSAGE_API}/${id}`)
      .then((resp) => {
        onChagePage!(0);
        handleSnackbar!(true);
        setLoading(false);
        setRenderPage(false);
        getMessages();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Card>
      <StyleMessages>
        <MessagesTitle>
          <h4>ليست پیغام‌های شما</h4>
          <StyleCustomBtn
            onClick={() => onChagePage!(1)}
            type='button'
            Width={'144px'}
            Height={'44px'}
            Background={colorPalette.green_300}
          >
            <IconWidget
              alt='add'
              src={addIcon}
              width={'24px'}
              height={'24px'}
            />
            درج پیام جدید
          </StyleCustomBtn>
        </MessagesTitle>
        <StyleTable>
          <table>
            <thead>
              <tr>
                {/* <th>
                                    <CheckBox
                                        handleClick={handleSelectAll}
                                        isChecked={isCheckAll}
                                        type='checkbox' />
                                </th> */}
                <th>نام ادمین</th>
                <th>نام مشتری</th>
                <th>عنوان</th>
                <th>تاریخ ارسال</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {renderPage &&
                currentData.map((item: any, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                                        <CheckBox
                                            handleClick={() => { handleClick(index, event); }}
                                            isChecked={isCheck.includes(index)}
                                            type='checkbox' />
                                    </td> */}
                      <td>{item.userName}</td>
                      <td>{item.customerName}</td>
                      <td>{item.title}</td>
                      <td>{DateHelper.isoDateTopersian(item.sendDate)}</td>
                      <td
                        onClick={() => {
                          setMessageId(item.id);
                        }}
                      >
                        <StyleOptions>
                          <div onClick={() => onChagePage!(2, item.messageId)}>
                            <IconWidget
                              alt='view'
                              src={viewIcon}
                              width={'24px'}
                              height={'24px'}
                            />
                          </div>
                          {loading && messageId === item.id ? (
                            <div>
                              <ReactLoading
                                type={'spinningBubbles'}
                                color={colorPalette.red_650}
                                height={25}
                                width={25}
                              />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                deleteMessage(item.id);
                              }}
                            >
                              <IconWidget
                                alt='delete'
                                src={deleteIcon}
                                width={'24px'}
                                height={'24px'}
                              />
                            </div>
                          )}
                        </StyleOptions>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {!renderPage && loadingText}
        </StyleTable>
        {renderPage && totalSize > PageSize && (
          <StylePages>
            <Pagination
              currentPage={currentPage}
              totalCount={totalSize}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </StylePages>
        )}
      </StyleMessages>
    </Card>
  );
};

export default Messages;
