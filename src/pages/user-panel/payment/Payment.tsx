import Card from '@uikits/card/CardWidget';
import CustomTab from '@uikits/tab/CustomTab';
import { FunctionComponent, useState } from 'react';
import { StyleContent } from '../style';
import { InterimPayment } from './InterimPayment';
import { PayOpenAccounts } from './PayOpenAccounts';

export const Payment: FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('1');

  const handleChangeTab = (tabKey: string) => {
    setActiveTabKey(tabKey);
  };

  return (
    <>
      <StyleContent>
        <Card>
          <CustomTab
            onChangeTab={handleChangeTab}
            tabItems={[
              {
                title: 'پرداخت حساب های باز',
                key: '1',
                component: <PayOpenAccounts loading={activeTabKey == '1'} />,
              },
              {
                title: 'پرداخت علی الحساب',
                key: '2',
                component: <InterimPayment loading={activeTabKey == '2'} />,
              },
            ]}
          />
        </Card>
      </StyleContent>
    </>
  );
};
