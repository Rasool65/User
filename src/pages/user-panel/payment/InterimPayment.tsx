import useHttpRequest from '@hooks/useHttpRequest';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import SelectWidget from '@uikits/select';
import { CustomLoading } from '@uikits/loading';
import { CustomSize } from '@utils/MediaQuery';
import { FunctionComponent, useEffect, useState } from 'react';
import { BtnsRow, FormRow, FormRowPass } from '../style';
import IInterimPaymentProp from './IInterimPaymentProp';
import { StyleCustomBtn } from '@uikits/button/style';
import ReactLoading from 'react-loading';
import useFrom from '@hooks/useFrom';
import CustomInput from '@uikits/customInput';
import { USER_PANEL_GET_CREDIT_GROUP_API } from '@config/constantApi';

const initState = {
  amount: '',
  creditGroup: '',
};

export const InterimPayment: FunctionComponent<IInterimPaymentProp> = (
  props
) => {
  const [loading, setloading] = useState<boolean>(props.loading);
  const [httpLoading, setHttpLoading] = useState<boolean>(false);
  const [creditGroup, setCreditGroup] = useState<any[]>([]);
  const [selectedCreditGroup, setselectedCreditGroup] = useState<any>();
  const httpRequest = useHttpRequest();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('amount' in fieldValues)
      temp.amount =
        fieldValues.amount.length !== 0 ? '' : 'وارد کردن مبلغ الزامی است';
    // if ('creditGroup' in fieldValues)
    //   temp.creditGroup =
    //     fieldValues.creditGroup.length !== 0
    //       ? ''
    //       : 'وارد کردن این فیلد الزامی است';

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFrom(initState, true, validate);

  useEffect(() => {
    if (loading) {
      httpRequest.getRequest(USER_PANEL_GET_CREDIT_GROUP_API).then((result) => {
        let list: any[] = [];
        result.data.map((item) => {
          list.push({ value: item.id, txt: item.title });
        });
        setCreditGroup(list);
        if (list.length > 0) setselectedCreditGroup(list[0].value);
        setloading(false);
      });
    }
  }, [loading]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate() && !httpLoading) {
      setHttpLoading(true);
    }
  };

  return loading ? (
    <CustomLoading />
  ) : (
    <>
      <FormWidget onSubmit={handleSubmit}>
        <FormRow>
          <FormItemWidget lable='مبلغ (ریال)'>
            <CustomInput
              name='amount'
              type='money'
              maxLength={15}
              error={errors.amount}
              helperText={errors.amount}
              placeholder='مبلغ پرداختی'
              onChange={handleInputChange}
              style={{
                width: innerWidth > CustomSize.mobile ? 'calc(100% - 20px)' : '100%',
              }}
            />
          </FormItemWidget>
        </FormRow>
        <FormRow>
          <FormItemWidget lable='گروه اعتباری'>
            <SelectWidget
              optionList={creditGroup}
              value={selectedCreditGroup}
              onChange={(e) => {
                setselectedCreditGroup(e.target.value);
              }}
            />
          </FormItemWidget>
        </FormRow>
        <BtnsRow>
          <StyleCustomBtn type='submit' Width={'160px'} Height={'42px'}>
            {httpLoading && (
              <ReactLoading
                type={'spinningBubbles'}
                color={'#ffffff'}
                height={25}
                width={25}
              />
            )}
            پرداخت آنلاین
          </StyleCustomBtn>
        </BtnsRow>
      </FormWidget>
    </>
  );
};
