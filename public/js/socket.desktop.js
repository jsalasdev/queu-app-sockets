var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
} else {
    var desktop = searchParams.get('escritorio');
    console.log(desktop);

    var label = $('small');

    $('h1').text('Escritorio ' + desktop);

    $('button').on('click', function() {

        socket.emit('scheduleTicket', { desktop: desktop }, function(res) {
            console.log(res);
            label.text(res.number);
        });

    });


}