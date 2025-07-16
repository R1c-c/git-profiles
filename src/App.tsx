import { GlobalPosts } from './components/GlobalPosts.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js'
import Fav from './components/Fav.js'
import './App.css';

const App = () => {

  return (
    <GlobalPosts>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Fav />}/>    
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
