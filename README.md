# Snake

Snake is a browser-based version of the classic arcade game

[Click to play!](http://www.gauravnagpal.me/Snake/)

## Technological Highlights

### Overview

Snake is built with **JavaScript** and rendered with **jQuery** DOM manipulation and **CSS** styling.

### Object Oriented Design

 The Board contains all of the squares and holds the Snake and the Apple.  It keeps track of the snakes position
 at every turn and knows whether an apple has been eaten or if the snake has run out of boundaries.

### Game Board

The board is stored as a array of rows, each populated with an array of columns. This data structure allowed for easy manipulation of the snake's body's coordinates as well as placement of the apple.

### Display

The front-end consists of a view which listens for key inputs and renders the game grid. Key inputs allow the user to control the direction of the snake, pause / start, and to mute / unmute the music. The render function creates a `<ul>` full of other `<ul>` elements representing rows, each of which contains `<li>` elements for the cells in the grid. Then, CSS classes are added to each `<li>` according to the status of the block in the board.
