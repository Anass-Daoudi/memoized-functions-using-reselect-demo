const { displayFunctionExecutionTime } = require('./helpers/displayFunctionExecutionTime')
const { slowFunctionExecution } = require('./helpers/slowFunctionExecution')
const { createSelector } = require('reselect')

const getTodos = (todos, filter) => {
    console.log('Getting todos...');
    slowFunctionExecution();

    switch (filter) {
        case 'done':
        case 'active':
            return todos.filter(({ status }) => status === filter)
        case 'all':
        default:
            return todos;
    }
}

const todosSelector = ({ todos }) => todos
const filterSelector = ({ filter }) => filter

const memoizedGetTodos = createSelector(
    [
        todosSelector,
        filterSelector
    ],
    getTodos
);

const state = {
    filter: 'all',
    todos: [
        { status: 'done', text: 'learn memoization' },
        { status: 'active', text: 'say hello to me' },
        { status: 'done', text: 'check this demo' },
        { status: 'active', text: 'give me feedback' },
    ]
}

console.log(
    `${state.filter} todos count:`,
    displayFunctionExecutionTime(() => memoizedGetTodos(state).length)
);
console.log();
console.log(
    `${state.filter} todos count:`,
    displayFunctionExecutionTime(() => memoizedGetTodos(state).length)
);
console.log();

// Change the state from filter:all to filter:done
const newState = { ...state, filter: 'done' }

console.log(
    `${newState.filter} todos count:`,
    displayFunctionExecutionTime(() => memoizedGetTodos(newState).length)
);
console.log();
console.log(
    `${newState.filter} todos count:`,
    displayFunctionExecutionTime(() => memoizedGetTodos(newState).length)
);