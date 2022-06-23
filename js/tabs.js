$(document).ready(function() {
  $('<style class="tab-styles">'+
    'a.active[data-toggle="tab"] {'+
    '  background-color: #f0f8ff;'+
    '}'+
    'a[data-toggle="tab"] {'+
    '  width: 100%;'+
    '}'+
    'a[data-toggle="tab"] li {'+
    '  text-align: left;'+
    '}'+
    'ul.typography li {'+
    '  margin: 10px 0px;'+
    '}'+
    'a.obvious {'+
    '  color: #007bff;'+
    '}'+
    '</style>').appendTo('head')


  if (location.hash !== '') {
    $('a[data-toggle="tab"]').removeClass('active');
    $('a[data-toggle="tab"][href="' + location.hash + '"]').tab('show').addClass('active');
  }

  $(window).on('hashchange', function(e) {
    $('a[data-toggle="tab"][href="' + location.hash + '"]').tab('show')
  });

  $('a[data-toggle="tab"]').on('click', function(e) {
    location.hash = $(e.target).closest('a').attr('href').substr(1);
  });

});
