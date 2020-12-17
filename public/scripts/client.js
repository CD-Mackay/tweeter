/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const loadTweets = function() {
    $.ajax({method: 'GET',
            url: '/tweets'})
            .then(function(data) {
              renderTweets(data);
            })
  };

  const renderTweets = function(tweets) {
    let result = "";
    for (let tweet of tweets) {
      result = createTweetElement(tweet).concat(result);
    }
    $('.tweets').empty();
    $('.tweets').append(result);
  };

  function getDate(milliseconds) {
    let current = Date.now();
    let elapsed = ((current - milliseconds) / 1000) / 31536000;
    console.log(elapsed / 30);

    if (elapsed > 1) {
      return Math.floor(elapsed) + " year ago";
    }
    elapsed = elapsed * 12;
    if (elapsed > 1) {
      return Math.floor(elapsed) + " months ago";
    }
    elapsed = elapsed * 30;
    if (elapsed > 1) {
      return Math.floor(elapsed) + " days ago";
    }
    elapsed = elapsed * 24;
    if (elapsed > 1) {
      return Math.floor(elapsed) + " hours ago";
    }
    elapsed = elapsed * 60;
    if (elapsed > 1) {
      return Math.floor(elapsed) + " minutes ago";
    }
    elapsed = elapsed * 60;
    return Math.floor(elapsed) + " seconds ago";
  };
// Prevent cross-site scripting
  const escape = function(string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML
  };

  const createTweetElement = function(tweet) {
    let user = tweet.user;
    let date = getDate(tweet.created_at);
    let $tweet = `<article class="tweet"><header><div class="username-icon">
                  <p><img src=${escape(tweet.user.avatars)}/></p><p>${escape(tweet.user.name)}</p></div>
                  <p class="handle">${escape(user.handle)}</p></header><div><p class="tweet-content">
                  ${escape(tweet.content.text)}</p></div><footer><p>${date}</p><div>
                  <i class="far fa-flag"></i><i class="far fa-heart"></i><i class="fas fa-retweet">
                  </i></div></footer></article>`;
    return $tweet;
  };

  loadTweets();
// End of initial page loading

// Submitting new tweets
    $('.tweet-form').on('submit', function(event) {
      event.preventDefault();
      let data = $(this).serializeArray();
      let tweetLength = data[0].value.length;
      if (tweetLength > 140) {
        $('#error-message').slideUp(200);
        $('#error-message').text('Take it easy Hemingway, 140 characters at most.');
        $('#error-message').slideDown(200);
      } else if (tweetLength <= 0) {
        $('#error-message').slideUp(200);
        $('#error-message').text('You could consider actually writing something...');
        $('#error-message').slideDown(200);
      } else if (tweetLength <= 140 && tweetLength > 0) {
        $('#error-message').slideUp(200);
      $.ajax({method: 'POST',
              url: '/tweets',
            data: $(this).serialize(),
          })
      .then(function () {
        $('textarea').val('');
        $('.counter').val('140');
        loadTweets();
        });
       // Navigate to and focus on textarea when clicking compose tweet button. 
    }});
    $('.arrow-nav').on('click', function() {
      event.preventDefault();
      $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
      setTimeout(() => {
        $('.tweet-form').children('#tweet-text').focus(); 
      }, 0);
      
    });

});