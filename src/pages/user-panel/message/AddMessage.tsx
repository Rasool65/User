import { FC, useState } from 'react';
import { IUser } from '../User';
import Card from '@uikits/card/CardWidget';
import InputWidget from '@uikits/input/InputWidget';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { colorPalette } from '@uikits/colors/Color';
import { StyleTitle, NewMessage, StyleTextarea, BtnsRow } from '../style';
import useHttpRequest from '@hooks/useHttpRequest';
import { USER_PANEL_MESSAGE_API } from '@config/constantApi';
import ReactLoading from 'react-loading';
import { Common } from '@pages/Common';
import { CustomSize } from '@utils/MediaQuery';

const initState = {
  title: '',
  content: '',
  file: '',
};

const AddMessages: FC<IUser.IChangePage> = ({
  onChagePage,
  handleSnackbar,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const { postRequest } = useHttpRequest();

  const [values, setValues] = useState(initState);
  const [error, setError] = useState<Common.IErrors>(initState);

  const handleInputChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: Common.IErrors = {};

    if (!id && values?.title.length === 0) {
      errors.title = 'وارد کردن عنوان الزامی است';
    }

    if (values?.content.length === 0) {
      errors.content = 'وارد کردن متن پیام الزامی است';
    }

    if (!(Object.keys(errors).length > 0)) {
      setLoading(true);
      if (!!id) {
        const body = {
          parentMessageId: id,
          content: values.content,
          file: '',
        };

        postRequest(`${USER_PANEL_MESSAGE_API}/replymessage`, body)
          .then((resp) => {
            setLoading(false);
            onChagePage!(2);
            handleSnackbar!(true);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        postRequest(USER_PANEL_MESSAGE_API, values)
          .then((resp) => {
            setLoading(false);
            onChagePage!(0);
            handleSnackbar!(true);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }

    setError(errors);
  };

  return (
    <Card>
      <StyleTitle>پیام جدید</StyleTitle>
      <NewMessage>
        <FormWidget onSubmit={handleSubmit}>
          {!id && (
            <FormItemWidget lable={'عنوان'} required={false}>
              <InputWidget
                error={error.title}
                helperText={error.title}
                inputProps={{
                  placeholder: 'عنوان پیام خود را وارد کنید',
                  name: 'title',
                  value: values.title,
                  onChange: handleInputChange,
                  style: {
                    width: innerWidth > CustomSize.mobile ? '98%' : '94%',
                  },
                }}
              />
            </FormItemWidget>
          )}
          <StyleTextarea>
            <label>متن پیام</label>
            <textarea
              required={true}
              name='content'
              value={values.content}
              onChange={handleInputChange}
              className={!!error.content ? 'border-red' : ''}
            />
            <span className='error'>{error.content}</span>
          </StyleTextarea>
          <BtnsRow>
            <StyleCustomBtn type='submit' Width={'168px'} Height={'45px'}>
              {loading && (
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#ffffff'}
                  height={25}
                  width={25}
                />
              )}
              ارسال پیام
            </StyleCustomBtn>
            <StyleCustomBtn
              onClick={() => onChagePage!(0)}
              style={{
                color: colorPalette.red_650,
                border: '2px solid ' + colorPalette.red_650,
                fontWeight: 'bold',
              }}
              type='button'
              Background={colorPalette.white}
              Width={'121px'}
              Height={'45px'}
            >
              انصراف
            </StyleCustomBtn>
          </BtnsRow>
        </FormWidget>
      </NewMessage>
    </Card>
  );
};

export default AddMessages;
