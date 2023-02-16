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
    const warningParagraph = $('.request p');
    if (warningParagraph.attr('id') === 'warning') {
        warningParagraph.remove();
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
            'font-size': '$box-heading-size',
            'font-weight': '600',
        });
        e.preventDefault();
    }

});