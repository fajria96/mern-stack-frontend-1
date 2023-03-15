import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <ToastContainer position='top-center'/>
        <Switch>
          <Route path="/" exact children={() => <Home />} />
          <Route path='/detail/:empid' children={ <Detail />} />
          <Route path="/edit/:empid" children={ <Edit />} />
          <Route path="/tambah" children={() => <Tambah />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;