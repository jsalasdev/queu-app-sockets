var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('state', function(data) {
    console.log(data);
    label.text(data.now);
});

$('button').on('click', function() {

    socket.emit('nextTicket', function() {
        console.log('CLIENTE: Preguntando nuevo ticket');
    }, function(nextTicket) {
        console.log(nextTicket);
        label.text(nextTicket);
    });
});