const fs = require('fs');
const path = require('path');

const wdir = path.join(__dirname, '../../events'); 

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(wdir);
        for (const folder of eventFolders) {
            const eventFiles = fs
                .readdirSync(`${wdir}/${folder}`)
                .filter(file => file.endsWith('.js'));
            
            switch (folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(`${wdir}/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    };
                    break;
                default:
                    console.log(`No event folder matching ${folder} was found.`);
                    break;
            };

        };
    };
};