import React from 'react';
import axios from 'axios';

import { style } from '@amaui/style-react';
import { Line, TextField, Type, Button } from '@amaui/ui-react';
import { useNavigate } from 'react-router';

const useStyle = style(theme => ({
  root: {
    width: '100%',
  },

  form: {
    width: '100%',
    maxWidth: '400px'
  }
}), { name: 'Login' });

const Login = () => {
  const { classes } = useStyle();
  const [values, setValues] = React.useState({});

  const navigate = useNavigate();

  const onUpdate = (property, value) => {
    setValues(previous => {
      return {
        ...previous,
        [property]: value
      }
    });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post('process.env.REACT_APP_API/users/login', values);

      console.log('Response', response);

      // token ubaciti u local storage
      window.localStorage.setItem('todo-app-user', response.data.response);

      navigate('/');

      window.location.reload();
    }
    catch (error) {
      console.log('Login greska');
    }
  };

  return (
    <Line
      gap={4}

      justify='center'
      align='center'

      className={classes.root}
    >
      <Type
        version='h3'
      >
        Login
      </Type>

      <Line
        className={classes.form}
      >
        <TextField
          label='Email'

          onChange={value => onUpdate('email', value)}

          type='email'

          fullWidth
        />
        <TextField
          label='Password'

          onChange={value => onUpdate('password', value)}

          type='password'

          fullWidth
        />
      </Line>

      <Button
        onClick={onLogin}

        color='default'
      >
        Uloguj se
      </Button>
    </Line>
  );
};

export default Login;
