import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorPalette } from '@uikits/colors/Color';

export const useStyles = makeStyles((theme) =>
  createStyles({
    variantSuccess: { backgroundColor: `${colorPalette.green_650} !important` },
  })
);
