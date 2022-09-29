
$(document).ready(function() {
	var protocol = (window.location.hostname === 'localhost') ? 'http://' : 'https://';
	var socket = io.connect(protocol + window.location.host);

	var $homeTeamScore = $('#home-team-score'),
		$awayTeamScore = $('#away-team-score');

	$homeTeamScore.change(function() {
		var score = $(this).val();
		socket.emit('update-home-team-score', { score: score });
	});

	$awayTeamScore.change(function() {
		var score = $(this).val();
		socket.emit('update-away-team-score', { score: score });
	});

	$('#home-field-goal').click(function() {
		$homeTeamScore.val(parseInt($homeTeamScore.val()) + 3);
		$homeTeamScore.trigger('change');
	});
	$('#home-touchdown').click(function() {
		$homeTeamScore.val(parseInt($homeTeamScore.val()) + 6);
		$homeTeamScore.trigger('change');
	});
	$('#home-pat').click(function() {
		$homeTeamScore.val(parseInt($homeTeamScore.val()) + 1);
		$homeTeamScore.trigger('change');
	});
	$('#home-reset').click(function() {
		$homeTeamScore.val(0);
		$homeTeamScore.trigger('change');
	});

	$('#away-field-goal').click(function() {
		$awayTeamScore.val(parseInt($awayTeamScore.val()) + 3);
		$awayTeamScore.trigger('change');
	});
	$('#away-touchdown').click(function() {
		$awayTeamScore.val(parseInt($awayTeamScore.val()) + 6);
		$awayTeamScore.trigger('change');
	});
	$('#away-pat').click(function() {
		$awayTeamScore.val(parseInt($awayTeamScore.val()) + 1);
		$awayTeamScore.trigger('change');
	});
	$('#away-reset').click(function() {
		$awayTeamScore.val(0);
		$awayTeamScore.trigger('change');
	});


	$('#away-team-timeouts-up').click(function() {
		socket.emit('update-away-team-timeouts', { direction: 'up' });
	});
	$('#away-team-timeouts-down').click(function() {
		socket.emit('update-away-team-timeouts', { direction: 'down' });
	});
	$('#home-team-timeouts-up').click(function() {
		socket.emit('update-home-team-timeouts', { direction: 'up' });
	});
	$('#home-team-timeouts-down').click(function() {
		socket.emit('update-home-team-timeouts', { direction: 'down' });
	});

	$('#quarter-up').click(function() {
		socket.emit('update-quarter', { direction: 'up' });
	});
	$('#quarter-down').click(function() {
		socket.emit('update-quarter', { direction: 'down' });
	});

	$('#down-up').click(function() {
		socket.emit('update-down', { direction: 'up' });
	});
	$('#down-down').click(function() {
		socket.emit('update-down', { direction: 'down' });
	});
	$('#down-reset').click(function() {
		socket.emit('update-down', { value: 1 });
	});

	$('#playclock-play').click(function() {
		socket.emit('reset-playclock', { mode: 'play' });
	});
	$('#playclock-restart').click(function() {
		var value = 20;
		socket.emit('reset-playclock', { mode: 'restart', value: value });
	});

	$('#gameclock-play').click(function() {
		socket.emit('update-gameclock', { mode: 'play' });
	});
	$('#gameclock-reset').click(function() {
		socket.emit('update-gameclock', { mode: 'restart', min: '5', sec: '00' });
	});
	$('#gameclock-add-min').click(function() {
		socket.emit('update-gameclock', { mode: 'add-min'});
	});
	$('#gameclock-minus-min').click(function() {
		socket.emit('update-gameclock', { mode: 'subtract-min'});
	});

	$('#reset-all').click(function() {
		$('#playclock-restart').trigger('click');
		$('#gameclock-reset').trigger('click');
		$('#down-reset').trigger('click');
		$('#away-reset').trigger('click');
		$('#home-reset').trigger('click');

		$('#quarter-down').trigger('click');
		$('#quarter-down').trigger('click');
		$('#quarter-down').trigger('click');
		$('#quarter-down').trigger('click');

		$('#away-team-timeouts-up').trigger('click');
		$('#away-team-timeouts-up').trigger('click');
		$('#away-team-timeouts-up').trigger('click');
		$('#home-team-timeouts-up').trigger('click');
		$('#home-team-timeouts-up').trigger('click');
		$('#home-team-timeouts-up').trigger('click');

		$('#playclock-play').trigger('click');
	});
});
