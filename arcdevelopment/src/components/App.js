import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from '../components/ui/Header';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from '../components/ui/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route exact path="/" component={() => <div> Home</div>} />
            <Route exact path="/services" component={() => <div> services</div>} />
            <Route exact path="/customesoftware" component={() => <div> customesoftware</div>} />
            <Route exact path="/mobileapps" component={() => <div> mobileapps</div>} />
            <Route exact path="/websites" component={() => <div> websites</div>} />
            <Route exact path="/revolution" component={() => <div> revolution</div>} />
            <Route exact path="/about" component={() => <div> about</div>} />
            <Route exact path="/contact" component={() => <div> contact</div>} />
            <Route exact path="/estimate" component={() => <div> estimate</div>} />
          </Routes>
        </Header>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;