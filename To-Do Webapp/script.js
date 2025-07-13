
function formatDate(date) {
  return date.toLocaleString(undefined, {
    year: '2-digit', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

let tasks = []; 

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');

function renderTasks() {
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;

    
    const details = document.createElement('div');
    details.className = 'details';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    details.appendChild(textSpan);

    
    const actions = document.createElement('div');
    actions.className = 'task-actions';

    if (!task.completed) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.onclick = () => completeTask(task.id);
      actions.appendChild(completeBtn);
    } else {
      const undoBtn = document.createElement('button');
      undoBtn.textContent = 'Undo';
      undoBtn.onclick = () => undoTask(task.id);
      actions.appendChild(undoBtn);
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(task.id);
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(task.id);
    actions.appendChild(deleteBtn);

    details.appendChild(actions);
    li.appendChild(details);

  
    const ts = document.createElement('div');
    ts.className = 'timestamp';
    if (!task.completed) {
      ts.textContent = "Added: " + formatDate(new Date(task.addedAt));
    } else {
      ts.textContent = `Added: ${formatDate(new Date(task.addedAt))} | Completed: ${formatDate(new Date(task.completedAt))}`;
    }
    li.appendChild(ts);

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function addTask(text) {
  tasks.unshift({
    id: Date.now() + Math.random(),
    text,
    addedAt: new Date().toISOString(),
    completed: false,
    completedAt: null
  });
  renderTasks();
}

function completeTask(id) {
  const t = tasks.find(task => task.id === id);
  if (t) {
    t.completed = true;
    t.completedAt = new Date().toISOString();
    renderTasks();
  }
}

function undoTask(id) {
  const t = tasks.find(task => task.id === id);
  if (t) {
    t.completed = false;
    t.completedAt = null;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const t = tasks.find(task => task.id === id);
  if (t) {
    const newText = prompt("Edit your task:", t.text);
    if (newText && newText.trim() !== '') {
      t.text = newText.trim();
      renderTasks();
    }
  }
}


taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const val = taskInput.value.trim();
  if (val) {
    addTask(val);
    taskInput.value = '';
  }
});


renderTasks();