import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './shared/global';
import { lightTheme } from './shared/theme';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Home />
        </ThemeProvider>
      </Suspense>
    </div >
  );
}

export default App;
