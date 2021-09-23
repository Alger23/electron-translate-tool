const electron = require("electron");
const {ipcMain} = electron;
const translate = require('@vitalets/google-translate-api');

const RequestGoogleTranslateEventName = 'RequestGoogleTranslate';
const ReplyGoogleTranslateEventName = 'ReplyGoogleTranslate';
const ErrorGoogleTranslateEventName = 'ErrorGoogleTranslate';

const initGoogleTranslate = ()=>{
    ipcMain.on('translate', (event, args) => {
        console.log(args)
        translate(args.text, {from: args.from, to: args.to}).then(res => {
            console.log(res.text);
            console.log(res.from.language.iso);
            //=> nl

            event.reply('translated', res.text);
        }).catch(err => {
            console.error(err);
        });
    });

    ipcMain.on(RequestGoogleTranslateEventName, async (event, args) => {
        if (typeof args.to === 'object' && Array.isArray(args.to)) {
            await Promise.all(
                args.to.map(to => translate(args.text, {
                    from: args.from,
                    to: to
                }))
            )
                .then(data => {
                    let message = {};
                    data.map((x, i) => message = {
                        ...message,
                        [args.to[i]]: {
                            from: args.from,
                            to: args.to[i],
                            text: x.text,
                            pronunciation: x.pronunciation,
                            autoCorrected: x.from.text.autoCorrected,
                            correct: x.from.text.value,
                            didYouMean: x.from.text.didYouMean
                        }
                    });
                    event.reply(ReplyGoogleTranslateEventName, message);
                })
                .catch(e => event.reply(ErrorGoogleTranslateEventName, e));
        }
    });
};

module.exports = initGoogleTranslate;