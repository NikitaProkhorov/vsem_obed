// Функция для запроса меню из базы данных по выбранной дате (индексу)
function fetchMenu(dayId) {
    const menuItemsContainer = document.getElementById('menuItems');
    menuItemsContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой нового меню
        
        fetch(`http://127.0.0.1:5000/get_menu/${dayId}`)
            .then(response => {
                console.log(response); // Вывод объекта ответа в консоль
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(menuData => {
                console.log(menuData); // Вывод данных в консоль
                
                // const items = document.querySelectorAll('.item');
                const menuItemsContainer = document.getElementById('menuItems'); // Получаем контейнер для меню

                if (menuData.menu && menuData.menu.length > 0) {
                    menuData.menu.forEach((menuItem, index) => {
                        // Создаем элементы .item для каждого блюда
                        const newItem = document.createElement('div');
                        newItem.classList.add('item');
                        
                        const itemId = `item_${menuItem[0]}`; // Предполагается, что у каждого блюда есть уникальный ID в базе данных
                        newItem.setAttribute('id', itemId);
                        
                        const photoElement = document.createElement('img');
                        photoElement.classList.add('img');
                        photoElement.src = '/2.jpg';

                        const nameElement = document.createElement('div');
                        nameElement.classList.add('name');
                        nameElement.textContent = menuItem[4]; // Изменено на индекс названия блюда в массиве

                        const descElement = document.createElement('div');
                        descElement.classList.add('desc');
                        descElement.textContent = menuItem[5]; // Изменено на индекс описания блюда в массиве

                        const butElement = document.createElement('div'); // Создаем блок для кнопки
                        butElement.classList.add('but');

                        const btnElement = document.createElement('button');
                        btnElement.classList.add('btn');
                        btnElement.textContent = menuItem[6]+" ₽"; // Изменено на индекс цены блюда в массиве

                        // Добавляем созданные элементы в новый элемент .item
                        newItem.appendChild(photoElement);
                        newItem.appendChild(nameElement);
                        newItem.appendChild(descElement);
                        
                        butElement.appendChild(btnElement); // Добавляем кнопку в блок для кнопки
                        newItem.appendChild(butElement); // Добавляем блок для кнопки в .item
                        
                        newItem.addEventListener('click', function() {
                        window.location.href = `prod.html?itemId=${menuItem[0]}`; // Перенаправление на страницу prod.html с параметром itemId
                        });

                        btnElement.addEventListener('click', function(event) {
                            event.stopPropagation(); // Предотвращение всплытия события
                            
                            // Получение информации о товаре
                            const productId = menuItem[0]; // ID товара
                            const productName = menuItem[4]; // Название товара
                            const userId = getUserID(); // Получение ID пользователя (например, с помощью Telegram API)

                            // Формирование объекта с данными о товаре
                            const productData = {
                                user_id: userId,
                                name: productName,
                                count: 1 // Предположим, что добавляется по одному товару
                            };

                            // Отправка данных на сервер
                            fetch('http://127.0.0.1:5000/add_to_card', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(productData)
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('Товар успешно добавлен в корзину:', data);
                                // Здесь можно добавить логику для обновления интерфейса, если требуется
                            })
                            .catch(error => {
                                console.error('Ошибка при добавлении товара в корзину:', error);
                            });
                        });
                        
                        const menuItemsContainer = document.getElementById('menuItems');
                        menuItemsContainer.appendChild(newItem); // Добавляем новый .item в контейнер меню
                    });
                } else {
                    console.error('Массив меню пуст или отсутствует.');
                }
            })
        .catch(error => {
            console.error('Ошибка при получении меню:', error);
        });
    }


