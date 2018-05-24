let $iframe = $('#iframe'); 
$iframe.on('load', function(){
  let html = $(window.frames['readme'].document).find('body').html();
  $('#main').html(html); 
});
