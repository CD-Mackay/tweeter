$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let countRemaining = 140 - this.value.length;
    $('#tweet-text').siblings().children('.counter').text(countRemaining);
    if (countRemaining < 0) {
      $('#tweet-text').siblings().children('.counter').css('color', 'red');
    } else if (countRemaining > 0) {
      $('#tweet-text').siblings().children('.counter').css('color', 'black');
    }
  });
});