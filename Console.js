function params() {
    global.help = function (com) {
        help = []
        if (!com) {
            help.push("enable_ui()                     - Включает интерфейс")
            help.push("disable_ui()                    - Выключает интерфейс")
            help.push("info(roomNumber)                - Выводит информацио о комнате")
            help.push("  * roomNumber                  - Номер комнаты. НЕОБЯЗАТЕЛЬНО. По умолчанию: покажет все комнаты")
            help.push("claim(roomName)                 - Ставит задачу по захвату указанной комнаты")
            help.push("  * roomName                    - Имя комнаты.")
            help.push("calculate_time(time, tickRate)  - Конвертирует тики в настоящее время")
            help.push("  * time                        - Количество тиков.")
            help.push("  * tickRate                    - Тик рейт сервера. НЕОБЯЗАТЕЛЬНО. По умолчанию: 2.69")
            help.push("calculate_сreeps(body)          - Расчет стоимости и времени строительства крипа")
            help.push("  * body                        - Массив с телом крипа")
        } else if (com == "info") {
            help.push("1               - Первая комната")
            help.push("2               - Вторая комната")
            help.push("3               - Третья комната")
            help.push("4               - Четвертая комната")
            help.push("5               - Пятая комната")
            help.push("All             - Информация про все комнаты")
        }

        help = help.join("\n");
        return help
    };
    global.calculate_time = function (time, tickRate) {
        if (tickRate) {
            ticks = tickRate;
        } else {
            ticks = 2.69;
        }
        outTime = [];
        outTime.push("Количество тиков: " + time);
        outTime.push("Количество секунд: " + Math.round(time * ticks));
        if (time * ticks > 60) {
            outTime.push("Количество минут: " + Math.round(time * ticks / 60));
            if (time * ticks / 60 > 60) {
                outTime.push("Количество часов: " + Math.round(time * ticks / 60 / 60));
                if (time * ticks / 60 / 60 > 24) {
                    outTime.push("Количество дней: " + Math.round(time * ticks / 60 / 60 / 24));
                }
            }
        }
        outTime = outTime.join("\n");
        return outTime
    }
    global.enable_ui = function () {
        Memory.UI = true;
        return "UI теперь включен"
    };
    global.disable_ui = function () {
        Memory.UI = false;
        return "UI теперь выключен"
    };
    global.calculate_creeps = function (body) {
        if (body) {
            let price = 0;
            time = body.length * 3;

            for (let i in body) {
                if (body[i] == "move" || body[i] == "carry") {
                    price = price + 50;
                } else if (body[i] == "work") {
                    price = price + 100;
                } else if (body[i] == "attack") {
                    price = price + 80;
                } else if (body[i] == "ranged_attack") {
                    price = price + 150;
                } else if (body[i] == "heal") {
                    price = price + 250;
                } else if (body[i] == "tough") {
                    price = price + 10;
                } else if (body[i] == "claim") {
                    price = price + 600;
                }
            }

            result = [];
            result.push("------------------------")
            result.push("Время появления:");
            result.push("├ В тиках: " + time);
            
            if (time * 2.67 > 60) {
                result.push("├ В секундах: " + time * 2.67);
                result.push("└ В минутах: " + time * 2.67 / 60);
            } else {
                result.push("└ В секундах: " + time * 2.67);
            }
            result.push("Стоимость: " + price + " единиц энергии");
            result.push("------------------------")
            result = result.join("\n");

            return result
        } else {
            return "Тело не определено"
        }
    };
    global.info = function (roomNumber) {
        info = [];
        info.push("------------------------")

        if (roomNumber == 1) {
            info.push("Имя комнаты: " + Memory.room.One.Name)
            info.push("Уровень контроллера: " + Memory.room.One.Stats.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.One.Stats.Controller.progress);
            info.push("Количество энергии: " + Memory.room.One.Stats.energyCapacityAvailable);
        } else if (roomNumber == 2) {
            info.push("Имя комнаты: " + Memory.room.Two.Name)
            info.push("Уровень контроллера: " + Memory.room.Two.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Two.Controller.progress);
        } else if (roomNumber == 3) {
            info.push("Имя комнаты: " + Memory.room.Three.Name)
            info.push("Уровень контроллера: " + Memory.room.Three.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Three.Controller.progress);
        } else if (roomNumber == 4) {
            info.push("Имя комнаты: " + Memory.room.Four.Name)
            info.push("Уровень контроллера: " + Memory.room.Four.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Four.Controller.progress);
        } else if (roomNumber == 5) {
            info.push("Имя комнаты: " + Memory.room.Five.Name)
            info.push("Уровень контроллера: " + Memory.room.Five.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Five.Controller.progress);
        } else if (roomNumber == "All") {
            info.push("Имя комнаты: " + Memory.room.One.Name)
            info.push("Уровень контроллера: " + Memory.room.One.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.One.Controller.progress);
            info.push("------------------------")
            info.push("Имя комнаты: " + Memory.room.Two.Name)
            info.push("Уровень контроллера: " + Memory.room.Two.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Two.Controller.progress);
            info.push("------------------------")
            info.push("Имя комнаты: " + Memory.room.Three.Name)
            info.push("Уровень контроллера: " + Memory.room.Three.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Three.Controller.progress);
            info.push("------------------------")
            info.push("Имя комнаты: " + Memory.room.Four.Name)
            info.push("Уровень контроллера: " + Memory.room.Four.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Four.Controller.progress);
            info.push("------------------------")
            info.push("Имя комнаты: " + Memory.room.Five.Name)
            info.push("Уровень контроллера: " + Memory.room.Five.Controller.level);
            info.push("Прогресс контроллера: " + Memory.room.Five.Controller.progress);
        } else {
            return "Номер комнаты либо не указан, либо указан неверно"
        }

        info.push("------------------------")
        info = info.join("\n");

        return info
    }
}

let ConsoleSetting = {
    setting(console) {

        params();

    }
}

module.exports = ConsoleSetting;

//Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,{filter: {structureType: STRUCTURE_RAMPART}}).forEach(sites => sites.destroy());//Destroy structures