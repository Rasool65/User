export class Validation {
  public static isDigit(input): boolean {
    if (typeof input !== 'string') input = input.toString();

    const reg = /^\d+$/;
    const isDigit = input.match(reg);
    if (isDigit) return true;
    else return false;
  }
}

export const validateEmail = (email) => {
  if (email.length === 0) {
    return '';
  } else {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return 'ایمیل صحیح نیست';
    }
  }
  return '';
};
export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 0) {
    return 'وارد کردن این فیلد اجباری است';
  } else {
    const re = /^\d+$/;
    if (!re.test(String(phoneNumber))) {
      return 'شماره تماس صحیح نیست';
    }
  }
  return '';
};
