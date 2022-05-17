import { Box, Tab, Tabs } from '@material-ui/core';
import Loader from '@uikits/loader/Loader';
import Loading from '@uikits/loading';
import { FunctionComponent, useEffect, useState } from 'react';
import { ICustomTabItem } from './ICustomTabItem';
import { ICustomTabProp } from './ICustomTabProp';
import './style.css';

export const CustomTab: FunctionComponent<ICustomTabProp> = (props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<ICustomTabItem>(
    props.tabItems[0]
  );

  const handleChange = (event, newValue) => {
    if (selectedTabIndex == newValue) return;
    setSelectedTabIndex(newValue);
    if (props.onChangeTab) props.onChangeTab(props.tabItems[newValue].key);
  };

  useEffect(() => {
    setSelectedTab(props.tabItems[selectedTabIndex]);
  }, [selectedTabIndex]);

  // useEffect(() => {
  //   if (props.onChangeTab) props.onChangeTab(props.tabItems[0].key);
  // }, []);

  return (
    <>
      <div style={{ flexGrow: 1, width: '100%' }}>
        <Tabs
          value={selectedTabIndex}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs'
        >
          {props.tabItems.map((item) => {
            return <Tab label={item.title} />;
          })}
        </Tabs>

        <Box>
          {props.loading && props.loading == true ? (
            <Loading />
          ) : selectedTab != undefined ? (
            selectedTab.component
          ) : (
            <></>
          )}
        </Box>
      </div>
    </>
  );
};

export default CustomTab;
