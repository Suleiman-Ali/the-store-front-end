import App from './components/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from './context';
import './index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ContextProvider>
);
