import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Todo from './Todo';

describe('<Todo/>', () => {
  let component;
  let onClickComplete;
  let onClickDelete;

  beforeEach(() => {
    const todo = {
      text: 'Todo for the test',
      done: false,
    };

    onClickComplete = jest.fn();
    onClickDelete = jest.fn();

    component = render(
      <Todo
        todo={todo}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
    );
  });

  test('should show todo text', () => {
    expect(component.container).toHaveTextContent('Todo for the test');
  });

  test('should show if todo is done', () => {
    expect(component.container).toHaveTextContent('This todo is not done');
  });

  test('should fire on click complete event handler', () => {
    const setAsDoneButton = component.getByText('Set as done');
    fireEvent.click(setAsDoneButton);
    expect(onClickComplete.mock.calls).toHaveLength(1);
  });

  test('should fire on click delete event handler', () => {
    const deleteButton = component.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(onClickDelete.mock.calls).toHaveLength(1);
  });
});
