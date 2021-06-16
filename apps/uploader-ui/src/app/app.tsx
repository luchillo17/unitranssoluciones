import { Icon, List } from '@material-ui/core';
import { CloudUpload, Sync } from '@material-ui/icons';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Route } from 'react-router-dom';

import styles from './app.module.scss';
import HomePage from './pages/home-page/home-page';
import UploadQueuePage from './pages/upload-queue-page/upload-queue-page';
import UploadedListPage from './pages/uploaded-list-page/uploaded-list-page';
import ListItemLink from './shared/components/list-item-link/list-item-link';

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
      <div className={styles.sideMenu}>
        <List>
          <ListItemLink
            to="/"
            text="Zona Selección"
            icon={<Icon>upload</Icon>}
          ></ListItemLink>

          <ListItemLink
            to="/upload-queue"
            text="Cola Subida"
            icon={<Sync />}
          ></ListItemLink>

          <ListItemLink
            to="/uploaded-list"
            text="Lista Subidos"
            icon={<CloudUpload />}
          ></ListItemLink>
        </List>
      </div>
      <div className="content">
        <Route path="/" exact component={HomePage} />

        <Route path="/upload-queue" exact component={UploadQueuePage} />

        <Route path="/uploaded-list" exact component={UploadedListPage} />
      </div>
    </div>
  );
}

export default App;
