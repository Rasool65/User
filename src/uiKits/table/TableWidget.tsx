import { Table } from './Table';
import CheckBox from './CheckBox';
import IconWidget from '@uikits/icon/IconWidget';
import searchIcon from '@assets/img/icon/search-interface-symbol.svg';
import printer from '@assets/img/icon/tabler-printer.svg';

import {
  StyleTable,
  TableContainer,
  StyleHeader,
  StyleDescription,
  StyleSearchBox,
} from './style';
import React, { useState, useMemo, useEffect } from 'react';
import { exit } from 'process';

const Tablewidget: React.FC<Table.IProps> = ({
  data,
  columns,
  title,
  description,
  isSearch,
  isPrint,
  checkbox,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckBox = () => {
    setChecked(!checked);
  };

  const renderTd = (dataRow) => {
    const row = columns.map((item, index) => {
      if (item.options.renderBody) {
        return <td key={index}>{item.options.renderBody(dataRow, index)}</td>;
      } else {
        return <td key={index}>{dataRow[item.name]}</td>;
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
    setIsCheck([...isCheck, id]);
    if (!isChecked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <StyleTable>
      <StyleHeader>
        <h2>{title}</h2>
        <StyleDescription description={description} isPrint={isPrint}>
          <p>{description}</p>
          <IconWidget
            alt='printer'
            src={printer}
            width={'24px'}
            height={'24px'}
          />
          <StyleSearchBox isSearch={isSearch}>
            <input placeholder='جستجو' />
            <IconWidget
              alt='search'
              src={searchIcon}
              width={'15px'}
              height={'15px'}
            />
          </StyleSearchBox>
        </StyleDescription>
      </StyleHeader>
      <TableContainer>
        <table>
          <thead>
            <tr>
              {checkbox && (
                <th>
                  <CheckBox
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                    type='checkbox'
                  />
                </th>
              )}
              <th>ردیف</th>
              {columns.map((item, index) => {
                return <th key={index}>{item.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.length > 0
              ? data.map((item, index: number) => {
                  return (
                    <tr key={index}>
                      {checkbox && (
                        <th>
                          <CheckBox
                            handleClick={() => {
                              handleClick(index, event);
                            }}
                            isChecked={isCheck.includes(index)}
                            type='checkbox'
                          />
                        </th>
                      )}
                      <td>{index + 1}</td>
                      {renderTd(item)}
                    </tr>
                  );
                })
              : undefined}
          </tbody>
        </table>
      </TableContainer>
    </StyleTable>
  );
};

export default Tablewidget;
