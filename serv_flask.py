import sqlite3
from flask import Flask, jsonify

app = Flask(__name__)

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

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5500'  # Укажите адрес вашего фронтенд-приложения
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run(debug=True)