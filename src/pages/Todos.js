import React from 'react';
import axios from 'axios';

import { style } from '@amaui/style-react';
import { Line, TextField, Type, Button } from '@amaui/ui-react';

const useStyle = style(theme => ({
  root: {

  },

  form: {
    width: '100%'
  },

  todos: {
    width: '100vw',
    maxWidth: '400px'
  },

  todo: {
    width: '100%',
    background: 'white',
    padding: '14px 24px'
  }
}), { name: 'Todos' });

const Todos = () => {
  const { classes } = useStyle();
  const [values, setValues] = React.useState({});
  const [todos, setTodos] = React.useState([]);

  const onUpdate = (property, value) => {
    setValues(previous => {
      return {
        ...previous,
        [property]: value
      }
    });
  };

  const getTodos = async () => {
    const token = window.localStorage.getItem('todo-app-user');

    const result = await axios.get('process.env.REACT_APP_API/todos', { headers: { 'Authorization': token } });

    setTodos(result.data.response);
  };

  const addTodo = async (event) => {
    event.preventDefault();

    console.log(values);

    const token = window.localStorage.getItem('todo-app-user');

    await axios.post('process.env.REACT_APP_API/todos', values, { headers: { 'Authorization': token } });

    setValues({});

    getTodos();
  };

  const logout = () => {
    window.localStorage.removeItem('todo-app-user');

    window.location.reload();
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  console.log(1, todos, values);

  return (
    <Line
      justify='center'
      align='center'

      className={classes.root}
    >
      <Line
        Component='form'

        direction='row'

        align='center'

        onSubmit={addTodo}

        className={classes.form}
      >
        <TextField
          label='What do you wanna todo today?'

          version='outlined'

          value={values.name || ''}

          onChange={value => onUpdate('name', value)}

          fullWidth
        />

        <Button
          type='submit'

          color='default'
        >
          Add todo
        </Button>
      </Line>

      <Line
        className={classes.todos}
      >
        {todos.map((todo, index) => (
          <Line
            key={index}

            direction='row'
            justify='space-between'

            className={classes.todo}
          >
            <Type>
              {todo.name}
            </Type>

            <Type>
              {todo.completed ? 'Uradjeno' : 'Nije uradjeno'}
            </Type>
          </Line>
        ))}
      </Line>

      <Button
        color='error'

        onClick={logout}
      >
        Log out
      </Button>
    </Line>
  );
};

export default Todos;
