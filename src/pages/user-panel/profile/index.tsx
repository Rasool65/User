import { useState, useEffect } from 'react';
import { IUser } from '../User';
import { StyleContent } from '../style';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useDispatch } from 'react-redux';
import {
  PageUrlAction,
  TablePaginationAction,
} from '@redux/tablePagination/action';

const UserPage: IUser.IUserPage[] = [
  {
    id: 0,
    Component: ProfileInfo,
  },
  {
    id: 1,
    Component: ChangePassword,
  },
];

const Profile = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<any>({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  function Alert(Props) {
    return <MuiAlert elevation={3} variant='filled' {...Props} />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [CurrentPage, setCurrentPage] = useState<IUser.IUserPage>(UserPage[0]);

  const handleChangePage = (page: number) => {
    setCurrentPage(UserPage[page]);
  };

  const handleChangeSnackbar = (status: boolean) => {
    setOpen(status);
  };

  useEffect(() => {
    dispatch(PageUrlAction(''));
    dispatch(TablePaginationAction(1));
  }, []);

  return (
    <StyleContent>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity='success'>
          رمز عبور با موفقیت تغییر یافت
        </Alert>
      </Snackbar>
      <CurrentPage.Component
        onChagePage={handleChangePage}
        handleSnackbar={handleChangeSnackbar}
      />
    </StyleContent>
  );
};

export default Profile;
