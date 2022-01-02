import Card from '@uikits/card/CardWidget';
import { useState, useMemo } from 'react';
import { StyleContent, StylePages, StyleTitle, StyleRow } from './style';
import Table from '@uikits/table/TableWidget';
import Pagination from '@uikits/pagination/PaginationWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import SwitchWidget from '@uikits/switch/SwitchWidget';
import IconWidget from '@uikits/icon/IconWidget';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import deleteIcon from '@assets/img/icon/tabler-trash.svg';
import editIcon from '@assets/img/icon/tabler-pencil.svg';

const data = [
  {
    name: 'کاربر شماره 1',
    userStatus: false,
    mobile: '09121234567',
    nationalCode: '123456789',
  },
  {
    name: 'کاربر شماره 2',
    userStatus: true,
    mobile: '09121234567',
    nationalCode: '123456789',
  },
];

const UserPanelUsers = () => {
  const PageSize = 2;

  const changeStatus = (user) => {
    user.userStatus = !user.userStatus;
  };

  const columns = [
    {
      label: ' نام و نام خانوادگی',
      name: 'name',
      options: {},
    },
    {
      label: 'وضعیت کاربر',
      name: 'userStatus',
      options: {
        renderBody: (row, index) => {
          return <SwitchWidget onChageStatus={changeStatus} userInfo={row} />;
        },
      },
    },
    {
      label: 'شماره موبایل',
      name: 'mobile',
      options: {},
    },
    {
      label: 'کد ملی',
      name: 'nationalCode',
      options: {},
    },
    {
      label: '',
      name: '',
      options: {
        renderBody: (row, index) => {
          return (
            <div>
              <IconWidget
                alt='edit'
                src={editIcon}
                width={'24px'}
                height={'24px'}
              />
              <IconWidget
                alt='delete'
                src={deleteIcon}
                width={'24px'}
                height={'24px'}
              />
            </div>
          );
        },
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <StyleContent>
      <Card>
        <StyleTitle>درج کاربر</StyleTitle>
        <StyleRow>
          <FormWidget>
            <FormItemWidget lable={'نام و نام خانوادگی'} required={false}>
              <InputWidget
                inputProps={{
                  placeholder: 'نام و نام خانوادگی کاربر مورد نظر را وارد کنید',
                  name: 'fullName',
                  style: { width: '225px' },
                }}
              />
            </FormItemWidget>
            <FormItemWidget lable={'شماره موبایل'} required={false}>
              <InputWidget
                inputProps={{
                  placeholder: 'این فیلد به جای نام کاربری استفاده می‌شود',
                  name: 'mobile',
                  style: { width: '225px' },
                }}
              />
            </FormItemWidget>
            <FormItemWidget lable={'کد ملی'} required={false}>
              <InputWidget
                inputProps={{
                  placeholder: 'کد ملی کاربر',
                  name: 'code',
                  style: { width: '225px' },
                }}
              />
            </FormItemWidget>
          </FormWidget>
        </StyleRow>
        <StyleRow>
          <StyleCustomBtn type='button' Width={'168px'} Height={'45px'}>
            درج کاربر
          </StyleCustomBtn>
        </StyleRow>
      </Card>
      <Card border='1px'>
        <Table title={'ليست کاربرها'} data={currentData} columns={columns} />
        {data.length > 2 ? (
          <StylePages>
            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </StylePages>
        ) : (
          ''
        )}
      </Card>
    </StyleContent>
  );
};

export default UserPanelUsers;
