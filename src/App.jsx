import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Input from './ui/Input';
import Button from './ui/Button';

const H1 = styled.h1`
  font-size: 90px;
  background-color: olive;
  font-weight: 700;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <H1>Hello World</H1>
        <Button>Click me</Button>
        <Input placeholder='Enter value' />
      </div>
    </>
  );
}
