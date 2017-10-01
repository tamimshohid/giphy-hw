
//Sports topic to show in webpage
var topics = ['NFL', 'MLB', 'Cricket', 'Soccer', 'Golf', 'Football Stadium'];

// This is the Store function: include URL for gifs and display them
function callGif () {
	// Clear previous topic
	$('#giphy-div').html('');
  	var topicName = $(this).text();
  	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=dc6zaTOxFJmzC&limit=10";
	// Ajax syntax to get gif URL from API
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;
		
		// for loop, create div with rating and gif.
		for (var i = 0; i < results.length; i++) {
			var topicDiv = $('<div class="gif-display">');
			var p = $('<p>').text('Rating: ' + results[i].rating);
			var topicImage = $('<img>');
			var animate = results[i].images.fixed_height.url;
			var still = results[i].images.fixed_height_still.url;
			topicImage.attr({
				class: 'gif',
				src: still,
				'data-animate': animate,
				'data-still': still,
				'data-state': 'still'
			});
			// This will add the gif and ratings to the page
			topicDiv.append(p);
			topicDiv.append(topicImage);
			$('#giphy-div').prepend(topicDiv);
			$('#giphy-div').show();
		}
		// Pause and play logic
		$('.gif').on('click', function() {
			var state = $(this).attr('data-state');
			console.log(state);
			if (state === 'still') {
				$(this).attr({
					'data-state': 'animate',
					src: $(this).attr('data-animate')
				});
			} else {
				$(this).attr({
					'data-state': 'still',
					src: $(this).attr('data-still')
				});
			}
		});
	});
}

// Store function: generate button
function generateButton (q) {
	var button = $('<button class="btn sports topic-button">' + q + '</button>');
	button.attr('id', q);
	$('#button-div').append(button);
}
	
$( document ).ready(function() {

	// Generate topic buttons
	for (var i = 0; i < topics.length; i++) {
		var arr = topics[i];
		generateButton (arr);
	}

	// Add event to existing buttons
	$('.topic-button').on('click', function() {
		callGif.call(this);

	});
	
	// This will allow user to create new button for new topic
	$('form').on('submit', function (event) {
		event.preventDefault();
		
		var userTopic = new_topic.value;
		new_topic.value = '';
		topics.push(userTopic);
		generateButton (userTopic);
		
		$('#' + userTopic).on('click', function() {
			callGif.call(this);

		});
		
	});


});