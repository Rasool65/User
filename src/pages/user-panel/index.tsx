import { useState } from 'react';
import { Container } from '../../style';
import {
  StyleUserpanelWrraper,
  StyleSideNaveLeft,
  SideNaveTitle,
  StyleSideNaveBg,
} from './style';
import UserPanelRoutes from './UserPanelRoutes';
import UserPanelSidebar from './UserPanelSidebar';
import MenuIcon from '@assets/img/icon/menu.svg';
import IconWidget from '@uikits/icon/IconWidget';
import CloseIcon from '@assets/img/icon/close.svg';
import { CustomSize } from '@utils/MediaQuery';

const userPanel = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleClickSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <Container isHidden={false}>
      <StyleSideNaveBg isHidden={openSideBar} onClick={handleClickSideBar} />
      <StyleSideNaveLeft isHidden={openSideBar}>
        <SideNaveTitle className='title-nav'>
          <div onClick={handleClickSideBar}>
            <IconWidget
              alt='closeIcon'
              src={CloseIcon}
              width={'17px'}
              height={'17px'}
            />
          </div>
        </SideNaveTitle>

        <UserPanelSidebar handleClick={handleClickSideBar} />
      </StyleSideNaveLeft>
      <StyleUserpanelWrraper>
        {innerWidth > CustomSize.mobile ? (
          <UserPanelSidebar handleClick={handleClickSideBar} />
        ) : (
          ''
        )}
        <UserPanelRoutes>
          <div onClick={handleClickSideBar} className='menuIcon'>
            <IconWidget
              alt='MenuIcon'
              src={MenuIcon}
              width={'25px'}
              height={'23px'}
            />
          </div>
        </UserPanelRoutes>
      </StyleUserpanelWrraper>
    </Container>
  );
};

export default userPanel;
