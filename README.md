# Football Pong Scoreboard

Web app for displaying a scoreboard for a game that my friends and I created for the SuperBowl.

The game is made on a 8 foot by 4 foot piece of wood painted to be a football field (with goal posts). The scoreboard is mounted nearby.

App is built using NodeJS, with Express and Socket.io. 

### Displaying Scoreboard

Scoreboard is designed for tablet device. Just need a web browser to display the scoreboard.

### Controlling Scoredboard

A player of the game or a designated referee can control the scoreboard with a the use of their smart phone.

There is a simple interface for updating all components of the scoreboard. Using socket.io, when a button is pressed on the referee app, the app sends a message to the scoreboard to update. 

### Football Pong Photos

ScoreBoard:

<img src="http://michaelencode.com/presentations/2014-02-18-socket-io/images/example/scoreboard.jpg" alt="Photo of ScoreBoard" width="333" height="250" />&nbsp;<img src="http://michaelencode.com/presentations/2014-02-18-socket-io/images/example/ref_app.png" alt="Screenshot of Ref App" width="152" height="250" />

Homemade Field:

<img src="http://michaelencode.com/presentations/2014-02-18-socket-io/images/example/full_field.jpg" alt="Photo of Field" width="188" height="250" />
&nbsp;<img src="http://michaelencode.com/presentations/2014-02-18-socket-io/images/example/field_goal_position.jpg" alt="Photo During Play (Field Goal Position)" width="323" height="250" />&nbsp; <img src="http://michaelencode.com/presentations/2014-02-18-socket-io/images/example/endzone.jpg" width="188" alt="Photo During Play (Endzone)" height="250" />


### Notes

I had a lot of fun building this scoreboard. It was fun to work with NodeJS and really loved building a real time app using socket.io. 

## License

MIT License (MIT)

Copyright (C) 2014 Michael Mottola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
