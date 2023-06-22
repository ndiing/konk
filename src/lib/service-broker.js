const config = require("./config");
const EventEmitter = require("events");
const { get } = require("./mssql");
const { VarChar, MAX } = require("mssql/msnodesqlv8");

const serviceBroker = new EventEmitter();
serviceBroker.setMaxListeners(0);

let receiving = false;
async function receive() {
    if (receiving) {
        return;
    }
    receiving = true;
    do {
        try {
            const pool = await get("service-broker", config.mssql.config);
            const request = pool.request();
            const response = await request.execute("ksp_receive");
            for (const { message_body } of response.recordset) {
                for (const { eventName, ...message } of JSON.parse(message_body)) {
                    serviceBroker.emit(eventName, message);
                }
            }
        } catch (error) {
            receiving = false;
            console.error(error)
            break;
        }
    } while (true);
}

async function send(eventName, message) {
    message.eventName = eventName;
    try {
        const pool = await get("service-broker", config.mssql.config);
        const request = pool.request();
        request.input("message", VarChar(MAX), JSON.stringify([message]));
        const response = await request.execute("ksp_send");
        return response;
    } catch (error) {
        throw error;
    }
}

serviceBroker.send=send
serviceBroker.receive=receive

module.exports = serviceBroker

// serviceBroker.on('inbox',console.log)
// serviceBroker.receive()
// serviceBroker.send('inbox',{user:'name'})
// serviceBroker.send('inbox',{user:'name'})
// serviceBroker.send('inbox',{user:'name'})
// serviceBroker.send('inbox',{user:'name'})