import React from 'react';
import ReactDOM from 'react-dom';
import { MonacoEditor } from './VSCode';
import './styles.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={e => {}}>add</button>
        <MonacoEditor />
      </div>
    );
  }

  onClick = e => {};
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
