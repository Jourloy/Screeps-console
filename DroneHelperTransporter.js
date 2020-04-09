function goGetResourceClear(creep) {
    if (Game.flags.Clear.room == undefined || Game.flags.Clear.room != undefined && Game.flags.Clear.room != creep.room) {
        creep.moveTo(Game.flags.Clear, { heuristicWeight: 1.2, range: 1, reusePath: 50 })
    } else {
        const ruinsInRoom = creep.room.find(FIND_RUINS, {
            filter: (structure) => {
                return structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if (ruinsInRoom.length > 0) {
            const ruins = creep.pos.findClosestByPath(FIND_RUINS, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(ruins, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else {
            const tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (tombstones.length > 0) {
                tombstones.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(tombstones[0], { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            } else {
                if (creep.room.storage) {
                    for (i in RESOURCES_ALL) {
                        if (creep.room.storage.store[RESOURCES_ALL[i]] > 0) if (creep.withdraw(creep.room.storage, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                    }
                } else {
                    if (creep.room.terminal) {
                        for (i in RESOURCES_ALL) {
                            if (creep.room.terminal.store[RESOURCES_ALL[i]] > 0) if (creep.withdraw(creep.room.terminal, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
                        }
                    }
                }
            }
        }
    }
}

function goGetResourceAttack(creep) {
    if (Game.flags.Attack.room == undefined || Game.flags.Attack.room != undefined && Game.flags.Attack.room != creep.room) {
        creep.moveTo(Game.flags.Attack, { heuristicWeight: 1.2, range: 1, reusePath: 50 })
    } else {
        const ruinsInRoom = creep.room.find(FIND_RUINS, {
            filter: (structure) => {
                return structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if (ruinsInRoom.length > 0) {
            const ruins = creep.pos.findClosestByPath(FIND_RUINS, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(ruins, { heuristicWeight: 1.2, range: 1, reusePath: 50 });
        } else {
            const tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (tombstones.length > 0) {
                tombstones.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(tombstones[0], { heuristicWeight: 1.2, range: 1, reusePath: 50 });
            } else {
                const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (d) => {
                        return (d.resourceType == "energy");
                    }
                });
                if (droppedEnergy.length > 0) {
                    droppedEnergy.sort((a, b) => b.amount - a.amount);
                    if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) creep.moveTo(droppedEnergy[0]);
                } else {
                }
            }
        }
    }
}

function doWork(creep) {
    if (creep.room.name == creep.memory.room) {
        for (i in RESOURCES_ALL) {
            if (creep.transfer(creep.room.storage, RESOURCES_ALL[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, { heuristicWeight: 1.2, range: 1, reusePath: 20 });
            } else {
                creep.memory.transferedEnergy += creep.store[RESOURCES_ALL[i]];
            }
        }
    } else {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
    }
}

const DroneHelperTransporter = {
    /** @param {Creep} creep **/
    control(creep) {
        if (creep.spawning) {
            creep.memory.room = creep.room.name;
            creep.memory.step = 0;
            creep.memory.transferedEnergy = 0;
        } else {
            if (creep.memory.step == undefined) creep.memory.step = 0;
            if (creep.memory.transferedEnergy == undefined) creep.memory.transferedEnergy = 0;
            creep.say(creep.memory.transferedEnergy / 1000 + "K")
            if (creep.store.getUsedCapacity() == 0) creep.memory.state = "getResource";
            if (creep.store.getUsedCapacity() == creep.store.getCapacity() || creep.store[RESOURCE_HYDROGEN] > 0) creep.memory.state = "doWork";

            if (creep.memory.state == 'getResource') {
                if (Game.flags.Clear) goGetResourceClear(creep);
                else if (Game.flags.Attack) goGetResourceAttack(creep);
            } else if (creep.memory.state == 'doWork') {
                if (creep.room.name == creep.memory.room) {
                    if (creep.ticksToLive <= Math.ceil(1500 - (600 / (creep.hitsMax / 50)) - 100 - 800) && creep.room.energyAvailable > creep.room.energyCapacityAvailable / 2) creep.memory.renew = true;
                    else if (creep.ticksToLive > 1480 || creep.room.energyAvailable < creep.room.energyCapacityAvailable / 2) creep.memory.renew = false;

                    if (creep.memory.renew) GoRenew(creep);
                    else {
                        doWork(creep);
                    }
                } else {
                    doWork(creep);
                }
            }
        }
    }
}
module.exports = DroneHelperTransporter;
