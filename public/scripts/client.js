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
      result = result.concat(createTweetElement(tweet));
    }
    $('.tweets').append(result);
  };

  function getDate(milliseconds) {
    return new Date(milliseconds).toDateString();
  }

  const createTweetElement = function(tweet) {
    let user = tweet.user;
    let date = getDate(tweet.created_at);
    let $tweet = ` <article class="tweet"><header><div class="username-icon"><p>${tweet.user.name}</p><p><img src=${tweet.user.avatars}/></p></div><p class="handle">${user.handle}</p></header>
  <div><p class="tweet-content">${tweet.content.text}</p></div>
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
      .then(function (data) {
        console.log('Sucess: ', data);
       $('.tweets').append(createTweetElement(data));
        
        
      })
    }})
    
});