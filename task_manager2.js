// README
// Единственное что меня смущает, насколько правильно объединить вывод завершенных и незавершенных задач в одну функцию или лучше было 
// разделить на две отдельные функции с учетом одинакового наполнения функций
let tasks = [];
let completedTasks = [];

// Конвертация даты в красивый формат
function convertDate(date) {
    return date.toLocaleString("ru-RU", { dateStyle: "full", timeStyle: "short" });
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
function setTask(title, description) {
    if (!title.trim()) {
        console.log('Ошибка. Для создания задачи укажите название\n');
        return
    }
    const task = createTask(title.trim(), description.trim() || '');
    tasks.push(task);
    console.log((`Задача №${tasks.length} добавлена \n`));
}

// Вывод списка задач/списка завершенных задач (по дефолту списка задач)
function showTask(arr = tasks) {
    console.log((arr === tasks) ? 'Список задач' : 'Список завершенных задач');
    if (arr.length === 0) {
        console.log('Задач нет\n');
        return    
    }
    arr.forEach((task, i) => {
        console.log(`Задача №${ i + 1}`);
        console.log(`Название задачи: ${task.title}`);;
        console.log(`Описание задачи: ${task.description}`);
        console.log((task.isCompleted === true) ? 'Задача завершена' : 'Задача не завершена');
        console.log(`Задача создана в ${convertDate(task.createdDate)}`);
        console.log((task.completedDate !== null) ? 'Задача завершена в ' + convertDate(task.completedDate) : 'Задача не завершена');
        console.log(); // Пустая строка для разделения
    })
} 

// Завершение задачи
function completeTask(index) {
    const task = tasks[index];
    if (!task) {
        console.log(`Задачи ${index + 1} не существует\n`);
        return
    }
    task.isCompleted = true;
    task.completedDate = new Date();
    completedTasks.push(task);
    tasks.splice(index, 1);
    console.log(`Задача №${index + 1} завершена`); 
    console.log(`Количество завершенных задач: ${completedTasks.length}`)
}

// Удаление задачи по индексу
function deleteTask(index) {
    const task = tasks[index];
    if (!task) {
        console.log(`Задачи ${index} не существует`);
        return
    }
    if (task.isCompleted === false) {
        const isConfirmed = confirm(`Задача не выполнена, удалить?`);
        if (isConfirmed) {
            tasks.splice(index, 1);
            console.log(`Задача №${index + 1} удалена \n`);
        } else {
            console.log(`Удаление отменено. Задача №${index + 1} оставлена \n`);
        }
    } else {
        tasks.splice(index, 1);
        console.log(`Задача №${index + 1} удалена\n`);     
    }
}

// очистка задач
function clearTasks() {
    tasks = [];
    console.log('Список задач очищен \n');
}

// очистка завершенных задач
function clearCompletedTasks() {
    completedTasks = [];
    console.log('Список завершенных задач очищен\n');
}

// Блок тестирования
// 1. Создание задач, в том числе в случае, когда поле title пустое
setTask('title', 'description');
setTask('title1', 'description1');
setTask('title2', 'description2');
setTask('', 'description2');
showTask();

// Завершение задач, в том числе несуществующей
completeTask(1);
completeTask(4);
showTask();

// Удаление не работает в среде разработки Enterly, т.к. не поддерживается confirm
// deleteTask(2);
showTask();

// Очистка задач
clearTasks();
showTask();

// Очистка завершенны задач
showTask(completedTasks);
clearCompletedTasks();
showTask(completedTasks);
