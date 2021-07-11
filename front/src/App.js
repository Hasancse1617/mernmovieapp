import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginRoute from './router/LoginRoute';
import Store from './store';

function App(props) {
  return (
    <Provider store={Store}>
      <BrowserRouter>
          <LoginRoute/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
