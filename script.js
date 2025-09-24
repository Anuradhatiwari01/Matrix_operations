// Matrix Operations Class
class MatrixOperations {
    constructor() {
        this.matrixA = [];
        this.matrixB = [];
        this.result = [];
    }

    // Generate matrix input tables
    generateMatrix(containerId, rows, cols) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'matrix-table';

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.step = '0.01';
                input.value = '0';
                input.id = `${containerId}_${i}_${j}`;
                input.addEventListener('input', this.validateInput);
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    }

    // Validate input values
    validateInput(event) {
        const input = event.target;
        const value = parseFloat(input.value);
        
        if (isNaN(value) && input.value !== '' && input.value !== '-') {
            input.classList.add('error');
            input.title = 'Please enter a valid number';
        } else {
            input.classList.remove('error');
            input.title = '';
        }
    }

    // Get matrix values from inputs
    getMatrixValues(containerId, rows, cols) {
        const matrix = [];
        let hasErrors = false;

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const input = document.getElementById(`${containerId}_${i}_${j}`);
                const value = parseFloat(input.value);
                
                if (isNaN(value)) {
                    input.classList.add('error');
                    hasErrors = true;
                    row.push(0);
                } else {
                    input.classList.remove('error');
                    row.push(value);
                }
            }
            matrix.push(row);
        }

        return { matrix, hasErrors };
    }

    // Matrix addition
    add(matrixA, matrixB) {
        const rowsA = matrixA.length;
        const colsA = matrixA[0].length;
        const rowsB = matrixB.length;
        const colsB = matrixB[0].length;

        if (rowsA !== rowsB || colsA !== colsB) {
            throw new Error(`Matrix dimensions don't match for addition. Matrix A: ${rowsA}×${colsA}, Matrix B: ${rowsB}×${colsB}`);
        }

        const result = [];
        for (let i = 0; i < rowsA; i++) {
            const row = [];
            for (let j = 0; j < colsA; j++) {
                row.push(matrixA[i][j] + matrixB[i][j]);
            }
            result.push(row);
        }
        return result;
    }

    // Matrix subtraction
    subtract(matrixA, matrixB) {
        const rowsA = matrixA.length;
        const colsA = matrixA[0].length;
        const rowsB = matrixB.length;
        const colsB = matrixB[0].length;

        if (rowsA !== rowsB || colsA !== colsB) {
            throw new Error(`Matrix dimensions don't match for subtraction. Matrix A: ${rowsA}×${colsA}, Matrix B: ${rowsB}×${colsB}`);
        }

        const result = [];
        for (let i = 0; i < rowsA; i++) {
            const row = [];
            for (let j = 0; j < colsA; j++) {
                row.push(matrixA[i][j] - matrixB[i][j]);
            }
            result.push(row);
        }
        return result;
    }

    // Matrix multiplication
    multiply(matrixA, matrixB) {
        const rowsA = matrixA.length;
        const colsA = matrixA[0].length;
        const rowsB = matrixB.length;
        const colsB = matrixB[0].length;

        if (colsA !== rowsB) {
            throw new Error(`Cannot multiply matrices. Matrix A columns (${colsA}) must equal Matrix B rows (${rowsB})`);
        }

        const result = [];
        for (let i = 0; i < rowsA; i++) {
            const row = [];
            for (let j = 0; j < colsB; j++) {
                let sum = 0;
                for (let k = 0; k < colsA; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                row.push(Math.round(sum * 100000) / 100000); // Round to avoid floating point errors
            }
            result.push(row);
        }
        return result;
    }

    // Display result matrix
    displayResult(matrix, operation) {
        const container = document.getElementById('resultContainer');
        container.innerHTML = '';

        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = `${operation} completed successfully!`;
        container.appendChild(successMsg);

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-matrix';

        const table = document.createElement('table');
        for (let i = 0; i < matrix.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement('td');
                cell.textContent = matrix[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        resultDiv.appendChild(table);
        container.appendChild(resultDiv);
    }

    // Display error message
    displayError(message) {
        const container = document.getElementById('resultContainer');
        container.innerHTML = '';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        container.appendChild(errorDiv);
    }

    // Show matrix compatibility info
    showMatrixInfo(rowsA, colsA, rowsB, colsB) {
        const infoDiv = document.getElementById('matrixInfo');
        infoDiv.classList.remove('hidden');
        
        let info = `Matrix A: ${rowsA}×${colsA}, Matrix B: ${rowsB}×${colsB}<br>`;
        info += `Addition/Subtraction: ${(rowsA === rowsB && colsA === colsB) ? '✓ Compatible' : '✗ Not Compatible'}<br>`;
        info += `Multiplication (A×B): ${(colsA === rowsB) ? '✓ Compatible' : '✗ Not Compatible'}`;
        
        infoDiv.innerHTML = info;
    }
}

// Initialize the matrix operations
const matrixOps = new MatrixOperations();

// Generate matrices based on input dimensions
function generateMatrices() {
    const rowsA = parseInt(document.getElementById('rowsA').value);
    const colsA = parseInt(document.getElementById('colsA').value);
    const rowsB = parseInt(document.getElementById('rowsB').value);
    const colsB = parseInt(document.getElementById('colsB').value);

    // Validate dimensions
    if (rowsA < 1 || rowsA > 10 || colsA < 1 || colsA > 10 ||
        rowsB < 1 || rowsB > 10 || colsB < 1 || colsB > 10) {
        matrixOps.displayError('Matrix dimensions must be between 1 and 10');
        return;
    }

    matrixOps.generateMatrix('matrixA', rowsA, colsA);
    matrixOps.generateMatrix('matrixB', rowsB, colsB);
    matrixOps.showMatrixInfo(rowsA, colsA, rowsB, colsB);
    clearResult();
}

// Matrix addition operation
function addMatrices() {
    try {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);

        const matrixAData = matrixOps.getMatrixValues('matrixA', rowsA, colsA);
        const matrixBData = matrixOps.getMatrixValues('matrixB', rowsB, colsB);

        if (matrixAData.hasErrors || matrixBData.hasErrors) {
            matrixOps.displayError('Please correct the highlighted input errors before proceeding');
            return;
        }

        const result = matrixOps.add(matrixAData.matrix, matrixBData.matrix);
        matrixOps.displayResult(result, 'Matrix Addition');
    } catch (error) {
        matrixOps.displayError(error.message);
    }
}

// Matrix subtraction operation
function subtractMatrices() {
    try {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);

        const matrixAData = matrixOps.getMatrixValues('matrixA', rowsA, colsA);
        const matrixBData = matrixOps.getMatrixValues('matrixB', rowsB, colsB);

        if (matrixAData.hasErrors || matrixBData.hasErrors) {
            matrixOps.displayError('Please correct the highlighted input errors before proceeding');
            return;
        }

        const result = matrixOps.subtract(matrixAData.matrix, matrixBData.matrix);
        matrixOps.displayResult(result, 'Matrix Subtraction');
    } catch (error) {
        matrixOps.displayError(error.message);
    }
}

// Matrix multiplication operation
function multiplyMatrices() {
    try {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);

        const matrixAData = matrixOps.getMatrixValues('matrixA', rowsA, colsA);
        const matrixBData = matrixOps.getMatrixValues('matrixB', rowsB, colsB);

        if (matrixAData.hasErrors || matrixBData.hasErrors) {
            matrixOps.displayError('Please correct the highlighted input errors before proceeding');
            return;
        }

        const result = matrixOps.multiply(matrixAData.matrix, matrixBData.matrix);
        matrixOps.displayResult(result, 'Matrix Multiplication');
    } catch (error) {
        matrixOps.displayError(error.message);
    }
}

// Clear all inputs
function clearAll() {
    document.getElementById('matrixA').innerHTML = '';
    document.getElementById('matrixB').innerHTML = '';
    document.getElementById('matrixInfo').classList.add('hidden');
    clearResult();
}

// Clear result section
function clearResult() {
    document.getElementById('resultContainer').innerHTML = '';
}

// Initialize default matrices on page load
window.addEventListener('DOMContentLoaded', function() {
    generateMatrices();
});
