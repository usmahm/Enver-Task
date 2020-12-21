import classes from './App.module.css';
import React from 'react';
import ChatWindow from './containers/ChatWindow/ChatWindow';

const App = () => {

    return (
      <div className={classes.App}>
        <ChatWindow />
      </div>
    );
}

export default App;
