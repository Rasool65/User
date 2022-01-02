import { LANDING_URL } from '@config/constantUrl';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Container } from 'src/style';
import { TextContainer, UnderConstructionContainer } from './style';
import Banner from '@uikits/banner/BannerWidget';
import underConstructionImg from '@assets/img/UnderConstructions-svg.svg';
const MaintenanceMode = () => {
  const { setting } = useSelector((state: any) => state.settingReducer);
  const history = useHistory();
  useEffect(() => {
    if (!setting.maintenanceMode) {
      history.push(LANDING_URL);
    }
  }, [setting.maintenanceMode]);
  return (
    <Container isHidden={false} style={{ alignItems: 'center' }}>
      <UnderConstructionContainer>
        <TextContainer>
          <h2>سایت در حال بروزرسانی میباشد.</h2>
          <p>لطفا بعدا مراجعه فرمایید</p>
        </TextContainer>
        <Banner
          background={underConstructionImg}
          backgroundSize='contain'
          type={'image'}
          height={'400px'}
          smHeight={'300px'}
          width={'100%'}
        />
      </UnderConstructionContainer>
    </Container>
  );
};
export default MaintenanceMode;
