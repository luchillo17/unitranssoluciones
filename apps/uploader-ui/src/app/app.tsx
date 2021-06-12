import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link, Route } from 'react-router-dom';

import styles from './app.module.scss';
import HomePage from './pages/home-page/home-page';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <GoogleLogin
        clientId="576666106261-bjh7ii2atoqdqg97ljb9dipkals5albe.apps.googleusercontent.com"
        buttonText="Login"
        isSignedIn={true}
        onSuccess={(response) => {
          console.log(response);
          setIsLoggedIn(true);
        }}
        onFailure={(error) => {
          console.error('App error', error);
          if (error.error === 'popup_closed_by_user') {
            window.location.reload();
          }
        }}
        cookiePolicy={'single_host_origin'}
      />
    );
  }

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
