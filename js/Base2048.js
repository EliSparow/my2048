(function ($) {
    $.fn.game2048 = function (size) {
        var game = new Board(size);
        game.refreshBoard();
        game.generateBoardCase();
        game.generateBoardCase();
        document.addEventListener('keydown', (event) => {
            if (game.isWon() == false) {
                if (event.key == 'ArrowUp') {
                    game.mergeUp();
                    game.moveUp();
                    game.refreshBoard();
                    if (game.mergeOk || game.moveOk) {
                        game.generateBoardCase();
                    }
                }
                if (event.key == 'ArrowDown') {
                    game.mergeDown();
                    game.moveDown();
                    game.refreshBoard();
                    if (game.mergeOk || game.moveOk) {
                        game.generateBoardCase();
                    }
                }
                if (event.key == 'ArrowLeft') {
                    game.mergeLeft();
                    game.moveLeft();
                    game.refreshBoard();
                    if (game.mergeOk || game.moveOk) {
                        game.generateBoardCase();
                    }
                }
                if (event.key == 'ArrowRight') {
                    game.mergeRight();
                    game.moveRight();
                    game.refreshBoard();
                    if (game.mergeOk || game.moveOk) {
                        game.generateBoardCase();
                    }
                }
                // console.log('merge poss :' +game.isMergePoss());
                // console.log('move poss:' +game.isMovePoss());
                // console.log('free cases' +game.getFreeCases().length);
                if(game.isMergePoss() == false && game.isMovePoss() == false && game.getFreeCases().length == 0){
                    $('#inner-lose').animate({ opacity: 1 }, 1000, function(){});
                }
                else if (game.isWon()) {
                    $('#inner-win').animate({ opacity: 1 }, 1000, function(){});
                }
            }
        })

        $('.btn-again').click(function () {
            $('#inner-win').css({ opacity: 0 })
            $('#inner-lose').css({ opacity: 0 })
            game.restartBoard();
            game.generateBoardCase();
            game.generateBoardCase();
            game.refreshBoard();
        })
    }
}
)(jQuery);



