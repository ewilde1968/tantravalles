var defaultObjects = {
    items:new Array(
        {
            name:          "Holy Cross",
            size:           0
        },
        {
            name:          "Sword of Truth",
            size:           3,
            sharpness:      1,
            speed:          6,
            length:         10
        },
        {
            name:          "Tankard of Endless Ale",
            size:           0
        },
        {
            name:          "Great Axe",
            size:           3,
            sharpness:      1,
            speed:          8,
            length:         8
        },
        {
            name:          "Spear of Pain",
            size:           2,
            sharpness:      1,
            speed:          4,
            length:         12
        }
    ),
    creatures:new Array(
        {
            name:          "Hermit",
            size:           2,
            agility:        3,
            speed:          6,
            strength:       1,
            hitpoints:      12,
            items:          new Array('Holy Cross')
        },
        {
            name:          "Acolyte",
            size:           2,
            agility:        5,
            speed:          6,
            strength:       3,
            hitpoints:      12,
            items:          new Array('Sword of Truth')
        },
        {
            name:          "Innkeeper",
            size:           2,
            agility:        5,
            speed:          6,
            strength:       2,
            hitpoints:      12,
            items:          new Array('Tankard of Endless Ale')
        },
        {
            name:          "Scullion",
            size:           1,
            agility:        2,
            speed:          4,
            strength:       1,
            hitpoints:      6,
            items:          null
        },
        {
            name:          "Unicorn",
            size:           3,
            agility:        2,
            speed:          3,
            strength:       3,
            hitpoints:      12,
            items:          null
        },
        {
            name:          "Bugbear",
            size:           3,
            agility:        5,
            speed:          6,
            strength:       3,
            hitpoints:      12,
            items:          new Array('Great Axe')
        },
        {
            name:          "Goblin Leader",
            size:           2,
            agility:        4,
            speed:          4,
            strength:       2,
            hitpoints:      12,
            items:          new Array('Spear of Pain')
        },
        {
            name:          "Goblin Scout",
            size:           1,
            agility:        3,
            speed:          4,
            strength:       1,
            hitpoints:      12,
            items:          null
        },
        {
            name:          "Goblin Warrior",
            size:           2,
            agility:        5,
            speed:          5,
            strength:       2,
            hitpoints:      12,
            items:          null
        }
    ),
    encounters:new Array(
        {
            difficulty:"Tutorial",
            minsize:1024,
            name:"Holy Chapel",
            terrain:'valley',
            creatures:new Array("Hermit","Acolyte"),
            items:new Array("Holy Cross"),
            dwellings:new Array("Holy Chapel")
        },
        {
            difficulty:"Tutorial",
            minsize:1024,
            name:"Inn",
            terrain:'valley',
            creatures:new Array("Innkeeper","Scullion"),
            items:new Array("Tankard of Endless Ale"),
            dwellings:new Array("Inn")
        },
        {
            difficulty:"Tutorial",
            minsize:1024,
            name:"Forest Glade",
            terrain:'forest',
            creatures:new Array("Unicorn"),
            items:null,
            dwellings:null
        },
        {
            difficulty:"Tutorial",
            minsize:1024,
            name:"Chaos Caves",
            terrain:'mountain',
            creatures:new Array("Bugbear","Goblin Leader", "Goblin Scout", "Goblin Warrior", "Goblin Warrior"),
            items:null,
            dwellings:null
        }
    )
};

module.exports = defaultObjects;