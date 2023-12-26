import sqlite3
from flask import Flask, request, jsonify
from flask import send_from_directory

app = Flask(__name__)

@app.route('/js/<path:filename>')
def send_js(filename):
    return send_from_directory('js', filename)

@app.route('/get_menu/<int:day_id>', methods=['GET'])
def get_menu(day_id):
    # Подключение к базе данных
    conn = sqlite3.connect('Bot_vsem_obed.db')
    cursor = conn.cursor()

    # Выполнение запроса данных из таблицы Menu по полученному индексу
    cursor.execute('SELECT * FROM Menu WHERE day_id = ?', (day_id,))
    menu_data = cursor.fetchall()

    # Преобразование данных в формат JSON и возврат клиенту
    menu_json = jsonify({'menu': menu_data})

    # Закрытие соединения с базой данных
    conn.close()

    return menu_json

@app.route('/get_product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    # Подключение к базе данных
    conn = sqlite3.connect('Bot_vsem_obed.db')
    cursor = conn.cursor()

    # Выполнение запроса данных из таблицы Menu по полученному индексу
    cursor.execute('SELECT * FROM Menu WHERE id = ?', (product_id,))
    product_data = cursor.fetchall()

    # Преобразование данных в формат JSON и возврат клиенту
    product_json = jsonify({'prod_info': product_data})

    # Закрытие соединения с базой данных
    conn.close()

    return product_json

@app.route('/add_to_card', methods=['POST'])
def add_to_card():
    data = request.json
    user_id = data.get('user_id')
    product_name = data.get('name')
    product_count = data.get('count')

    # Подключение к базе данных
    conn = sqlite3.connect('Bot_vsem_obed.db')
    cursor = conn.cursor()

    # Выполнение запроса на добавление товара в таблицу Card
    cursor.execute('INSERT INTO Card (user_id, name, count) VALUES (?, ?, ?)', (user_id, product_name, product_count))
    conn.commit()

    # Закрытие соединения с базой данных
    conn.close()

    return jsonify({'message': 'Товар успешно добавлен в корзину'})

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5500'  # Укажите адрес вашего фронтенд-приложения
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run(debug=True)
