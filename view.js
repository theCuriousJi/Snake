(function() {
  if(typeof Snakes === "undefined"){
    Snakes = {};}

    Snakes.MOVES = {38: "N",
                  40: "S",
                  37: "W",
                  39: "E"}

    var View = Snakes.View = function ($el) {
      this.$el = $el;
      // this.board.snake = new Snakes.Snake();
      this.board = new Snakes.Board();
      this.setup();
      var that = this;
      this.paused = true;
      this.gameOver = false;
      this.render();
      that.intervalID = null;

      $('body').find('.gameover').html('Press Space to begin')
      // that.intervalID = window.setInterval( that.step.bind(that), 1);
      // this.pauseStart();
      // $('body').on('keydown', that.startGame.bind(that));
      $('body').on('keydown', that.handleKeyEvent.bind(that));
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
          debugger;
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
      // debugger;
      var that = this
      if(this.paused === true) {
        $('body').find('.gameover').empty()
        that.intervalID = window.setInterval( that.step.bind(that), 1);
        that.paused = false;
      }
      else {
        clearInterval(that.intervalID);
        that.paused = true;
        $('body').find('.gameover').html('Paused <br> Press Space to Continue');
      }
    }




    View.prototype.step = function () {
      var that = this;
      if(this.board.won()) {
        $('body').find('.gameover').html('You Win <br>  Press Space to play again')
        clearInterval(this.intervalID);
        this.gameOver = true;
      } else if(this.board.snake.occupies(this.board.snake.nextSpot()) ||
      this.board.outOfBounds(this.board.snake.nextSpot())) {
        $('body').find('.gameover').html('Game Over  <br>  Press Space to play again')
        clearInterval(this.intervalID);
        this.gameOver = true;
      } else {
        this.board.move();
        this.render();
      }
      // debugger;

    }


    View.prototype.setup = function () {
      var grid = this.board.fillGrid();
      for (var i = 0; i < grid.length; i++) {
        $ul = $("<ul class='row' 'clearfix'>")
        this.$el.append($ul);
        for(var j = 0; j < grid.length; j++) {
          $li = $('<li class="space">')
          $ul.append($li)
        };
      };

      var $h2 = $('<h2>').html('Score: ' + this.board.score);


      var $gameOver = $('<h3 class="gameover">');
      this.$el.append($gameOver);
      // this.board.snake.segments.forEach(function() {
      //   {
      //     $li = $('<li class="space">')
      //     $ul.append($li)
      //   };
      //
      // })
    }

    View.prototype.render = function () {
      // debugger;
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
