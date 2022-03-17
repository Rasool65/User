import { Select, MenuItem, InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { colorPalette } from '@uikits/colors/Color';
import { StyleFormItemErrMsg, StyleContainer } from './../input/style';
import { SelectContainer } from './style';

const CustomInput = withStyles(() => ({
  input: {
    position: 'relative',
    fontSize: 16,
    padding: '13px 12px 13.7px 26px !important',
    color: `${colorPalette.gray_300}`,
    backgroundColor: 'inherit',
    border: `1px solid ${colorPalette.gray_200}`,
    borderRadius: '4px',
    caretColor: `${colorPalette.gray_300}`,
  },
}))(InputBase);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& svg': {
      right: 'auto',
      left: 0,
      paddingLeft: 10,
    },
  },
}));
function SelectWidget(props) {
  const classes = useStyles();
  const { optionList, onChange, value, name, helperText } = props;
  return (
    <SelectContainer>
      <Select
        className={classes.root}
        name={name}
        value={value}
        onChange={onChange}
        input={<CustomInput />}
      >
        {optionList &&
          optionList.map((o, index) => (
            <MenuItem value={o.value} key={index}>
              {o.txt}
            </MenuItem>
          ))}
      </Select>
      <StyleFormItemErrMsg>{helperText}</StyleFormItemErrMsg>
    </SelectContainer>
  );
}

export default SelectWidget;
