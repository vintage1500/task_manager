let tasks = [];


// Перевод даты в красивый формат
function formatDateTimeRu(date) {
    return date.toLocaleString("ru-RU", {
        dateStyle: "full",
        timeStyle: "short"
    });
}

 
function createTask(title, description) {
    return {
        title,
        description,
        isCompleted: false,
        createdDate: new Date(),
        completedDate: null
    }
}

 
function setTask(title, description = '') {
    if (!title.trim()) {
        console.log('Ошибка. Для создания задачи укажите название');
        return
    }

    const task = createTask(title.trim(), description.trim());
    tasks.push(task);
    console.log((`Задача №${tasks.length} добавлена`));
}

 
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
        console.log(`Задача создана: ${formatDateTimeRu(task.createdDate)}`);

        if (task.completedDate !== null) {
            console.log(`Задача завершена: ${formatDateTimeRu(task.completedDate)}\n`);
        } else {
            console.log('Задача не завершена\n');
        } 
    })
}

 
function completeTask(index) {
    const task = tasks[index];

    if (!task) {
        console.log(`Задачи ${index + 1} не существует`);
        return;
    }

    if (task.isCompleted) {
        console.log(`Задача №${index + 1} уже завершена`);
        return;
    }

    task.isCompleted = true;
    task.completedDate = new Date();

    const completedCount = tasks.filter(task => task.isCompleted).length;

    console.log(`Задача №${index + 1} завершена`);
    console.log(`Количество завершенных задач: ${completedCount}`);
}


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


function getTaskDescriptions(tasks) {
    const taskDescriptions = tasks.map(task => task.description);
    return taskDescriptions;
}


function getLongTasks(tasks) {
    const longTasks = tasks.filter(task => task.title.length > 10 || task.description.length > 10);
    return longTasks;
}


function getTaskByDateRange(startDate, endDate, isCompleted = false) {
    let matchedTask  = tasks.filter(task => {
        const matchStatus = task.isCompleted === isCompleted;
        if (!matchStatus) return false;

        const startTs = startDate.getTime();
        const endTs = endDate.getTime();

        const createTs = task.createdDate.getTime();
        const matchCreateDate = createTs >= startTs && createTs <= endTs;

        if (isCompleted) {
            const completeTs = task.completedDate?.getTime();
            if (!completeTs) return false; 

            return matchCreateDate && completeTs <= endTs;
        } 

        return matchCreateDate;;
    });

    return matchedTask;
}


function clearShortTasks() {
    tasks = tasks.filter(task => task.title.length >= 5);
    console.log('Задачи с названием менее 5 символов удалены');
}


function updateTitle(index, newTitle) {
    const task = tasks[index];
    if (!task) {
        console.log('Задачи не существует')
        return;
    }
    tasks[index].title = newTitle;
    console.log(`Название задачи № ${index + 1} было изменено`);
}


// Блок тестирования
console.log('Начало тестирование. \nБлок 1. Создание корректных и некорректных задачэ');
setTask('task 1', 'description of task 1');
setTask('task 2', 'description of task 2');
setTask('task 3', 'description of task 3');
setTask('task', 'description of task 4');
setTask('', 'description of task with empty title');
console.log('========================================================');


console.log('Блок 2. Завершение существующей 2 и несуществующий 5 задачи.');
completeTask(1);
completeTask(4);
console.log('========================================================');


console.log('Блок 3. Вывод текущих и завершенных задач.');
showTask();
showTask(true);
console.log('========================================================');


console.log('Блок 4. Удаление 3 задачи. Вывод обновленного списка задач');
// deleteTask(2);
// showTask();
console.log('Блок не работает в рамках VS code или Enterly');
console.log('========================================================');


console.log('Блок 5. Вывод массива описаний задач');
console.log(getTaskDescriptions(tasks));
console.log('========================================================');


console.log('Блок 6. Вывод длинных задач (с длинной title или description больше 10)');
console.log(getLongTasks(tasks));
console.log('========================================================');


console.log('Блок 7. Тестирование фильтрации по датам и статусу');
// Создаем временные метки 6 секунд назад и 6 секунд вперед
const now = new Date();
const pastDate = new Date(now.getTime() - 60000);
const endDate = new Date(now.getTime() + 6000);

const currentActive = getTaskByDateRange(pastDate, endDate);
console.log(currentActive); // 3 незавершенных задачи

const currentCompleted = getTaskByDateRange(pastDate, endDate, true);
console.log(currentCompleted); // 1 завершенная задача

// Проверка на устаревшие даты
const oldStartDate = new Date("2020-01-01");
const oldEndDate = new Date("2020-12-31");
const oldTasks = getTaskByDateRange(oldStartDate, oldEndDate);
console.log(oldTasks); // пустой массив 
console.log('========================================================');


console.log('Блок 8. Удаление задач с коротким title. Вывод отфильтрованного массива');
clearShortTasks();
showTask();
console.log('========================================================');


console.log('Блок 9. Смена title у задачи')
updateTitle(0, 'new name');
showTask()
console.log('========================================================');


console.log('Блок 10. Очистка завершенных задач. Вывод текущих и завершенных задач');
clearTasks(true);
showTask();
showTask(true);
console.log('========================================================');


console.log('Блок 11. Очистка всех задач. Вывод текущих и завершенных задач');
completeTask(1);
clearTasks();
showTask();
showTask(true);
