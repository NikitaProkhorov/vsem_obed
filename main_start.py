from aiogram import Bot, Dispatcher, types
from aiogram.contrib.middlewares.logging import LoggingMiddleware
from aiogram.dispatcher.webhook import get_new_configured_app
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.utils import executor
from aiohttp import web

API_TOKEN = '6337067817:AAEDtjQwE9xDTkh6lfdNAg2wsBaJsqKk4zU'
NGROK_TUNNEL_URL = 'https://d3cb-185-107-94-207.ngrok-free.app'

bot = Bot(token=API_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)
dp.middleware.setup(LoggingMiddleware())




# async def on_startup(_):
#      await db_start()

# if __name__ == '__main__':

#     from handler.handler_start import dp
#     from FSM.FSM_admin import dp
    
#     executor.start_polling(dp, on_startup=on_startup, skip_updates=True)




async def on_startup(app):
    await bot.delete_webhook()


async def on_shutdown(app):
    pass


async def webhook(request):
    if request.path == f"/{API_TOKEN}":
        update = types.Update(**await request.json())
        await dp.process_updates([update])
        return web.Response()
    return web.Response(status=403)


def main():
    app = get_new_configured_app(dispatcher=dp, path=f"/{API_TOKEN}")
    app.on_startup.append(on_startup)
    app.on_shutdown.append(on_shutdown)
    app.router.add_post(f'/{API_TOKEN}', webhook)
    executor.start_polling(dp)


if __name__ == '__main__':
    from FSM.FSM_reg import dp
    main()