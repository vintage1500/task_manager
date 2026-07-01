let tasks = []; 

// Перевод даты в красивый формат
function formatDateTimeRu(date) {
    return date.toLocaleString("ru-RU", {
        dateStyle: "full",
        timeStyle: "short"
    });
}

// Создание объекта задачи
function createTask(title, description) {
    return {
        title,
        description,
        isCompleted: false,
        createdDate: new Date(),
        completedDate: null
    }
}

// Добавление объекта задачи в массив
function setTask(title, description = '') {
    if (!title.trim()) {
        console.log('Ошибка. Для создания задачи укажите название\n');
        return
    }

    const task = createTask(title.trim(), description.trim());
    tasks.push(task);
    console.log((`Задача №${tasks.length} добавлена \n`));
}

// Вывод списка завершенных/незавершенных задач
function showTask(showCompleted = false) {
    const filteredTasks = tasks.filter(task => task.isCompleted === showCompleted);
    
    console.log(showCompleted ? 'Список завершенных задач:' : 'Список текущих задач:');

    if (filteredTasks.length === 0) {
        console.log('Задач нет\n');
        return
    }

    filteredTasks.forEach((task, i) => {
        console.log(`Задача №${i + 1}`);
        console.log(`Название задачи: ${task.title}`);
        console.log(`Описание задачи: ${task.description}`);
        console.log(task.isCompleted ? 'Задача завершена' : 'Задача не завершена');
        console.log(`Задача создана в ${formatDateTimeRu(task.createdDate)}`);

        if (task.completedDate !== null) {
            console.log(`Задача завершена в ${formatDateTimeRu(task.completedDate)}`);
        } else {
            console.log('Задача не завершена');
        }

        console.log(); // Пустая строка для разделения
    })
}

// Завершение задачи
function completeTask(index) {
    const task = tasks[index];

    if (!task) {
        console.log(`Задачи ${index + 1} не существует\n`);
        return;
    }

    if (task.isCompleted) {
        console.log(`Задача №${index + 1} уже завершена\n`);
        return;
    }

    task.isCompleted = true;
    task.completedDate = new Date(); 

    const completedCount = tasks.filter(task => task.isCompleted).length;

    console.log(`Задача №${index + 1} завершена`);
    console.log(`Количество завершенных задач: ${completedCount}\n`);
}

// Удаление задачи по индексу
function deleteTask(index) {
    const task = tasks[index];

    if (!task) {
        console.log(`Задачи ${index + 1} не существует`);
        return
    }

    if (task.isCompleted === false) {
        const isConfirmed = confirm(`Задача не выполнена, удалить?`);

        if (!isConfirmed) {
            console.log(`Удаление отменено. Задача №${index + 1} оставлена \n`);
            return
        }

        tasks.splice(index, 1);
        console.log(`Задача №${index + 1} удалена \n`);
        return
    }

    tasks.splice(index, 1);
    console.log(`Задача №${index + 1} удалена\n`); 
}

// очистка задач
function clearTasks(clearCompleted = false) {
    if (!clearCompleted) {
        tasks = [];
        console.log('Список всех задач очищен \n');
        return;
    }

    tasks = tasks.filter(task => !task.isCompleted);
    console.log('Список завершенных задач очищен \n');
}

// Блок тестирования
// 1. Создание задач, в том числе в случае, когда поле title пустое
setTask('task 1', 'description of task 1');
setTask('task 2', 'description of task 2');
setTask('task 3', 'description of task 3');
setTask('task 4', 'description of task 4');
setTask('', 'description of task with empty title');

showTask();

// Завершение задач, в том числе несуществующей
completeTask(1);
completeTask(4);

showTask();
showTask(true);

// Удаление не работает в среде разработки Enterly, т.к. не поддерживается confirm
deleteTask(2); 

// Очистка завершенных задач

clearTasks(true);
showTask();
showTask(true);

// Очистка всех задач
completeTask(1);
clearTasks();
showTask();
