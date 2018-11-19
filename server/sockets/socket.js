const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        callback(ticketControl.next());
    });

    client.emit('state', {
        now: ticketControl.getLastTicket(),
        latestFourTickets: ticketControl.getLastFourTickets()
    });

    client.on('scheduleTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                ok: false,
                msg: 'El escritorio es necesario'
            });
        }
        let scheduleTicket = ticketControl.scheduleTicket(data.desktop);
        callback(scheduleTicket);

        client.broadcast.emit('latest', {
            latestFourTickets: ticketControl.getLastFourTickets()
        });

    });

});