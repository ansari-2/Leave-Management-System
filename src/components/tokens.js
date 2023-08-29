import React from 'react';
import { useToken,TokenProvider } from './TokenContext';

function Tokens() {
  const { token } = useToken();

  return (
    <TokenProvider>
    <div>
      {/* Use token in your component */}
      <p>Token: {token}</p>
    </div>
    </TokenProvider>
  );
}

export default Tokens;
