import styles from './app.module.scss';

import { Route, Link } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';

export function App() {
  return (
    <div className={styles.app}>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <Route path="/" exact component={HomePage} />
    </div>
  );
}

export default App;
