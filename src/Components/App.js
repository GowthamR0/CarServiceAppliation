import { Route, Routes } from 'react-router-dom';
import FormComponents from './FormComponents';
import '../Css/App.css';
import Grid from './Grid';
// import Login from './Login';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path='/form' element={<FormComponents/>}/>
        <Route path='/gridtable' element={<Grid/>}/>
      </Routes>
    </div>
  );
}

export default App;