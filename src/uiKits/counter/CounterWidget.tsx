import { useState, useEffect } from 'react';
import { Counter } from './Counter';

import { StyleCartCounter, StyleCounterBtn } from './style';
import { useSelector } from 'react-redux';

const CounterWidget: React.FC<Counter.IProps> = ({
  initial,
  data,
  handleChange,
}) => {
  const [counter, setCounter] = useState<number>(initial);
  const { shoppingListChange } = useSelector(
    (State: any) => State.ShoppingReducer
  );

  const handleCounter = (increase) => {
    if (increase) {
      setCounter(counter + 1);
      handleChange!(counter + 1, data);
    } else {
      if (counter > 1) {
        setCounter(counter - 1);
        handleChange!(counter - 1, data);
      }
    }
  };

  useEffect(() => {
    setCounter(initial);
  }, [initial]);

  return (
    <StyleCartCounter className='countBtn'>
      <StyleCounterBtn onClick={() => handleCounter(true)}>+</StyleCounterBtn>
      <StyleCounterBtn>{counter}</StyleCounterBtn>
      <StyleCounterBtn onClick={() => handleCounter(false)}>-</StyleCounterBtn>
    </StyleCartCounter>
  );
};

export default CounterWidget;
