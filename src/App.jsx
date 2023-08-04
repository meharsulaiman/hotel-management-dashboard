import React from 'react';
import GlobalStyles from './styles/GlobalStyles';

import Input from './ui/Input';
import Button from './ui/Button';
import Heading from './ui/Heading';
import styled from 'styled-components';
import Row from './ui/Row';

const StyledApp = styled.div`
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type='horizontal'>
          <Heading as='h1'>The Wild Oasis</Heading>
          <div>
            <Heading as='h2'>Check in and out</Heading>
            <Button>Check in</Button>
            <Button variation='danger' size='small'>
              Check out
            </Button>
          </div>
        </Row>

        <Row>
          <Heading as='h3'>Form</Heading>
          <form action=''>
            <Input placeholder='Enter value' />
            <Input placeholder='Enter value' />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}
