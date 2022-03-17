import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@uikits/card/CardWidget';
import { colorPalette } from '@uikits/colors/Color';
import profile from '@assets/img/man.svg';
import IconWidget from '@uikits/icon/IconWidget';
import Collapse from '@uikits/collapse/CollapseWidget';
import lock from '@assets/img/icon/padlock.svg';
import exit from '@assets/img/icon/logout.svg';
import {
  USER_PANEL_DASHBOARD,
  USER_PANEL_OPEN_ORDERS,
  USER_PANEL_PAST_ORDERS,
  USER_PANEL_ADDRESSES,
  USER_PANEL_MESSAGES,
  USER_PANEL_PROFILE,
  USER_PANEL_PAYMENT_LIST,
  USER_PANEL_UNSETTLED_ACCOUNTS,
  USER_PANEL_USERS_LIST,
  AUTH_URL,
  USER_PANEL_TRANSACTION,
} from '@config/constantUrl';
import {
  StyleSidebar,
  SidebarHeader,
  ProfileImg,
  ProfileName,
  StyleBtns,
  StyleItem,
  StyleMenu,
  StyleMenuItem,
  SubMenu,
  SubMenuItem,
  Bullet,
} from './style';
import { useSelector } from 'react-redux';
import { UtilsHelper } from '@utils/UtilsHelper';
import { useDispatch } from 'react-redux';
import { loginPageAction } from '@redux/layout/actions';
import { LOGOUT_API, _TOKEN_NAME, _UUID } from '@config/constantApi';
import { CustomSize } from '@utils/MediaQuery';
import useHttpRequest from '@hooks/useHttpRequest';

export const menuItems = [
  {
    id: 0,
    parentId: undefined,
    title: 'داشبورد',
    link: USER_PANEL_DASHBOARD,
    children: [],
  },
  {
    id: 1,
    parentId: undefined,
    title: 'سفارش های من',
    link: '',
    children: [
      {
        id: 10,
        parentId: 1,
        title: 'سفارش های باز',
        link: USER_PANEL_OPEN_ORDERS,
      },
      {
        id: 11,
        parentId: 1,
        title: 'سفارش گذشته',
        link: USER_PANEL_PAST_ORDERS,
      },
    ],
  },
  {
    id: 2,
    parentId: undefined,
    title: 'پروفایل',
    link: USER_PANEL_PROFILE,
    children: [],
  },
  {
    id: 3,
    parentId: undefined,
    title: 'نشانی ها',
    link: USER_PANEL_ADDRESSES,
    children: [],
  },
  {
    id: 4,
    parentId: undefined,
    title: 'مدیریت مالی',
    link: '',
    children: [
      {
        id: 40,
        parentId: 4,
        title: 'لیست حساب های تسویه نشده',
        link: USER_PANEL_UNSETTLED_ACCOUNTS,
      },
      {
        id: 41,
        parentId: 4,
        title: 'لیست پرداخت ها',
        link: USER_PANEL_TRANSACTION,
      },
    ],
  },
  // {
  //     'id': 5,
  //     'parentId': undefined,
  //     'title': 'لیست کاربر ها',
  //     'link': USER_PANEL_USERS_LIST,
  //     'children': [],
  // },
  {
    id: 6,
    parentId: undefined,
    title: 'پیغام ها',
    link: USER_PANEL_MESSAGES,
    children: [],
  },
];

const UserPanelSidebar = ({ handleClick }) => {
  const location = useLocation();
  const history = useHistory();
  const [listItem, setListItem] = useState<any>([]);
  const dispatch = useDispatch();
  const { getRequest } = useHttpRequest();

  const { userInfo } = useSelector((state: any) => state.userInfoReducer);
  const crdit =
    userInfo?.creditLimit - userInfo?.creditExposure === 0
      ? ' 0 '
      : UtilsHelper.threeDigitSeparator(
          userInfo?.creditLimit - userInfo?.creditExposure
        );

  const handleCollaps = (collapseId) => {
    if (listItem.length > 0) {
      listItem.map((item, index) => {
        if (item.id === collapseId) {
          return item.open;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  };

  const logOut = () => {
    getRequest(LOGOUT_API)
      .then((resp) => {
        return;
      })
      .catch(() => {
        return;
      });
    localStorage.removeItem(_TOKEN_NAME);
    localStorage.removeItem(_UUID);
    dispatch(loginPageAction(true));
    history.push(AUTH_URL);
  };

  useEffect(() => {
    setListItem([]);
    const newArray = menuItems.map((item, id) => {
      if (item.children?.length > 0) {
        const open = item.children.some((child) => {
          return location.pathname === child.link;
        })
          ? true
          : false;
        return { id, open };
      } else {
        return { id, open: false };
      }
    });
    setListItem([...newArray]);
  }, [location.pathname]);
  return (
    <StyleSidebar>
      <Card color={colorPalette.red_650}>
        <SidebarHeader>
          <ProfileImg>
            <img src={profile} />
          </ProfileImg>
          <ProfileName>
            <h6>{userInfo?.mobile}</h6>
            <p>
              <span>اعتبار:</span>
              <span>{crdit}</span>
              <span>ریال</span>
            </p>
          </ProfileName>
        </SidebarHeader>
        <StyleBtns>
          <StyleItem
            className='password'
            onClick={() => {
              history.push(USER_PANEL_PROFILE);
              if (innerWidth <= CustomSize.mobile) return handleClick();
            }}
          >
            <p>تغییر رمز</p>
            <IconWidget alt='lock' src={lock} width={'10px'} height={'13px'} />
          </StyleItem>
          <StyleItem onClick={logOut}>
            <p>خروج از حساب</p>
            <IconWidget alt='exit' src={exit} width={'15px'} height={'14px'} />
          </StyleItem>
        </StyleBtns>
        <StyleMenu>
          {menuItems.map((_item, _index: number) => {
            return (
              <StyleMenuItem
                key={_index}
                isActive={
                  location.pathname === _item.link ||
                  _item.children.some((child) => {
                    return location.pathname === child.link;
                  })
                }
              >
                {_item.children?.length > 0 ? (
                  <Collapse
                    id={_item.id}
                    title={_item.title}
                    menu={true}
                    isOpen={
                      listItem.length > 0
                        ? listItem.find((item) => {
                            return item.id === _index;
                          })['open']
                        : false
                    }
                  >
                    <ul>
                      {_item.children.map((item, idx: number) => {
                        return (
                          <SubMenuItem
                            isActive={location.pathname === item.link}
                            key={idx}
                          >
                            <Bullet />
                            <NavLink
                              to={item.link ? item.link : ''}
                              style={{ paddingBottom: '2px' }}
                            >
                              <p
                                onClick={() => {
                                  if (innerWidth <= CustomSize.mobile)
                                    return handleClick();
                                }}
                              >
                                {item.title}
                              </p>
                            </NavLink>
                          </SubMenuItem>
                        );
                      })}
                    </ul>
                  </Collapse>
                ) : (
                  <NavLink
                    to={_item.link ? _item.link : ''}
                    onClick={() => {
                      if (innerWidth <= CustomSize.mobile) return handleClick();
                    }}
                  >
                    {_item.title}
                  </NavLink>
                )}
              </StyleMenuItem>
            );
          })}
        </StyleMenu>
      </Card>
    </StyleSidebar>
  );
};

export default UserPanelSidebar;
