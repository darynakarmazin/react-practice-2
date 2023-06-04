import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleSubmit = text => {
    const todo = { text, id: nanoid() };
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
    console.log(text);
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {todos.map(({ text, id }, index) => {
            return (
              <GridItem key={id}>
                <Todo text={text} counter={index+1} />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
