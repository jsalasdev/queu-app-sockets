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
            var err = 'No hay tickets';
            if (res === err) {
                label.text(err);
                alert(err);
                return;
            }
            label.text(res.number);
        });

    });


}