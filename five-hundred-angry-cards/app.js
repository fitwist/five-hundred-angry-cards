// TODO: сверстать таблицу плюшек с именами игроков для раздачи экрана

const { Telegraf } = require('telegraf')

const bot = new Telegraf('5144377543:AAEJOYV_FiZvUTtR2U0XiXuJ2UA5JEQ5vlA');

// Функция для генерирования случайного числа в диапазоне от n до m
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
};
var result = range(244, 807);

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Стартовая команда
bot.hears('/start', ctx => {
    console.log(ctx.from)
    let message = `Привет, ${ctx.message.from.first_name}! Это бот для игры в "500 злобных карт".`;
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Сдай белые",
                        callback_data: 'Белые карты'
                    },
                    {
                        text: "Досдай белую",
                        callback_data: '1 белая карта'
                    },
                    {
                        text: "Сдать красную",
                        callback_data: 'Красные карты'
                    },
                    {
                        text: "Правила",
                        callback_data: 'Правила'
                    },
                ],

            ]
        }
    })
})

// Бот сдает 10 белых карт
bot.action('Белые карты', ctx => {
    console.log(ctx.from)
    let message = `Держи. Лайфхак: чтобы управлять своими карточками, перешли все, что я сдал, в избранное и постепенно удаляй использованные карты. Если нужно еще немного карточек, набери "/start", а затем выбери кнопку "Досдай 1 белую карту"`;
    bot.telegram.sendMessage(ctx.chat.id, message);

    const shuffled = result.sort(() => 0.5 - Math.random());
    let n = 10;
    let selected = shuffled.slice(0, n);
    for (let i = 0; i < 10; i++) {
        bot.telegram.sendPhoto(ctx.chat.id, {
            source: `белые карточки/img${selected[i]}.jpg`
        })
    }
})

// Бот сдает 1 белую карту
bot.action('1 белая карта', ctx => {
    console.log(ctx.from)
    let message = `Держи:`;
    bot.telegram.sendMessage(ctx.chat.id, message);

    const a = randomIntFromInterval(244, 807);
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: `белые карточки/img${a}.jpg`
    })
})

// Бот сдает красную карту
bot.action('Красные карты', ctx => {
    console.log(ctx.from)
    let message = `Держи:`;
    bot.telegram.sendMessage(ctx.chat.id, message);

    const a = randomIntFromInterval(101, 242);
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: `красные карточки/img${a}.jpg`
    })
})

// Бот запускает третий шаг по кнопке
bot.action('Правила', ctx => {
    console.log(ctx.from)
    // Две стопки с красными и оставшимися после раздачи белыми картами кладутся в центр стола. 
    let message = `Всем игрокам раздается по 10 белых карт. Бот случайным образом выберет крайнего - он будет ходить первым и называться ведущим.\n\nВедущий берет верхнюю карту из красной стопки и вслух зачитывает то, что на ней написано: вопрос или историю, в которой есть пропуски.\n\nОстальные игроки выбирают из белых карт на руке наиболее подходящий ответ на вопрос или замену для пропуска. Выбранные карты они передают ведущему рубашкой вверх, чтобы до самого конца раунда он не узнал, кто является автором того или иного ответа.\n\nВедущий перемешивает полученные карты с ответами и зачитывает их всем остальным. Для достижения максимального эффекта рекомендуем перед каждым ответом снова зачитывать красную карту. Прочитав все ответы, ведущий выбирает самый смешной. Давший этот ответ игрок получает плюшку.\n\nВсе участники получают белые карты, чтобы у каждого на руке снова стало 10 карт. Ход переходит к следующему игроку по часовой стрелке.\n\nПЛЮШКИ\nИгра идет до 10 плюшек. Вести счет можно при помощи счетчика, которую обновляет ведущий, в общем чате. Игроки начинают движение с отметки 0 на счетчике и за каждую победу перемещаются на одно деление вперед.\n\nЛюбой игрок может в любой момент потратить одну из заработанных плюшек на обмен карт: он должен сбросить все карты из своей руки и набрать новые 10 карт из белой стопки.`;
    bot.telegram.sendMessage(ctx.chat.id, message);
})

bot.launch();