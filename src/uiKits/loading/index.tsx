import { FunctionComponent } from 'react';
import ReactLoading from 'react-loading';
import { StyleLoading } from './style';

export const CustomLoading: FunctionComponent = () => {
  return (
    <>
      <StyleLoading>
        <ReactLoading
          type={'spinningBubbles'}
          color={'#4e4e4e'}
          height={30}
          width={30}
        />
      </StyleLoading>
    </>
  );
};
export default CustomLoading;
