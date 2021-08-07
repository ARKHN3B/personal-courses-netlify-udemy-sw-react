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
        {/*
          * Use Netlify Form in non static site is more complicated.
          * https://docs.netlify.com/forms/setup/?_ga=2.5006643.1000151465.1627748654-2003163681.1627457979#javascript-forms
          * https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/
          * On peut gérer la soumission avec la function submisssion-created avec la commande CLI netlify functions:create
        */}
        <form name="contact" netlify>
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
        </a>
      </header>
    </div>
  );
}

export default App;
