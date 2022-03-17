import { useContext } from 'react';
import Card from '@uikits/card/CardWidget';
import { useState, FC } from 'react';
import { FormRow, StyleRow, Notif } from '../style';
import { StyleCustomBtn } from '@uikits/button/style';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import { colorPalette } from '@uikits/colors/Color';
import { IUser } from '../User';
import { userApisAction } from '@redux/userInfo/action';
import { useSelector } from 'react-redux';

const ProfileInfo: FC<IUser.IChangePage> = ({ onChagePage }) => {
  const [changePage, setchangePage] = useState(false);

  const { userInfo } = useSelector((state: any) => state.userInfoReducer);

  return (
    <Card>
      {/* <FormWidget >
                <FormRow>
                    <FormItemWidget
                        lable={'نام'}
                        required={false}
                    >

                        <InputWidget
                            inputProps={{
                                placeholder: 'نام کاربر',
                                name: 'firstName',
                                style: { width: '100%' },
                            }}
                        />
                    </FormItemWidget>
                    <FormItemWidget
                        lable={'نام خانوادگی'}
                        required={false}
                    >

                        <InputWidget
                            inputProps={{
                                placeholder: 'نام خانوادگی کاربر',
                                name: 'lastName',
                                style: { width: '100%' },
                            }}
                        />
                    </FormItemWidget>
                    <FormItemWidget
                        lable={'پست الکترونیکی'}
                        required={false}
                    >

                        <InputWidget
                            inputProps={{
                                placeholder: 'user@email.com',
                                name: 'email',
                                style: { width: '100%' },
                            }}
                        />
                    </FormItemWidget>
                    <FormItemWidget
                        lable={'شماره تماس'}
                        required={false}
                    >

                        <InputWidget
                            inputProps={{
                                placeholder: '09121234567',
                                name: 'mobile',
                                style: { width: '100%' },
                            }}
                        />
                    </FormItemWidget>
                </FormRow>
            </FormWidget> */}
      <Notif>
        <i />
        <p>نام و نام خانوادگی :{userInfo?.fullName}</p>
      </Notif>
      <Notif>
        <i />
        <p>موبایل :{userInfo?.mobile}</p>
      </Notif>
      <Notif>
        <i />
        <p>تلفن :{userInfo?.phone}</p>
      </Notif>
      {/* <Notif>
                <i />
                <p>
                    آیدی :
                    {userInfo?.solicoCustomerId}
                </p>
            </Notif> */}
      <StyleRow>
        <StyleCustomBtn
          onClick={() => onChagePage!(1)}
          style={{
            color: colorPalette.red_650,
            border: '2px solid ' + colorPalette.red_650,
            fontWeight: 'bold',
          }}
          type='button'
          Background={colorPalette.white}
          Width={'168px'}
          Height={'45px'}
        >
          تغییر رمز عبور
        </StyleCustomBtn>
      </StyleRow>
    </Card>
  );
};

export default ProfileInfo;
