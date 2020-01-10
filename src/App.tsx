import React from 'react';
import { StoreProvider } from './Store';
import Search from './Search';

export default function App():JSX.Element {
  
  return (
    <div>
      <StoreProvider>
        <Search />
      </StoreProvider>
    </div>
  );
}
