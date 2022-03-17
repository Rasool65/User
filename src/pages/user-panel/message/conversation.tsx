import { FC, useState, useEffect, useMemo } from 'react';
import { IUser } from '../User';
import Card from '@uikits/card/CardWidget';
import InputWidget from '@uikits/input/InputWidget';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { colorPalette } from '@uikits/colors/Color';
import {
  StyleTitle,
  NewMessage,
  StyleTextarea,
  BtnsRow,
  StyleConversation,
  StyleAnswer,
  StyleQuestion,
} from '../style';
import useHttpRequest from '@hooks/useHttpRequest';
import { MESSAGE_COUNT, USER_PANEL_MESSAGE_API } from '@config/constantApi';
import ReactLoading from 'react-loading';
import { Common } from '@pages/Common';
import { useDispatch } from 'react-redux';
import { MessageCountAction } from '@redux/message/action';
import { DateHelper } from '@utils/dateHelper';

const initState = {
  title: '',
  content: '',
  file: '',
};

const AddMessages: FC<IUser.IChangePage> = ({ onChagePage, id }) => {
  const { getRequest } = useHttpRequest();
  const [loadData, setLoadData] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const dispatch = useDispatch();

  const handleGetMessageCount = () => {
    getRequest(MESSAGE_COUNT)
      .then((resp) => {
        dispatch(MessageCountAction(resp.data));
      })
      .catch((errors) => {
        console.log(`message-count-error`, errors);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!!id) {
      getRequest(`${USER_PANEL_MESSAGE_API}/${id}/conversation`)
        .then((resp) => {
          setCurrentData(resp.data);
          setLoadData(true);
          handleGetMessageCount();
        })
        .catch(() => {
          setLoadData(false);
        });
    }
  }, [id]);

  return (
    <Card>
      <StyleTitle>ليست پیغام‌های شما</StyleTitle>
      <StyleConversation>
        <ul>
          {currentData.length > 0 &&
            loadData &&
            currentData.map((item: any, index) => {
              if (item.isAdmin === true) {
                console.log(item);
                return (
                  <StyleAnswer key={index}>
                    <p>{item.content}</p>
                    <span>
                      {DateHelper.isoDateToPersianDateTime(item.sendDate)}
                    </span>
                  </StyleAnswer>
                );
              } else if (item.isAdmin === false) {
                return (
                  <StyleQuestion key={index}>
                    <p>{item.content}</p>
                    <span>
                      {DateHelper.isoDateToPersianDateTime(item.sendDate)}
                    </span>
                  </StyleQuestion>
                );
              }
            })}
        </ul>
        <BtnsRow>
          <StyleCustomBtn
            type='submit'
            Width={'168px'}
            Height={'45px'}
            onClick={() => onChagePage!(1, id)}
          >
            ارسال پیام
          </StyleCustomBtn>
          <StyleCustomBtn
            onClick={() => onChagePage!(0)}
            style={{
              color: colorPalette.red_650,
              border: '2px solid ' + colorPalette.red_650,
              fontWeight: 'bold',
            }}
            type='button'
            Background={colorPalette.white}
            Width={'121px'}
            Height={'45px'}
          >
            انصراف
          </StyleCustomBtn>
        </BtnsRow>
      </StyleConversation>
    </Card>
  );
};

export default AddMessages;
