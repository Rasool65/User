import Card from '@uikits/card/CardWidget';
import { FunctionComponent, useState } from 'react';
import { FormRow, StyleContent } from '../style';
import CustomTab from '@uikits/tab/CustomTab';
import DebtTable from './DebtTable';
import CreditTable from './CreditTable';
import UnsettledTable from './UnsettledTable';
import ButtonWidget from '@uikits/button/ButtonWidget';
import ReactLoading from 'react-loading';

export const DebtAndCreditList: FunctionComponent = () => {
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
                title: 'لیست بدهکاری',
                key: '1',
                component: <DebtTable loading={activeTabKey == '1'} />,
              },
              {
                title: 'لیست بستانکاری',
                key: '2',
                component: <CreditTable loading={activeTabKey == '2'} />,
              },
              {
                title: 'چک های وصول نشده',
                key: '3',
                component: <UnsettledTable loading={activeTabKey == '3'} />,
              },
            ]}
          />
        </Card>
      </StyleContent>
    </>
  );
};
