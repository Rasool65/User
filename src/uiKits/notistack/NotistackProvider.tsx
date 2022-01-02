import React from 'react';
import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';

import { useStyles } from './style';
import { Notistack } from './Notistack';

const NotistackProivder: React.FC<Notistack.IProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      hideIconVariant={true}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      classes={{
        variantSuccess: classes.variantSuccess,
      }}
      TransitionComponent={Grow as any}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProivder;
