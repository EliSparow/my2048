(function ($) {
    $.fn.game2048 = function (size) {
        var game = new Board(size);
        game.generateBoardCase();
        game.generateBoardCase();
        game.refreshBoard();
        document.addEventListener('keydown', (event) => {
            if(event.key == 'ArrowUp'){
                game.mergeUp();
                game.moveUp();
                if(game.mergeOk || game.moveOk){
                    game.generateBoardCase();
                    game.refreshBoard();
                }
            }
            if(event.key == 'ArrowDown'){
                game.mergeDown();
                game.moveDown();
                if(game.mergeOk || game.moveOk){
                    game.generateBoardCase();
                    game.refreshBoard();
                }
            }
            if(event.key == 'ArrowLeft'){
                game.mergeLeft();
                game.moveLeft();
                if(game.mergeOk || game.moveOk){
                    game.generateBoardCase();
                    game.refreshBoard();
                }
            }
            if(event.key == 'ArrowRight'){
                game.mergeRight();
                game.moveRight();
                if(game.mergeOk || game.moveOk){
                    game.generateBoardCase();
                    game.refreshBoard();
                }
            }
        })
    }
}
)(jQuery);



