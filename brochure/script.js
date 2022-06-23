// https://abduzeedo.com/flipping-book-css-and-jquery
var open = false;

var speed = 1000
$(document).ready(function () {

  $("#cover").click(function () {
    $(this).transition({rotateY:"-180deg"},speed,"ease");
    $("#backcover").transition({rotateY:"0deg"},speed,"ease");
  })

  $("#centerflip").click(function () {
    $(this).transition({rotateY:"180deg"},speed,"ease", function() {
      open = true;
    });
    $("#centerback").transition({rotateY:"0deg"},speed,"ease");

  })

  $("article").click(function () {
    if(open){
      $("#centerback").transition({rotateY:"-180deg"},speed,"ease");
      $("#centerflip").transition({rotateY:"0deg"},speed,"ease", function() {
        $("#backcover").transition({rotateY:"180deg"},speed,"ease");
        $("#cover").transition({rotateY:"0deg"},speed,"ease", function() {
          open= false;
        });
      });
    }
  });
});
