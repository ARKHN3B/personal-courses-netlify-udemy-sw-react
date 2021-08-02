import logo from './logo.svg';
import './App.css';

function App() {
  console.debug(process.env)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form name="contact" data-netlify={true}>
          <p>
            <label>Name <input type="text" name="name" /></label>
          </p>
          <p>
            <label>Email <input type="email" name="email" /></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          My default branch {process.env.REACT_APP_BIG_ENV}<br/>
          <ol>
            <li>(((Test env from netlify deploy settings))): ===> {process.env.REACT_APP_MY_KEY}</li>
            <li>(((Test env from netlify TOML file for the whole environments))): ===> {process.env.REACT_APP_TEST_KEY_FROM_NETLIFY_TOML_ENV}</li>
            <li>(((Test env from netlify TOML file only for production))): ===> {process.env.REACT_APP_TEST_ENV_ONLY_PROD} {process.env.TEST_ENV_ONLY_PROD}</li>
            <li>(((Test env from netlify TOML file only for deploy branch))): ===> {process.env.REACT_APP_TEST_ENV_DEPLOY_BRANCH}</li>
            <li>(((Test env from netlify TOML file for ALL (overrides)))): ===> {process.env.REACT_APP_BIG_ENV}</li>
          </ol>
        </a>
      </header>
    </div>
  );
}

export default App;
