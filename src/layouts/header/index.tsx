import { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import {
  SHOPPING_LIST_URL,
  USER_PANEL,
  CONTACT_US_URL,
  USER_PANEL_MESSAGES,
} from '@config/constantUrl';
import {
  StyleHeaderSection,
  StyleHeaderRight,
  StyleHeaderLeft,
  StyleHeaderLogo,
  StyleSideNave,
  StyleBasketCount,
  StyleHeaderBasket,
  StyleUserBtn,
  StyleUserBtnTitle,
  StyleUserBtnDropDown,
  SideNaveTitle,
  StyleSideNaveBg,
  StyleInfo,
  StyleInfoItem,
  StyleInfoItemText,
  StyleFooterImage,
  StyleFooterLogo,
  StyleFooterTitle,
  StyleSideNaveLeft,
  StyleMessageCount,
  StyleMenuItemMessageCount,
} from './style';
import {
  ABOUT_US_URL,
  AUTH_URL,
  LANDING_URL,
  PRODUCTS_URL,
  QUESTIONS_URL,
} from '@config/constantUrl';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CustomSize } from '@utils/MediaQuery';
import { Container } from '../../style';
import Menu from '@uikits/menu/Menu';
import MenuItem from '@uikits/menu/MenuItem';
import IconWidget from '@uikits/icon/IconWidget';
import ShoppingBagIcon from '@assets/img/icon/Group 7.svg';
import UserIcon from '@assets/img/icon/user (1).svg';
import ChevronDownIcon from '@assets/img/icon/Path 6.svg';
import MenuIcon from '@assets/img/icon/noun_hamburger menu.svg';
import CloseIcon from '@assets/img/icon/close.svg';
import KalehLogo from '@assets/img/brand/Image 1.png';
import { useSelector } from 'react-redux';
import {
  LOGOUT_API,
  MESSAGE_COUNT,
  SETTING_API,
  _TOKEN_NAME,
  _UUID,
} from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import MapIcon from '@assets/img/icon/tabler-map-pin.svg';
import phoneIcon from '@assets/img/icon/tabler-phone.svg';
import EnvelopeIcon from '@assets/img/icon/tabler-mail.svg';
import { BASE_URL } from '@config/urls';
import ShoppingList from '@pages/shopping-list';
import { useDispatch } from 'react-redux';
import { loginPageAction } from '@redux/layout/actions';
import { IMessageSchemaState } from '@redux/message/type';
import { MessageCountAction } from '@redux/message/action';

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.userInfoReducer);
  const { shoppingListCount } = useSelector(
    (state: any) => state.ShoppingReducer
  );
  const { shoppingListChange } = useSelector(
    (State: any) => State.ShoppingReducer
  );

  const [visibility, setVisibility] = useState('hidden');
  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const { getRequest } = useHttpRequest();
  const { innerWidth: width } = window;

  const { setting } = useSelector((state: any) => state.settingReducer);
  const message = useSelector<any, IMessageSchemaState>(
    (state: any) => state.MessageReducer
  );

  const handleClose = () => {
    if (openBasket) {
      setOpenBasket(false);
    } else if (openSideBar) {
      setOpenSideBar(false);
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };
  const handleSideBarBasket = () => {
    setOpenBasket((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const logOut = () => {
    getRequest(LOGOUT_API)
      .then((resp) => {
        return;
      })
      .catch(() => {
        return;
      });
    handleClickAway();

    localStorage.removeItem(_TOKEN_NAME);
    localStorage.removeItem(_UUID);
    dispatch(loginPageAction(true));
    history.push(AUTH_URL);
  };

  const handleGetMessageCount = () => {
    if (
      localStorage.getItem(_TOKEN_NAME) &&
      localStorage.getItem(_TOKEN_NAME) !== undefined &&
      localStorage.getItem(_UUID) &&
      localStorage.getItem(_UUID) !== undefined
    ) {
      getRequest(MESSAGE_COUNT)
        .then((resp) => {
          dispatch(MessageCountAction(resp.data));
          setTimeout(() => handleGetMessageCount(), 10000);
        })
        .catch((errors) => {
          console.log(`message-count-error`, errors);
        });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem(_TOKEN_NAME) &&
      localStorage.getItem(_TOKEN_NAME) !== undefined &&
      localStorage.getItem(_UUID) &&
      localStorage.getItem(_UUID) !== undefined
    ) {
      handleGetMessageCount();
    }
  }, [localStorage.getItem(_TOKEN_NAME), localStorage.getItem(_UUID)]);

  useEffect(() => {
    return;
  }, [shoppingListChange]);

  useMemo(() => {
    setOpenSideBar(false);
    setOpenBasket(false);
  }, [location.pathname]);

  return (
    <Container isHidden={false}>
      <StyleSideNaveBg
        isHidden={openSideBar || openBasket}
        onClick={handleClose}
      />
      <StyleSideNaveLeft isHidden={openBasket}>
        <SideNaveTitle className='title-nav'>
          <div onClick={handleSideBarBasket}>
            <IconWidget
              alt='closeIcon'
              src={CloseIcon}
              width={'17px'}
              height={'17px'}
            />
          </div>
        </SideNaveTitle>
        <ShoppingList />
      </StyleSideNaveLeft>

      <StyleSideNave isHidden={openSideBar}>
        <SideNaveTitle>
          <StyleHeaderLogo
            src={KalehLogo}
            onClick={() => history.push(LANDING_URL)}
          />
          <div onClick={handleClickSideBar}>
            <IconWidget
              alt='closeIcon'
              src={CloseIcon}
              width={'17px'}
              height={'17px'}
            />
          </div>
        </SideNaveTitle>
        <div className='content'>
          <Menu typeItem={'Vertical'}>
            <MenuItem
              title={'صفحه اصلی'}
              onClick={() => history.push(LANDING_URL)}
            />
            <MenuItem
              title={'محصولات'}
              onClick={() => history.push(PRODUCTS_URL)}
            />
            <MenuItem
              title={'سوالات متداول'}
              onClick={() => history.push(QUESTIONS_URL)}
            />
            <MenuItem
              title={'درباره ما'}
              onClick={() => history.push(ABOUT_US_URL)}
            />
            <MenuItem
              title={'تماس با ما'}
              onClick={() => history.push(CONTACT_US_URL)}
            />
          </Menu>

          <div>
            <StyleFooterImage>
              <StyleFooterLogo src={`${BASE_URL}${setting?.image}`} />
              <StyleFooterTitle>{setting?.title}</StyleFooterTitle>
            </StyleFooterImage>
            <StyleInfo>
              <StyleInfoItem>
                <IconWidget alt='map' src={MapIcon} />
                <StyleInfoItemText>{setting?.address}</StyleInfoItemText>
              </StyleInfoItem>

              <StyleInfoItem>
                <IconWidget alt='email' src={EnvelopeIcon} />
                <StyleInfoItemText>{setting?.email}</StyleInfoItemText>
              </StyleInfoItem>

              <StyleInfoItem>
                <IconWidget alt='phone' src={phoneIcon} />
                <StyleInfoItemText>{setting?.phoneNumber}</StyleInfoItemText>
              </StyleInfoItem>
            </StyleInfo>
          </div>
        </div>
      </StyleSideNave>

      <StyleHeaderSection isHidden={location.pathname === AUTH_URL}>
        <StyleHeaderRight>
          <div onClick={handleClickSideBar} className='menuIcon'>
            <IconWidget
              alt='MenuIcon'
              src={MenuIcon}
              width={'25px'}
              height={'23px'}
            />
          </div>
          <StyleHeaderLogo
            src={KalehLogo}
            onClick={() => history.push(LANDING_URL)}
          />
          <Menu typeItem={'Horizontal'}>
            <MenuItem
              title={'صفحه اصلی'}
              onClick={() => history.push(LANDING_URL)}
            />
            <MenuItem
              title={'محصولات'}
              onClick={() => history.push(PRODUCTS_URL)}
            />
            <MenuItem
              title={'سوالات متداول'}
              onClick={() => history.push(QUESTIONS_URL)}
            />
            <MenuItem
              title={'درباره ما'}
              onClick={() => history.push(ABOUT_US_URL)}
            />
            <MenuItem
              title={'تماس با ما'}
              onClick={() => history.push(CONTACT_US_URL)}
            />
          </Menu>
        </StyleHeaderRight>
        <StyleHeaderLeft>
          <StyleHeaderBasket>
            <StyleBasketCount
              visible={
                !!shoppingListCount && shoppingListCount > 0 ? true : false
              }
            >
              {!!shoppingListCount && shoppingListCount > 0
                ? shoppingListCount
                : '0'}
            </StyleBasketCount>
            <div
              onClick={() => {
                innerWidth > CustomSize.mobile
                  ? history.push(SHOPPING_LIST_URL)
                  : handleSideBarBasket();
              }}
            >
              <IconWidget
                alt='shopingBag'
                src={ShoppingBagIcon}
                width={'25px'}
                height={'23px'}
              />
            </div>
          </StyleHeaderBasket>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <StyleUserBtn onClick={handleClick}>
                <StyleUserBtnTitle>
                  <StyleMessageCount isHidden={!message.hasNewMessage}>
                    {message.newMessageCount}
                  </StyleMessageCount>
                  <IconWidget
                    alt='user'
                    src={UserIcon}
                    width={'13px'}
                    height={'16px'}
                  />
                  <p>{!!userInfo ? userInfo.mobile : ''}</p>
                </StyleUserBtnTitle>
                <IconWidget
                  alt='ChevronDown'
                  src={ChevronDownIcon}
                  width={'10px'}
                  height={'6px'}
                />
              </StyleUserBtn>
              {open ? (
                <StyleUserBtnDropDown>
                  <Menu typeItem='Vertical'>
                    <MenuItem title='پیام ها'>
                      <NavLink
                        to={USER_PANEL_MESSAGES}
                        onClick={handleClickAway}
                      >
                        پیام ها
                        <StyleMenuItemMessageCount
                          isHidden={!message.hasNewMessage}
                        >
                          {message.newMessageCount}
                        </StyleMenuItemMessageCount>
                      </NavLink>
                    </MenuItem>
                    <MenuItem title='پروفایل'>
                      <NavLink to={USER_PANEL} onClick={handleClickAway}>
                        پروفایل
                      </NavLink>
                    </MenuItem>
                    <MenuItem title='خروج'>
                      <div onClick={logOut}>خروج</div>
                    </MenuItem>
                  </Menu>
                </StyleUserBtnDropDown>
              ) : undefined}
            </div>
          </ClickAwayListener>
        </StyleHeaderLeft>
      </StyleHeaderSection>
    </Container>
  );
};

export default Header;
