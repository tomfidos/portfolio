/* Top menu handling */
$('.hamburger').click(function() {
    $('.menu').toggleClass('open');
    $(this).toggleClass('hide');
});

$('.menu-close').click(function() {
    $('.menu').toggleClass('open');
    $('.hamburger').toggleClass('hide');
});

/* Appointment form handling
    - form validation -     */
$('#appointment-button').click(function(e) {
    const infoParagraph = $('.request p');
    const id = infoParagraph.attr('id');
    if (id === 'warning' || id === 'error' || id === 'feedback') {
        infoParagraph.remove();
    }

    let areFieldsFilledIn = true;
    $('.for-validation').each(function() {
        if ($(this).val() === '' || $(this).val() === 'select service') {
            areFieldsFilledIn = false;
            $(this).css('border', '1px solid red');
        } else if ($(this).css('border-color', 'red')) {
            $(this).css({
                'border': '0',
                'border-bottom': '1px solid white',
            });
        }
    });

    if (!areFieldsFilledIn) {
        $('.request').append('<p id="warning">complete all form fields</p>');
        $('.request').last().css({
            'color': 'darkred',
            'text-transform': 'uppercase',
            'font-size': '1em',
            'font-weight': '600',
        });
    } else {
        submitForm();
    }

    e.preventDefault();
});

/* Appointment form handling
    - form submission -     */
const submitForm = () => {

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            'name': $('#name').val().trim(),
            'email': $('#email').val().trim(),
            'service': $('#service').val(),
            'phone': $('#phone').val().trim(),
            'date': $('#date').val(),
            'time': $('#time').val(),
            'message': $('#message').val(),
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.errors) {
            console.error('Error: ', data.messages.join('; '));
            $('.request').append('<p id="error">Wysłanie formularza się nie powiodło</p>');
            $('#error').css({
                'color': 'darkred',
                'text-transform': 'uppercase',
                'font-size': '1em',
                'font-weight': '600',
            });
        } else {
            $('.request').append(`<p id="feedback">Dziękujemy ${data.appointment.name}. Zostałeś zapisany!</p>`);
            $('#feedback').css({
                'font-size': '1em',
                'text-transform': 'capitalize',
                'color': 'white',
            });
        }
    })
    .catch(error => {
        console.error('Error: ', error);
    });

}
