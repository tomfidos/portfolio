/* Top menu handling */
$('.hamburger').click(function() {
    $('.menu').toggleClass('open');
    $(this).toggleClass('hide');
});

$('.menu-close').click(function() {
    $('.menu').toggleClass('open');
    $('.hamburger').toggleClass('hide');
});
