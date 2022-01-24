var num_cards = 8;
var face_down = [];

$(".num_input").hide();
initialize_cards(num_cards);

$(".go").click(function(){
    $("h1").text("Click Any Red Card")
    num_cards = $("#num").val();
    $(".cards-row").empty();
    console.log(num_cards);
    initialize_cards(num_cards);
    $(".num_input").hide();
})

function initialize_cards(num_cards) {
  for (var i = 0; i < num_cards; i++) {
    add_button(i);
    face_down.push(true);
  }
}

function add_button(id) {
  $(".cards-row").append('<div type="button" id=' + id + ' class="card"></div>')
}

$(document).on("click", ".card", function() {
  if (!$(this).hasClass("face-up")) {
    var id = this.id;
    animateFlip(id);
    face_down[id] = false;
    if (id < num_cards - 1) {
      var next_id = parseInt(id) + 1;
      setTimeout(function() {
        animateFlip(next_id);
      }, 50);
      face_down[next_id] = !face_down[next_id];
    }
  } else {
    console.log("can't click that")
  }
  if (face_down.reduce((a, b) => a + b, 0) === 0) {
    gameOver();
  }
})

function animateFlip(id) {
  var self = $("#" + id);
  self.addClass("pressed");

  setTimeout(function() {
    self.removeClass("pressed");
  }, 100);

  $("#" + id).toggleClass("face-up");
}

function gameOver() {
  console.log("game over");
  $("h1").text("You did it! Play again?")
  $(".num_input").show();
  face_down = [];
}
