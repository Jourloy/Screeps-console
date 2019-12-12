var roleTower = {

    control(tower) {

        var towers = [];
        for (var i in Game.rooms){
            var room = Game.rooms[i];
            var roomTowers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers = towers.concat(roomTowers);
        }
        for (var i in towers){
            
            var tower = towers[i];
            var hostileCreeps = tower.room.find(FIND_HOSTILE_CREEPS, {
                filter: (creep) => {
                    return (creep.owner.username != "kotyara");
                }
            });

            var friendsCreeps = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 6, {
                filter: (creep) => {
                    return (creep.owner.username == "kotyara");
                }
            });

            var rampartsNear = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART) && structure.pos.inRangeTo(tower.pos, 10);
                }
            });

            var roads = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax;
                }
            });

            if (tower.room.controller.level == 3) {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 20000;
                    }
                });
                var ramparts = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 20000;
                    }
                });
            } else if (tower.room.controller.level == 4) {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 50000;
                    }
                });
                var ramparts = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 50000;
                    }
                });
            } else if (tower.room.controller.level == 5) {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 100000;
                    }
                });
                var ramparts = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 100000;
                    }
                });
            } else if (tower.room.controller.level == 6) {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 500000;
                    }
                });
                var ramparts = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 500000;
                    }
                });
            } else if (tower.room.controller.level == 7) {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 1000000;
                    }
                });
                var ramparts = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 1000000;
                    }
                });
            } else if (tower.room.controller.level == 8) {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 5000000;
                    }
                });
                var ramparts = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 5000000;
                    }
                });
            }

            var brokenRamparts = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 10000;
                }
            });

            if (hostileCreeps.length == 0) {
                if (tower.store[RESOURCE_ENERGY] > 699) {
                    if (brokenRamparts.length > 0) {
                        brokenRamparts.sort((a,b) => a.hits - b.hits);
                        tower.repair(brokenRamparts[0]);
                    } else if (roads.length > 0) {
                        roads.sort((a,b) => a.hits - b.hits);
                        tower.repair(roads[0]);
                    } else if (ramparts.length > 0) {
                        ramparts.sort((a,b) => a.hits - b.hits);
                        tower.repair(ramparts[0]);
                    } else if (walls.length > 0) {
                        walls.sort((a,b) => a.hits - b.hits);
                        tower.repair(walls[0]);
                    }
                }
            } else {
                if (hostileCreeps.length > 0) {
                    tower.attack(hostileCreeps[0]);
                }
            }
        }
    }
};

module.exports = roleTower;
