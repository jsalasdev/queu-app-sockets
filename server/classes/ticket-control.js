const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        this.tickets = [];
        this.latestFourTickets = [];

        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.latestFourTickets = data.latestFourTickets;
        } else {
            this.reset();
        }
    }

    next() {
        this.last++;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.write();
        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    scheduleTicket(desktop) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        } else {
            let ticketNumber = this.tickets[0].number;
            this.tickets.shift();
            console.log('NUMERO DE TICKET', ticketNumber);
            console.log('NUMERO DE DESKTOP', desktop);
            let newTicket = new Ticket(ticketNumber, desktop);

            this.latestFourTickets.unshift(newTicket);

            if (this.latestFourTickets.length > 4) {
                this.latestFourTickets.splice(-1, 1); //delete last ticket
            }

            console.log('Ultimos 4');
            console.log(this.latestFourTickets);

            this.write();

            return newTicket;

        }
    }

    reset() {
        this.last = 0;
        this.tickets = [];
        this.latestFourTickets = [];
        this.write();
        console.log('Se ha reinicializado el sistema.');
    }

    write() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            latestFourTickets: this.latestFourTickets
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}