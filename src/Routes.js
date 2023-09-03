import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';

const Routing = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const userLocalStorage = window.localStorage.getItem('todo-app-user');

    if (userLocalStorage) setUser(userLocalStorage);
  }, []);

  return (
    <Routes>
      {!user && <>
        <Route
          path='/login'

          element={<Login />}
        />

        <Route
          path='/register'

          element={<Register />}
        />

        <Route
          path='*'

          element={<Navigate
            to='/login'
          />}
        />
      </>}

      {user && <>
        <Route
          path='/'

          element={<Todos />}
        />

        <Route
          path='*'

          element={<Navigate
            to='/'
          />}
        />
      </>}
    </Routes>
  );
};

export default Routing;
