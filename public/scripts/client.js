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
  }
  const renderTweets = function(tweets) {
    let result = "";
    for (let tweet of tweets) {
      result = createTweetElement(tweet).concat(result);
    }
    $('.tweets').empty();
    $('.tweets').append(result);
  };

  function getDate(milliseconds) {
    return new Date(milliseconds).toDateString();
  }
  const escape = function(string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML
  }

  const createTweetElement = function(tweet) {
    let user = tweet.user;
    let date = getDate(tweet.created_at);
    let $tweet = ` <article class="tweet"><header><div class="username-icon"><p>${escape(tweet.user.name)}</p><p><img src=${escape(tweet.user.avatars)}/></p></div><p class="handle">${escape(user.handle)}</p></header>
  <div><p class="tweet-content">${escape(tweet.content.text)}</p></div>
  <footer><p>${date}</p>
    <div>
      <i class="far fa-flag"></i><i class="far fa-heart"></i><i class="fas fa-retweet"></i>
    </div>
  </footer></article>`;

    return $tweet;
  };

  loadTweets();
//////////////////////////////
    $('.tweet-form').on('submit', function(event) {
      event.preventDefault();
      let data = $(this).serialize();
      if (data.length > 145) {
        alert('tweet is too Long');
      } else if (data.length <= 5) {
        alert('tweet is too short');
      } else if (data.length < 140 && data.length > 0) {
      $.ajax({method: 'POST',
              url: '/tweets',
            data: $(this).serialize(),
          })
      .then(function () {
        loadTweets();
        })
       
    }})
    

});