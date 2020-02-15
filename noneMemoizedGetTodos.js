const { displayFunctionExecutionTime } = require('./helpers/displayFunctionExecutionTime')
const { slowFunctionExecution } = require('./helpers/slowFunctionExecution')

const noneMemoizedGetTodos = (todos, filter) => {
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

const state = {
    filter: 'active',
    todos: [
        { status: 'done', text: 'learn memoization' },
        { status: 'active', text: 'say hello to me' },
        { status: 'done', text: 'check this demo' },
        { status: 'active', text: 'give me feedback' },
    ]
}

console.log(
    `${state.filter} todos count:`,
    displayFunctionExecutionTime(() => noneMemoizedGetTodos(state.todos, state.filter).length)
);
console.log();
console.log(
    `${state.filter} todos count:`,
    displayFunctionExecutionTime(() => noneMemoizedGetTodos(state.todos, state.filter).length)
);
