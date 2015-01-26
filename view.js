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
      $('body').on('keydown', that.handleKeyEvent.bind(that));
      this.intervalID = window.setInterval( this.step.bind(this), 200);
    }

    View.prototype.handleKeyEvent = function (event) {
       this.board.snake.turn(Snakes.MOVES[event.keyCode]);
    }
    View.prototype.step = function () {
      if(this.board.snake.occupies(this.board.snake.nextSpot()) ||
      this.board.outOfBounds(this.board.snake.nextSpot())) {
        alert("game over");
        clearInterval(this.intervalID);
      }
      this.board.snake.move();
      this.render();
    }


    View.prototype.setup = function () {
      var grid = this.board.fillGrid();
      for (var i = 0; i < grid.length; i++) {
        $ul = $("<ul class='row'>")
        this.$el.append($ul);
        for(var j = 0; j < grid.length; j++) {
          $li = $('<li class="space">')
          $ul.append($li)
        };
      };
      // this.board.snake.segments.forEach(function() {
      //   {
      //     $li = $('<li class="space">')
      //     $ul.append($li)
      //   };
      //
      // })
    }

    View.prototype.render = function () {
      var grid = this.board.fillGrid();
      var that = this;

      // for (var i = 0; i < grid.length; i++) {
      //   for(var j = 0; j < grid.length; j++) {
      //     var row = i + 1;
      //     var col = j + 1;
      //     var space = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
      //     space.addClass('empty');
      //   };
      // };
      //
      // this.board.snake.segments.forEach(function(el) {
      //   var row = el[0] + 1;
      //   var col = el[1] + 1;
      //   var x = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
      //   x.removeClass('empty').addClass('board.snake');
      // })

      for (var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid.length; j++) {
          var row = i + 1;
          var col = j + 1;
          if (grid[i][j] === ".") {
            var space = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
            space.addClass('empty');
          }
          else if (grid[i][j] === "S"){
            var x = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
            x.removeClass('empty').addClass('snake');
          }
          else if (grid[i][j] === "A"){
            var x = that.$el.find("ul:nth-child(" + row + ") > li:nth-child("+col+")");
            x.addClass('apple');
          }
        }
      }


    }


})();
