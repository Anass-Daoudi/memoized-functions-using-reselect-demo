const displayFunctionExecutionTime = someFunction => {
    const start = Date.now();
    const result = someFunction();
    console.log('Execution time:', Date.now() - start, 'ms')
    return result;
}

module.exports = {
    displayFunctionExecutionTime
}