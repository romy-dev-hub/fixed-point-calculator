//program here

function calculateFixedPoint() {
    // Correct variable names and input gathering
    const funcInput = document.getElementById("function").value;
    const x0 = parseFloat(document.getElementById("x0").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);
    const maxIterations = parseInt(document.getElementById("maxIterations").value);

    // Fix typo in variable name (foncInput -> funcInput)
    if (!funcInput || isNaN(x0) || isNaN(tolerance) || isNaN(maxIterations)) {
        displayResult("Please fill all fields correctly!");
        return;
    }

    // Create a safer function evaluation method.. it can work with expo sin cos ...
    const f = (x) => {
        try {
            let preparedInput = funcInput
                .replace(/\^/g, '**')
                .replace(/exp\(/g, 'Math.exp(')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/log\(/g, 'Math.log(');
                
            const func = new Function('x', `return ${preparedInput}`);
            return func(x);
        } catch (error) {
            displayResult("Invalid function syntax for f(x)!");
            return null;
        }
    };

    let currentX = x0;
    let nextX;
    let iterations = 0;

    while (iterations < maxIterations) {
        nextX = f(currentX);

        // Check if function evaluation failed
        if (nextX === null) return;

        // Fix Math.abs (was written as math.abs)
        const error = Math.abs(nextX - currentX);

        if (error < tolerance) {
            displayResult(`
                <strong>Root Found:</strong> ${nextX.toFixed(6)} <br>
                <strong>Iterations:</strong> ${iterations + 1} <br>
                <strong>Error:</strong> ${error.toFixed(6)}
            `);
            return;
        }

        currentX = nextX;
        iterations++;
    }

    // Fix typo in function name (dispatchResult -> displayResult)
    displayResult(`
        <strong>Failed to converge:</strong> Maximum iterations (${maxIterations}) reached!<br>
        <strong>Last approximation:</strong> ${currentX.toFixed(6)}
    `);
}

function displayResult(message) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = message;
}