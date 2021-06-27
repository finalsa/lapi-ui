import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers";
import thunk from 'redux-thunk';
import styles from 'css/app.module.css'
import es from 'date-fns/locale/es';
import Pages from 'pages'
import { registerLocale } from "react-datepicker";
import UpdateApp from 'components/layout/UpdateApp'

registerLocale('es', es)

const store = createStore(reducers, undefined, applyMiddleware(thunk));

function App() {
  let isLatestVersion = true
  let emptyCacheStorage = () => { }
  return (
    <div className={`m-0 p-0 ${styles.module}`}>

      <div>
        {!isLatestVersion ? (
          <UpdateApp emptyCacheStorage={emptyCacheStorage} ></UpdateApp>
        ) :
          <Provider store={store}>
            <Router>
              <Pages></Pages>
            </Router>
          </Provider>
        }
      </div>

    </div>
  );
}

export default App;
