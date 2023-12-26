import subprocess
from concurrent.futures import ThreadPoolExecutor

def run_flask():
    subprocess.run(['python', 'serv_flask.py'])

def run_telegram_bot():
    subprocess.run(['python', 'main_start.py'])

with ThreadPoolExecutor(max_workers=2) as executor:
    executor.submit(run_flask)
    executor.submit(run_telegram_bot)