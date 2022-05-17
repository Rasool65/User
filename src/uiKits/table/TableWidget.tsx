import { TableP } from './Table';
import CheckBox from './CheckBox';
import IconWidget from '@uikits/icon/IconWidget';
import searchIcon from '@assets/img/icon/search-interface-symbol.svg';
import printer from '@assets/img/icon/tabler-printer.svg';
import excel from '@assets/img/icon/excel.svg';

import {
  StyleTable,
  TableContainer,
  StyleHeader,
  StyleDescription,
  StyleSearchBox,
  StyleExportWidget,
  StylePrintWidget,
} from './style';
import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import './datatable.css';
import MenuItem from '@uikits/menu/MenuItem';
import Menu from '@uikits/menu/Menu';

const Tablewidget: React.FC<TableP.IProps> = ({
  data,
  columns,
  title,
  description,
  isSearch,
  isPrint,
  isExport,
  checkbox,
  exportFunction,
  search,
  showLineNumber = true,
  pageNumber = 1,
  pageSize = 1,
  selectHigherRows,
  onChangeSelection,
}) => {
  const [checked, setChecked] = useState(false);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleCheckBox = () => {
    setChecked(!checked);
  };

  const renderTd = (dataRow) => {
    const row = columns.map((item, index) => {
      if (
        item.hiddenInMobile != undefined &&
        item.hiddenInMobile &&
        screenWidth <= 640
      )
        return <></>;
      if (item.options.renderBody) {
        return <Td key={index}>{item.options.renderBody(dataRow, index)}</Td>;
      } else {
        return <Td key={index}>{dataRow[item.name]}</Td>;
      }
    });
    return row;
  };

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  if (checkbox) {
    useEffect(() => {
      setIsCheckAll(false);
      setIsCheck([]);
      const newArray = data.map((item, id) => {
        return { id };
      });
      setList([...list, ...newArray]);
    }, [data]);

    useEffect(() => {
      let selectedData = getSelectedData();
      if (onChangeSelection && selectedData) onChangeSelection(selectedData);
    }, [isCheck]);
  }

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((item) => item.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (id, e) => {
    const isChecked = e.target.checked;
    if (selectHigherRows) {
      if (isChecked) {
        let selectedRows = list.filter((item, index) => index <= id);
        setIsCheck(selectedRows.map((item) => item.id));
      } else {
        let selectedRows = list.filter((item, index) => index < id);
        setIsCheck(selectedRows.map((item) => item.id));
      }
    } else {
      setIsCheck([...isCheck, id]);
      if (!isChecked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    }
  };

  const getSelectedData = () => {
    let selectedData: any[] = [];
    data.map((item, index) => {
      if (isCheck.some((v) => v == index)) selectedData.push(item);
    });
    return selectedData;
  };

  return (
    <>
      <StyleTable>
        {title != undefined || isPrint || isExport || isSearch ? (
          <StyleHeader>
            <h2>{title}</h2>
            <StyleDescription description={description}>
              <p>{description}</p>
              <div style={{ marginLeft: 'auto', display: 'flex' }}>
                <StyleExportWidget isExport={isExport}>
                  <IconWidget
                    onClick={exportFunction}
                    alt='export'
                    src={excel}
                    width={'24px'}
                    height={'24px'}
                  />
                </StyleExportWidget>

                <StylePrintWidget isPrint={isPrint}>
                  <IconWidget
                    alt='printer'
                    src={printer}
                    width={'24px'}
                    height={'24px'}
                  />
                </StylePrintWidget>
              </div>
              <StyleSearchBox isSearch={isSearch}>
                <input placeholder='جستجو' onChange={search} />
                <IconWidget
                  alt='search'
                  src={searchIcon}
                  width={'15px'}
                  height={'15px'}
                />
              </StyleSearchBox>
            </StyleDescription>
          </StyleHeader>
        ) : (
          <></>
        )}
        <TableContainer>
          <Table>
            {checkbox && <col style={{ width: '10px' }} />}
            <Thead>
              <Tr>
                {checkbox && (
                  <Th>
                    <CheckBox
                      handleClick={handleSelectAll}
                      isChecked={isCheckAll}
                      type='checkbox'
                    />
                  </Th>
                )}
                {showLineNumber ? <Th>ردیف</Th> : <></>}
                {columns.map((item, index) => {
                  return <Th key={index}>{item.label}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0
                ? data.map((item, index: number) => {
                    return (
                      <Tr key={index}>
                        {checkbox && (
                          <Th>
                            <CheckBox
                              handleClick={() => {
                                handleClick(index, event);
                              }}
                              isChecked={isCheck.includes(index)}
                              type='checkbox'
                            />
                          </Th>
                        )}
                        {showLineNumber ? (
                          <Td>{(pageNumber - 1) * pageSize + index + 1}</Td>
                        ) : (
                          <></>
                        )}
                        {renderTd(item)}
                      </Tr>
                    );
                  })
                : undefined}
            </Tbody>
          </Table>
        </TableContainer>
      </StyleTable>
    </>
  );
};

export default Tablewidget;
