import { useEffect } from 'react';
import Card from '@uikits/card/CardWidget';
import Bredcrumb from '@uikits/bredcrumb/BredcrumbWidget';
import { StyleContent, StyleTitle, AddressBox, EmptyBox } from './style';
import { useSelector } from 'react-redux';
import EmptyAddress from '@assets/img/icon/address.svg';
import IconWidget from '@uikits/icon/IconWidget';
import { useDispatch } from 'react-redux';
import {
  PageUrlAction,
  TablePaginationAction,
} from '@redux/tablePagination/action';

const UserPanelAddresses = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.userInfoReducer);

  useEffect(() => {
    dispatch(PageUrlAction(''));
    dispatch(TablePaginationAction(1));
  }, []);

  return (
    <StyleContent>
      <Card>
        <StyleTitle> لیست آدرس های شما</StyleTitle>
        {userInfo?.address.length > 0 ? (
          <AddressBox>
            <h5>{userInfo?.fullName}</h5>
            <p>{userInfo?.address}</p>
          </AddressBox>
        ) : (
          <EmptyBox>
            <IconWidget
              alt='EmptyCart'
              src={EmptyAddress}
              width={'59px'}
              height={'59px'}
            />
            <h4>ليست آدرس‌های شما خالی است!</h4>
            <p>می‌توانید برای افزودن آدرس به صفحه پروفایل مراجعه کنید.</p>
          </EmptyBox>
        )}
      </Card>
    </StyleContent>
  );
};

export default UserPanelAddresses;
