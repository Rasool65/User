import { useState, useEffect } from 'react';
import { IUser } from '../User';
import { StyleContent } from '../style';
import Messages from './Messages';
import AddMessage from './AddMessage';
import Conversation from './conversation';
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
    Component: Messages,
  },
  {
    id: 1,
    Component: AddMessage,
  },
  {
    id: 2,
    Component: Conversation,
  },
];

const Message = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>('');

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

  const handleChangeSnackbar = (status: boolean) => {
    setOpen(status);
  };

  const [CurrentPage, setCurrentPage] = useState<IUser.IUserPage>(UserPage[0]);

  const handleChangePage = (page: number, messageId?: any) => {
    setCurrentPage(UserPage[page]);
    setId(messageId);
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
          عملیات با موفقیت انجام شد
        </Alert>
      </Snackbar>
      <CurrentPage.Component
        onChagePage={handleChangePage}
        handleSnackbar={handleChangeSnackbar}
        id={id}
      />
    </StyleContent>
  );
};

export default Message;
