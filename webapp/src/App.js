import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import About from './components/pages/About';

import Support from './components/pages/Support';
import NoPage from './components/pages/NoPage';
import Layout from './components/pages/Layout';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    /*<div className="App">
      <Home/>
      <About/>
      <Contact/>HomeAboutContactSupport
      <Support/>
    </div>*/

    <BrowserRouter>
    
    <Routes>

      <Route path='/' element={<Layout/>}>

        <Route index     element={<Home/>} />

        <Route path='Contact'  element={<Contact/>}  />

        <Route path='About'  element={<About/>}  />

        <Route path ='Support'  elemnent={<Support/>} />

        <Route path='*' element ={<NoPage/>}  />

      </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
