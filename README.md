# Matrix Operations Platform

A web-based application for performing matrix operations including addition, subtraction, and multiplication with dynamic matrix inputs.

## Project Structure

```
Matrix_operations/
├── index.html          # Main HTML file (clean structure, references external files)
├── styles.css          # All CSS styles and responsive design
├── script.js           # All JavaScript functionality and matrix operations
├── README.md           # Project documentation
└── index_backup.html   # Backup of original single-file version
```

## Features

- **Dynamic Matrix Input**: Create matrices of any size (1x1 to 10x10)
- **Matrix Operations**: 
  - Addition (A + B)
  - Subtraction (A - B)
  - Multiplication (A × B)
- **Input Validation**: Real-time validation of numeric inputs
- **Compatibility Checking**: Automatic verification of matrix dimension compatibility
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient-based design with smooth animations

## File Descriptions

### `index.html`
- Clean HTML structure with semantic markup
- References external CSS and JavaScript files
- Contains all the UI elements and form controls

### `styles.css`
- Complete styling for the application
- Responsive design with mobile-first approach
- Modern gradient-based color scheme
- Smooth animations and transitions
- Error and success state styling

### `script.js`
- `MatrixOperations` class containing all matrix logic
- Dynamic matrix generation and input handling
- Matrix arithmetic operations (add, subtract, multiply)
- Input validation and error handling
- Result display and user feedback

## How to Run

1. Open `index.html` in a web browser, or
2. Start a local HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

## Usage

1. **Set Matrix Dimensions**: Use the input controls to set the rows and columns for Matrix A and Matrix B
2. **Generate Matrices**: Click "Generate Matrices" to create input tables
3. **Enter Values**: Fill in the matrix values in the generated input fields
4. **Perform Operations**: Click the operation buttons to calculate results
5. **View Results**: Results are displayed in a formatted matrix below

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with responsive design support

## Development Notes

This project has been restructured from a single HTML file into a modular structure with separate files for HTML, CSS, and JavaScript, improving:
- Code organization and maintainability
- Separation of concerns
- Reusability of components
- Development workflow
