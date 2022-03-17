import { Accordion, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { colorPalette } from '@uikits/colors/Color';

export const CustomAccordion = withStyles({
  root: {
    backgroundColor: 'inherit',
    '&$expanded': { margin: 0 },
    boxShadow: 'none',
  },
  expanded: {
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: 'rgba(0,0,0,0)',
    margin: 0,
  },
})(Accordion);
export const CustomAccordionDetails = withStyles({
  root: {
    cursor: 'pointer',
    marign: '2px 5px',
    backgroundColor: colorPalette.gray_30,
  },
})(AccordionDetails);