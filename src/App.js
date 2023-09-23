// src/App.js
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Introduction from './components/Introduction';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Introduction />
      </div>
    </ThemeProvider>
  );
}

export default App;
