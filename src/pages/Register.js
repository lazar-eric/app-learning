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
}), { name: 'Register' });

const Register = () => {
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

  const onRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users', values);

      console.log('Response', response);

      navigate('/login');
    }
    catch (error) {
      console.log('Registraciona greska');
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
        Registracija
      </Type>

      <Line
        className={classes.form}
      >
        <TextField
          label='Name'

          onChange={value => onUpdate('name', value)}

          fullWidth
        />
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
        onClick={onRegister}

        color='default'
      >
        Registruj se
      </Button>
    </Line>
  );
};

export default Register;
