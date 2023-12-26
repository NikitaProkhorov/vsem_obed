const startDate = new Date("2023-12-04"); // Задайте дату начала индексации
let currentIndex = 1;
let currentDate = new Date();

while (startDate < currentDate) {
    if (startDate.getDay() !== 0 && startDate.getDay() !== 6) { // Пропускаем выходные
        currentIndex = (currentIndex % 20) + 1; // Обновляем индекс с учетом перехода на следующую "неделю"
    }
    startDate.setDate(startDate.getDate() + 1);
}

const dateScrollContainer = document.getElementById('dateScroll');
const daysInWeek = 5; // Рабочие дни с понедельника по пятницу
const totalDays = 30; // Всего рабочих дней для отображения
const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];

for (let i = 0; i < totalDays; i++) {
    const dayOfWeek = startDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Работаем только с понедельником-пятницей
        const newDateElement = document.createElement('div');
        newDateElement.classList.add('card');
        
        const formattedDate = `${days[dayOfWeek - 1]} ${('0' + startDate.getDate()).slice(-2)}.${('0' + (startDate.getMonth() + 1)).slice(-2)}.${String(startDate.getFullYear()).slice(-2)}`;

        newDateElement.innerHTML = `<h2>${formattedDate}</h2>`;
        newDateElement.setAttribute('id', currentIndex); // Устанавливаем id кнопки
        
        // Добавляем обработчик события для нажатия на элемент card
        newDateElement.addEventListener('click', function() {
        const prevSelectedDateElement = document.querySelector('.selected');
        if (prevSelectedDateElement) {
            prevSelectedDateElement.classList.remove('selected'); // Снимаем выделение с предыдущей выбранной даты
        }
        this.classList.add('selected'); // Выделяем новую дату
        });
        
        dateScrollContainer.appendChild(newDateElement);
        currentIndex = (currentIndex % 20) + 1; // Обновляем индекс с учетом перехода на следующую "неделю"
    }
    startDate.setDate(startDate.getDate() + 1);
}

    // Обработчик события для нажатия на выбранную дату
    const dateElements = document.querySelectorAll('.card');
    dateElements.forEach(dateElement => {
        dateElement.addEventListener('click', function() {
            const dayId = this.id; // Получаем ID выбранной даты (индекс)
            fetchMenu(dayId); // Запрашиваем меню из базы данных по индексу дня
        });
    });

    window.addEventListener('DOMContentLoaded', () => {
        const firstDateElement = document.querySelector('.card'); // Находим первый элемент с классом .card
        if (firstDateElement) {
            firstDateElement.click(); // Вызываем событие click для первой даты
        }
    });