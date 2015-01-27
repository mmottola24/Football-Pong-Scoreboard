$(document).ready(function() {
    var socket = io.connect('http://' + window.location.host);

    var $homeTeamScore = $('#home-team-score'),
        $awayTeamScore = $('#away-team-score');


    $('#away-team-update-score-up').click(function() {
        var score = parseInt($awayTeamScore.html());
        $awayTeamScore.html(score + 1);
    });

    $('#away-team-update-score-down').click(function() {
        var score = parseInt($awayTeamScore.html());
        if (score != 0) {
            $awayTeamScore.html(score - 1);
        }
    });

    $('#home-team-update-score-up').click(function() {
        var score = parseInt($homeTeamScore.html());
        $homeTeamScore.html(score + 1);
    });

    $('#home-team-update-score-down').click(function() {
        var score = parseInt($homeTeamScore.html());
        if (score != 0) {
            $homeTeamScore.html(score - 1);
        }
    });

    $('#home-field-goal').click(function() {
        $homeTeamScore.html(parseInt($homeTeamScore.html()) + 3);
    });
    $('#home-touchdown').click(function() {
        $homeTeamScore.html(parseInt($homeTeamScore.html()) + 6);
    });
    $('#home-pat').click(function() {
        $homeTeamScore.html(parseInt($homeTeamScore.html()) + 1);
    });
    $('#home-reset').click(function() {
        $homeTeamScore.html(0);
    });

    $('#away-field-goal').click(function() {
        $awayTeamScore.html(parseInt($awayTeamScore.html()) + 3);
    });
    $('#away-touchdown').click(function() {
        $awayTeamScore.html(parseInt($awayTeamScore.html()) + 6);
    });
    $('#away-pat').click(function() {
        $awayTeamScore.html(parseInt($awayTeamScore.html()) + 1);
    });
    $('#away-reset').click(function() {
        $awayTeamScore.html(0);
    });


    
    socket.on('change-home-team-score', function (data) {
        $('#home-team-score').html(data.score);
    });   
    socket.on('change-away-team-score', function (data) {
        $('#away-team-score').html(data.score);
    }); 

    socket.on('change-home-team-timeouts', function (data) {
        var value = $('#home-team-timeouts').html();
        if (data.direction == 'up') {
            value = parseInt(value) + 1;
        } else if (value != 0) {
            value = parseInt(value) - 1;
        }
        $('#home-team-timeouts').html(value);
    });   
    socket.on('change-away-team-timeouts', function (data) {
        var value = $('#away-team-timeouts').html();
        if (data.direction == 'up') {
            value = parseInt(value) + 1;
        } else if (value != 0) {
            value = parseInt(value) - 1;
        }
        $('#away-team-timeouts').html(value);
    }); 

    socket.on('change-quarter', function (data) {
        var value = $('#quarter-number').html();
        if (data.direction == 'up') {
            if (value != 4) 
                value = parseInt(value) + 1;
        } else if (value != 1) {
            value = parseInt(value) - 1;
        }
        $('#quarter-number').html(value);
    }); 

    socket.on('change-down', function (data) {
        if (typeof(data.value) !== 'undefined') {
            $('#down-counter').html(data.value);
            return true;   
        } else {
            var value = $('#down-counter').html();
            if (data.direction == 'up') {
                if (value == 4)
                    value = 1;
                else
                    value = parseInt(value) + 1;
            } else if (value != 1) {
                value = parseInt(value) - 1;
            }
            $('#down-counter').html(value);    
        }
    }); 

    socket.on('playclock-reset', function (data) {
        //$('#playclock-timer').html(data.value);
        if (data.mode == 'play') {
            if (PlayClock.running) {
                PlayClock.pause();
            } else {
                PlayClock.start();    
            }
        } else if (data.mode == 'restart') {
            PlayClock.restart(data.value);
        }
    }); 
    socket.on('gameclock-update', function (data) {
        //$('#playclock-timer').html(data.value);
        if (data.mode == 'play') {
            if (GameClock.running) {
                GameClock.pause();
            } else {
                GameClock.start();    
            }
        } else if (data.mode == 'restart') {
            GameClock.restart(data.min, data.sec);
        } else if (data.mode == 'add-min') {
            GameClock.addMin();
        } else if (data.mode == 'subtract-min') {
            GameClock.subtractMin();
        }
    }); 

    var PlayClock = {
        totalSeconds: 20,
        running: false,

        start: function () {
            var self = this;
            this.running = true;

            this.interval = setInterval(function () {
                if (self.totalSeconds == 0) {
                    self.pause();
                    return false;
                }
                self.totalSeconds -= 1;
                //$("#min").text(Math.floor(self.totalSeconds / 60 % 60));
                $("#playclock-timer").text(parseInt(self.totalSeconds % 60));
            }, 1000);
        },

        pause: function () {
            this.running = false;
            clearInterval(this.interval);
            delete this.interval;
        },

        restart: function(value) {
            $("#playclock-timer").text(value);
            clearInterval(this.interval);
            delete this.interval;
            this.totalSeconds = value;
            this.start();
        },

        resume: function () {
            if (!this.interval) this.start();
        }
    };

    var GameClock = {
        totalSeconds: 300,
        running: false,

        start: function () {
            var self = this;
            this.running = true;

            this.interval = setInterval(function () {
                if (self.totalSeconds == 0) {
                    self.pause();
                    return false;
                }
                self.totalSeconds -= 1;
                $("#gameclock-min").text(Math.floor(self.totalSeconds / 60 % 60));
                var seconds = parseInt(self.totalSeconds % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                $("#gameclock-sec").text(seconds);
            }, 1000);
        },

        pause: function () {
            this.running = false;
            clearInterval(this.interval);
            delete this.interval;
        },

        restart: function(min, sec) {
            $("#gameclock-min").text(min);
            $("#gameclock-sec").text(sec);
            clearInterval(this.interval);
            delete this.interval;
            this.totalSeconds = 300;
            this.pause();
        },

        resume: function () {
            if (!this.interval) this.start();
        },

        addMin: function () {
            this.totalSeconds += 60;
            $("#gameclock-min").text(Math.floor(this.totalSeconds / 60 % 60));
        },

        subtractMin: function () {
            if (this.totalSeconds > 60) {
                this.totalSeconds -= 60;
                $("#gameclock-min").text(Math.floor(this.totalSeconds / 60 % 60));
            }
        }
    };

    // Events for interacting directly with ScoreBoard
    // So you do not need a ref

    // Points
    $('#away-team-score').click(function() {
        var score = parseInt($(this).html()) + 1;
        socket.emit('update-away-team-score', { score: score });
    });
    $('#home-team-score').click(function() {
        var score = parseInt($(this).html()) + 1;
        socket.emit('update-home-team-score', { score: score });
    });

    // Timeouts
    $('#away-timeouts-label').click(function() {
        socket.emit('update-away-team-timeouts', { direction: 'down' });
    });
    $('#home-timeouts-label').click(function() {
        socket.emit('update-home-team-timeouts', { direction: 'down' });
    });

    // Quarter
    $('#quarter').click(function(){
        socket.emit('update-quarter', { direction: 'up' });
    });

    // Down
    $('#down').click(function(){
        socket.emit('update-down', { direction: 'up' });
    });

    // Play Clock
    $('#playclock').click(function(){
        socket.emit('reset-playclock', { mode: 'play' });
    });
    $('#playclock').dblclick(function(){
        socket.emit('reset-playclock', { mode: 'restart', value: 20 });
    });

    // Game Clock
    $('#timer').click(function() {
        socket.emit('update-gameclock', { mode: 'play' });
    });
    $('#timer').dblclick(function(){
        socket.emit('update-gameclock', { mode: 'restart', min: 5, sec: '00' });
    });
});