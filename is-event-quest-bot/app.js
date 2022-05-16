const { Telegraf } = require('telegraf')

const bot = new Telegraf('5382374380:AAF6tSF3jc1an3OOjUpIqXnKu2nw1wgdnfc');

// Стартовая команда
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Привет участникам квеста Infostart Event! На каждый шаг у тебя по 20 минут. Ты готов(-а) начать квест?', {
    })
})

yesArr = ['lf', 'да', 'Да']
// Бот принимает ответ "да" и инициирует первый шаг.
bot.hears(yesArr, ctx => {
    console.log(ctx.from)
    let message = `Шаг 1 из 4: Найди Елену Дуюн (на фото) возле стенда № 3, сложи все цифры на ее бейдже и напиши мне эту сумму. Сколько получилось?`;
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "images/elena-duyun.jpg"
    })
    bot.telegram.sendMessage(ctx.chat.id, message);
})

// Бот принимает ответ однозначный ответ 23
bot.hears('23', ctx => {
    console.log(ctx.from)
    let message = `Отлично, это верный ответ. \nШаг 2 из 4: Теперь подойди к стенду № 13 "Спортмастер Лаб" и попроси загадку про QR-код. Найди его и отсканируй. Где же он?`;
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Гардероб",
                        callback_data: 'Гардероб'
                    },
                    {
                        text: "Концертный зал",
                        callback_data: 'Концертный зал'
                    },
                    {
                        text: "Столовая",
                        callback_data: 'Столовая'
                    }
                ],

            ]
        }
    })
})

// Бот запускает третий шаг по кнопке
bot.action('Гардероб', ctx => {
    console.log(ctx.from)
    let message = `Получилось! \nШаг 3 из 4: прослушайте аудиозапись и напишите, кто такой Чавалах?`;
    bot.telegram.sendMessage(ctx.chat.id, message);
    bot.telegram.sendDocument(ctx.chat.id, {
        source: '/Users/helenkapatsa/Repositories/is-event-quest-bot/audio/max-payne-elevator-music.mp3'
    });
})

positionArr = ['Исполнительный директор', 'исполнительный директор', 'Chief Executive Officer', 'заместитель ГД', 'исполнительный директор Инфостарта']
// Бот запускает последний шаг с дополненной реальностью
bot.hears(positionArr, ctx => {
    console.log(ctx.from)
    let message = `Поздравляю! Дело за малым! \nШаг 4 из 4: А теперь скачайте AR-приложение ARPhoto и наведите камеру смартфона на доску возле стенда № 7. Что появляется около доски?`;
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Воздушный шарик",
                        callback_data: 'Воздушный шарик'
                    },
                    {
                        text: "Ананас",
                        callback_data: 'Ананас'
                    },
                    {
                        text: "Лампочка",
                        callback_data: 'Лампочка'
                    }
                ],

            ]
        }
    })
})

// Бот запускает третий шаг
bot.action('Ананас', ctx => {
    console.log(ctx.from)
    let message = `🎉 Вы выиграли! Мы подготовили подарки победителям, и твой ждет у стенда № 2.`;
    bot.telegram.sendMessage(ctx.chat.id, message);
})

bot.launch();