const { displayFunctionExecutionTime } = require('./helpers/displayFunctionExecutionTime')
const { slowFunctionExecution } = require('./helpers/slowFunctionExecution')

let lastTodos = undefined;
let lastFilter = undefined;
let lastResult = undefined;

const ownMemoizedGetTodos = (todos, filter) => {
    if (lastTodos === todos && lastFilter === filter) {
        return lastResult;
    } else {
        // to make it simple, assign both of them even
        // if at least one changed
        lastTodos = todos;
        lastFilter = filter;

        console.log('Getting todos...');
        slowFunctionExecution();

        switch (filter) {
            case 'done':
            case 'active':
                lastResult = todos.filter(({ status }) => status === filter);
                return lastResult;
            case 'all':
            default:
                lastResult = todos;
                return lastResult;
        }
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
    displayFunctionExecutionTime(() => ownMemoizedGetTodos(state.todos, state.filter).length)
);
console.log();
console.log(
    `${state.filter} todos count:`,
    displayFunctionExecutionTime(() => ownMemoizedGetTodos(state.todos, state.filter).length)
);
