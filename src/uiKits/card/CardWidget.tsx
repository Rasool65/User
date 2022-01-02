import { CardSection } from './style';

const Card = (props) => {
  const { children, color, border } = props;
  return (
    <CardSection color={color} border={border}>
      {children}
    </CardSection>
  );
};
export default Card;
