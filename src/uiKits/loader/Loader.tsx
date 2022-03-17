import React from 'react';

import {
  LoadingContainer,
  LoadingItemA,
  LoadingItemB,
  LoadingItemC,
} from './style';

const Loader: React.FC<{ loaderColored?: string }> = ({ loaderColored }) => {
  return (
    <LoadingContainer loaderColored={loaderColored}>
      <LoadingItemA />
      <LoadingItemB />
      <LoadingItemC />
    </LoadingContainer>
  );
};

export default Loader;
