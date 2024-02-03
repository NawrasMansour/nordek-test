import React from 'react';

// lib
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// custom
import { Home , Error } from './pages';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* base pages */}
        <Route path='/' element={<Home />}>
          {' '}
        </Route>

        {/* error - unkown pages */}
        <Route path='/*' element={<Error />}>
          {' '}
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
