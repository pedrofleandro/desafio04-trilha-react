import Modal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom';
import { FoodsProvider } from './hooks/useFoods';

import Routes from './routes';

import GlobalStyle from './styles/global';

Modal.setAppElement('#root')

const App = () => (
  <>
    <FoodsProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </FoodsProvider>
  </>
);

export default App;
