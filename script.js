const formContainer = document.getElementById('form-container');
const addInputBtn = document.getElementById('add-input');
const addSelectBtn = document.getElementById('add-select');
const addTextareaBtn = document.getElementById('add-textarea');
const saveBtn = document.getElementById('save');

const formData = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Text area",
        "placeholder": "Sample Placeholder"
    },
];

function renderForm() {
    formContainer.innerHTML = '';
    formData.forEach(data => {
        const element = createFormElement(data);
        formContainer.appendChild(element);
    });
}

function createFormElement(data) {
    const element = document.createElement('div');
    element.classList.add('form-element');
    element.setAttribute('draggable', true);
    element.setAttribute('data-type', data.type);
    element.setAttribute('data-id', data.id);
    const label = document.createElement('label');
    label.textContent = data.label;
    element.appendChild(label);
    if (data.type === 'select') {
        const select = document.createElement('select');
        data.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        element.appendChild(select);
    } else {
        const input = document.createElement('input');
        input.setAttribute('type', data.type);
        input.setAttribute('placeholder', data.placeholder);
        element.appendChild(input);
    }
    return element;
}

function addInput() {
    formData.push({
        "id": uuidv4(),
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    });
    renderForm();
}

function addSelect() {
    formData.push({
        "id": uuidv4(),
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    });
    renderForm();
}

function addTextarea() {
    formData.push({
        "id": uuidv4(),
        "type": "textarea",
        "label": "Text area",
        "placeholder": "Sample Placeholder"
    });
    renderForm();
}

function saveFormData() {
    console.log(JSON.stringify(formData, null, 2));
}

addInputBtn.addEventListener('click', addInput);
addSelectBtn.addEventListener('click', addSelect);
addTextareaBtn.addEventListener('click', addTextarea);
saveBtn.addEventListener('click', saveFormData);

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

renderForm();
let draggedElement = null;

formContainer.addEventListener('dragstart', (event) => {
    draggedElement = event.target;
    event.dataTransfer.setData('text/plain', '');
});

formContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

formContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('form-element')) {
        const droppedElement = event.target;
        const droppedIndex = Array.from(formContainer.children).indexOf(droppedElement);
        const draggedIndex = Array.from(formContainer.children).indexOf(draggedElement);
        if (draggedIndex < droppedIndex) {
            formContainer.insertBefore(droppedElement, draggedElement);
        } else {
            formContainer.insertBefore(draggedElement, droppedElement);
        }
    } else {
        formContainer.appendChild(draggedElement);
    }
});
