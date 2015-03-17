(function() {
  if(typeof Snakes === "undefined"){
    Snakes = {};}

    Snakes.MOVES = {38: "N",
                  40: "S",
                  37: "W",
                  39: "E"}

    var View = Snakes.View = function ($el) {
      this.$el = $el;
      this.muted = false;
      this.board = new Snakes.Board();
      this.setup();
      var that = this;
      this.paused = true;
      this.firstPlay = true;
      this.gameOver = false;
      this.render();
      this.intervalID = null;
      this.intro = new Howl({urls: ["snake_intro_mp3.mp3"],
      loop:true});
      this.main = new Howl({urls: ["snake_mp3.mp3"],
      loop:true});
      this.muteButton = $('.sound')
      this.intro.play();
      $('body').find('.gameover').html('Press Space to begin')

      $('body').on('keydown', that.handleKeyEvent.bind(that));
      $('.sound').on('click', that.mute.bind(that));

      // Howler.mute()


    }

    View.prototype.mute = function (event) {
      event.preventDefault();
      if(this.muted == true) {
        this.muted = false;
        Howler.unmute();
        this.muteButton.css('content', "url('./img/unmute.svg')")

      }
      else {
        this.muted = true;
        Howler.mute();
        this.muteButton.css('content', "url('./img/mute.svg')")
      }


    }

    View.prototype.handleKeyEvent = function (event) {

      if(this.gameOver === false) {
        if(event.keyCode === 32) {
          this.pauseStart();
        }
         else {
           this.board.snake.turn(Snakes.MOVES[event.keyCode]);
         }
      } else {
        if(event.keyCode === 32) {
          this.board = new Snakes.Board();
          this.render();
          this.paused = true;
          this.gameOver = false;
          this.board.snake.turn('S');
          this.pauseStart();
          $('body').find('.gameover').empty();
          // this.render();
        }
      }

    }

    View.prototype.pauseStart = function () {
      var that = this
      if(this.paused === true) {
        if(this.firstPlay) {
          this.firstPlay = false;
          this.intro.stop();
        }
        this.main.play();
        $('body').find('.gameover').empty()
        that.intervalID = window.setInterval( that.step.bind(that), 85);
        that.paused = false;

      }
      else {
        clearInterval(that.intervalID);
        that.paused = true;
        $('body').find('.gameover').html('Paused <br> Press Space to Continue');
        this.main.pause();
      }
    }




    View.prototype.step = function () {
      var that = this;
      if(this.board.won()) {
        $('body').find('.gameover').html('You Win <br>  Press Space to play again')
        clearInterval(this.intervalID);
        this.gameOver = true;
        this.main.stop();
        this.intro.play();
        this.firstPlay = true;
      } else if(this.board.snake.occupies(this.board.snake.nextSpot()) ||
      this.board.outOfBounds(this.board.snake.nextSpot())) {
        $('body').find('.gameover').html('Game Over  <br>  Press Space to play again')
        clearInterval(this.intervalID);
        this.gameOver = true;
        this.firstPlay = true;
        this.main.stop();
        this.intro.play();
      } else {
        this.board.move();
        this.render();
      }
      // debugger;

    }

    View.prototype.volume = function () {
      if(this.muted) {

      }
    }


    View.prototype.setup = function () {
      var grid = this.board.fillGrid();
      for (var i = 0; i < grid.length; i++) {
        $ul = $("<ul class='row clearfix'>")
        this.$el.append($ul);
        for(var j = 0; j < grid.length; j++) {
          $li = $('<li class="space">')
          $ul.append($li)
        };
      };

      var $h2 = $('<h2>').html('Score: ' + this.board.score);
      var $sound = $('.sound').html('Click to Mute / Unmute: <i class="fa fa-trash-o"></i>');


      var $gameOver = $('<h3 class="gameover">');
      $('body').append($gameOver);
      // this.board.snake.segments.forEach(function() {
      //   {
      //     $li = $('<li class="space">')
      //     $ul.append($li)
      //   };
      //
      // })
      var audio = new Audio("/Users/G/desktop/snake/snake_intro_mp3.mp3")

    }

    View.prototype.render = function () {
      var grid = this.board.fillGrid();
      var that = this;

      for (var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid.length; j++) {
          var row = i + 1;
          var col = j + 1;
          if (grid[i][j] === ".") {
            var space = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
            space.removeClass('apple').addClass('empty');
          }
          else if (grid[i][j] === "S"){
            var x = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
            x.removeClass('empty').removeClass('apple').addClass('snake');
          }
          else if (grid[i][j] === "A"){
            var x = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
            x.addClass('apple');
          }
        }
      }

      $h2 = $('body').find('h2')
      $h2.html('Score: ' + this.board.score);



    }


})();
