const axion = require('axios');

const catjam = "<a:catjamhaha:1158894525113180300>";
const pepeLove ="<:pepe_love_you:1158896175483715645>";
const pepeGamer = "<a:peepogamer:1158894700535750687>";
const pepeClap ="<a:pepeclapanimated:1158895411055042691>";
const hermeticists ="<:hermeticists:1158881787724976158>";
const puppyPog = "<a:puppypog:1158894753895682151>";
const pepeDJ = "<a:pepeparty:1158895103956496434>";
const turtleParty = "<a:turtle_party:1159830775714287646>";

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {
        if (message.author.bot) 
            return;

        console.log(message.content);
        const { channel, content } = message;
        
        if (content.startsWith("!")) {
            const cmd = content.split(" ")[0].slice(1);
            let replyText = "";
            switch(cmd) {
                case "pablo":
                    replyText = `${catjam}${pepeLove}${pepeGamer}${pepeLove}${catjam}`;
                    break;
                
                case "dani":
                    replyText = `${pepeDJ}${pepeClap}${turtleParty}${pepeClap}${pepeDJ}`;
                    break;

                case "christian":
                    replyText = `${puppyPog}${pepeDJ}${catjam}${pepeDJ}${puppyPog}`;
                    break;

                default: break;
            };
            if (replyText !== "")
                channel.send(replyText);
        };

        if (message.reply && message.mentions.has(client.user)) {
            axion.get(`https://donna.hsd.services/api/v1/veel-tark/ni/?x-api-key=ush88989-ahd986t-auhcd7787-x7&input=` + message.content)
                .then(res => {
                    console.log(res.data);
                    message.reply(res.data.text);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    },
};