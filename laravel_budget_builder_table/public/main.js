//1. Xử lý lặp lại các input theo ý muốn
const container = document.getElementById('gridContainer');

const rowNumber = 100;
const colNumber = 20;

for(let i = 0; i < rowNumber; i++) {
    const row = document.createElement('div');
    row.className = 'row1'; 

    for(let j = 0; j < colNumber; j++) {
        const col = document.createElement('div');
        col.className = 'col';

        const input = document.createElement('input');
        input.className = 'input';
        input.type = 'text';  

        col.appendChild(input);
        row.appendChild(col);
    }

    container.appendChild(row);
}

//2. Xử lý di chuyển bằng phím mũi tên trên các input và enter xuống dòng
const inputs = document.querySelectorAll('#gridContainer .input');

inputs.forEach((input, index) => {
    input.addEventListener('keydown', function(event) {
        const colNumber = 20; 

        switch (event.key) {
            case 'ArrowRight': 
                event.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                break;
            case 'ArrowLeft': 
                event.preventDefault();
                if (index > 0) {
                    inputs[index - 1].focus();
                }
                break;
            case 'ArrowDown': 
                event.preventDefault();
                if (index + colNumber < inputs.length) {
                    inputs[index + colNumber].focus();
                }
                break;
            case 'ArrowUp': 
                event.preventDefault();
                if (index - colNumber >= 0) {
                    inputs[index - colNumber].focus();
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (index + colNumber < inputs.length) {
                    inputs[index + colNumber].focus();
                }
                break;
        }
    });
});

//3. In đậm khi long click
// let isMouseDown = false;
// let startIndex = null;

// inputs.forEach((input, index) => {
//     input.addEventListener('mousedown', function(event) {
//         event.preventDefault();
//         isMouseDown = true;
//         startIndex = index; 
//         input.classList.add('highlighted'); 
//     });

//     input.addEventListener('mousemove', function(event) {
//         if (isMouseDown) {

//             const start = Math.min(startIndex, index);
//             const end = Math.max(startIndex, index);

//             inputs.forEach(input => input.classList.remove('highlighted'));

//             for (let i = start; i <= end; i++) {
//                 inputs[i].classList.add('highlighted');
//             }
//         }
//     });

//     input.addEventListener('mouseup', function() {
//         isMouseDown = false; 
//     });
// });

// document.addEventListener('mouseup', function() {
//     isMouseDown = false; 
// });
