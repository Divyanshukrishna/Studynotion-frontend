import logo from './logo.svg';
import './App.css';
import {Route,Routes}from"react-router-dom";
import Home from "./pages/Home"
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';


function App() {
  return (
    <div className='w-screen min-h-screen bg-slate-900 flex flex-col '>
    <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="Catalog" element={<Catalog/>}/>
      <Route path ="Contact" element={<Contact/>}/>
    </Routes>
    </div>
  );
}

export default App;
