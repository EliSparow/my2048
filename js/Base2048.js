(function ($) {
    $.fn.game2048 = function (size) {
        var game = new Board(size);
        game.generateBoardCase();
        game.generateBoardCase();
        game.refreshBoard();
        document.addEventListener('keydown', (event) => {
            console.log(event.key);
            if(event.key == 'ArrowUp'){
                game.mergeUp();
                game.moveUp();
                game.generateBoardCase();
                game.refreshBoard();
            }
            if(event.key == 'ArrowDown'){
                game.mergeDown();
                game.moveDown();
                game.generateBoardCase();
                game.refreshBoard();
            }
            if(event.key == 'ArrowLeft'){
                game.mergeLeft();
                game.moveLeft();
                game.generateBoardCase();
                game.refreshBoard();
            }
            if(event.key == 'ArrowRight'){
                game.mergeRight();
                game.moveRight();
                game.generateBoardCase();
                game.refreshBoard();
            }
        })
    }
}
)(jQuery);



