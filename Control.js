function amountCreeps() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    Memory.rolies = ["DroneBuilder", "DroneMiner1", "DroneMiner2", "DroneMineralMiner", "DroneRefiller", "DroneSeller", "DroneUpgrader", "Stormtrooper", "ScoutTrooper"];
    Memory.code = "Sith Empire is our future."

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        const sourceInRoom = room.find(FIND_MINERALS);
        if (room.controller && room.controller.my) {
            for (let i in Memory.rolies) {
                if ("DroneBuilder" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]]  = 1;
                if ("DroneMiner1" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]]   = 1;
                if ("DroneMiner2" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]]   = 1;
                if ("DroneRefiller" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                if (room.storage && (room.storage.store[RESOURCE_ENERGY] > 101000 || room.storage.store[RESOURCE_HYDROGEN] > 11000 || room.terminal.store[RESOURCE_ENERGY] < 5000)) {
                    if ("DroneSeller" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                } else {
                    if ("DroneSeller" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }
                if ("DroneUpgrader" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                if ("Stormtrooper" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]]  = 0;
                if (!sourceInRoom[0].ticksToRegeneration) {
                    if ("DroneMineralMiner" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 1;
                } else {
                    if ("DroneMineralMiner" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]] = 0;
                }
                if (!room.controller.sign || (room.controller.sign && room.controller.sign.text != Memory.code)) { 
                    if ("ScoutTrooper" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]]  = 1;
                } else {
                    if ("ScoutTrooper" == Memory.rolies[i]) Memory.room[room.name + ".amount." + Memory.rolies[i]]  = 0;
                }
            }
        }
    }
}
function amountCreepsIsLive() {
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Memory.rolies) {
                Memory.room[room.name + ".amountIsLive." + Memory.rolies[i]] = 0
            }
        }
    }
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                if (room.name == creep.memory.room) Memory.room[room.name + ".amountIsLive." + creep.memory.role]++;
            }
        }
    }
}

function runCreep() {
    let droneTask = null;
    const words = ["Peace", "is", "a", "lie.", "There", "is", "only", "Passion.", "Through", "Passion", "I", "gain", "Strength.", "Through", "Strength", "I", "gain", "Power.", "Through", "Power", "I", "gain", "Victory.", "Through", "Victory", "my", "chains", "are", "Broken.", "The", "Force", "shall", "free", "me."]
    const speakNow = words[Game.time%words.length];
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                switch (creep.memory.role) {
                    case "DroneBuilder":
                        creep.say(speakNow, true);
                        droneTask = require("DroneBuilder");
                        droneTask.control(creep)
                        break;
                    case "DroneMiner1":
                        creep.say(speakNow, true);
                        droneTask = require("DroneMiner");
                        droneTask.control(creep)
                        break;
                    case "DroneMiner2":
                        creep.say(speakNow, true);
                        droneTask = require("DroneMiner");
                        droneTask.control(creep)
                        break;
                    case "DroneRefiller":
                        creep.say(speakNow, true);
                        droneTask = require("DroneRefiller");
                        droneTask.control(creep)
                        break;
                    case "DroneUpgrader":
                        creep.say(speakNow, true);
                        droneTask = require("DroneUpgrader");
                        droneTask.control(creep)
                        break;
                    case "Stormtrooper":
                        creep.say(speakNow, true);
                        droneTask = require("Stormtrooper");
                        droneTask.control(creep)
                        break;
                    case "ScoutTrooper":
                        creep.say(speakNow, true);
                        droneTask = require("ScoutTrooper");
                        droneTask.control(creep)
                        break;
                    case "DroneMineralMiner":
                        creep.say(speakNow, true);
                        droneTask = require("DroneMineralMiner");
                        droneTask.control(creep)
                        break;
                    case "DroneSeller":
                        creep.say(speakNow, true);
                        droneTask = require("DroneSeller");
                        droneTask.control(creep)
                        break;
                }
            }
        }
    }
}
const Control = {
    control(colony) {
        amountCreeps();
        amountCreepsIsLive();
        runCreep();
    }
}
module.exports = Control;