class Board {


    constructor(size) {
        this.score = 0;
        this.table_data = [];
        this.size = size;
        var table_body = '<table>';
        for (var row = 1; row <= size; row++) {
            table_body += '<tr id="tr' + row + '">';
            for (var col = 1; col <= size; col++) {
                var table_row = [0, 0, 0, 0]
                table_body += '<td id="' + row + '-' + col + '">';
                table_body += table_row[col - 1];
                table_body += '</td>';
            }
            this.table_data.push(table_row);
            table_body += '</tr>';
        }
        table_body += '</table>';
        $('.boardGame').append(table_body);
    }

    getScore(){
        return this.score;
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getFreeCases() {
        var freeCases = [];
        for (var row = 0; row < this.size; ++row) {
            for (var col = 0; col < this.size; ++col) {
                if (this.table_data[row][col] == 0) {
                    freeCases.push([row, col]);
                }
            }
        }
        return freeCases;
    }

    generateBoardCase() {
        var free_cases = this.getFreeCases();
        var size_free_cases = free_cases.length;
        // console.log(free_cases);
        // console.log('size_free_cases' + size_free_cases);

        var random_case_coord = this.randomIntFromInterval(0, size_free_cases - 1);
        var row = free_cases[random_case_coord][0];
        var col = free_cases[random_case_coord][1];
        var x = row + 1;
        var y = col + 1;
        // console.log(random_case_coord);
        // console.log(free_cases[random_case_coord]);
        // console.log(row);
        // console.log(y);

        if (this.randomIntFromInterval(1, 10) < 4) {
            // console.log('done4');
            this.table_data[row][col] = 4;
            $('#' + x + '-' + y).removeClass();
            $('#' + x + '-' + y).css({opacity:0});
            $('#' + x + '-' + y).text(this.table_data[row][col]);
            $('#' + x + '-' + y).addClass('td-' + this.table_data[row][col]);
            $('#' + x + '-' + y).animate({opacity: 1}, 500, function(){});
            // console.log('case' + row + y + '=' + this.table_data[row][y]);
        } else {
            // console.log('done2');
            this.table_data[row][col] = 2;
            $('#' + x + '-' + y).removeClass();
            $('#' + x + '-' + y).css({opacity:0});
            $('#' + x + '-' + y).text(this.table_data[row][col]);
            $('#' + x + '-' + y).addClass('td-' + this.table_data[row][col]);
            $('#' + x + '-' + y).animate({opacity: 1}, 500, function(){});
            // console.log('case' + row + y + '=' + this.table_data[row][y]);
        }

    }

    refreshBoard() {
        // console.log('inside refresh');
        $('td').removeClass();
        $('.score-count').html('Score:<br>' + this.score);
        for (var row = 0; row < this.size; ++row) {
            var x = row + 1;
            for (var col = 0; col < this.size; ++col) {
                var y = col + 1;
                $('#' + x + '-' + y).text(this.table_data[row][col]);
                $('#' + x + '-' + y).addClass('td-' + this.table_data[row][col]);
            }
        }
    }

    // MOVE FUNCTIONS
    moveUp() {
        this.moveOk = false;
        for (var col = 0; col < this.size; col++) {
            for (var row = 0; row < this.size; row++) {
                var temp = row - 1;
                while (temp >= 0 && this.table_data[temp][col] == 0) {
                    temp--;
                }
                temp++;
                if (this.table_data[row][col] !== 0 && this.table_data[temp][col] === 0 && temp >= 0) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[temp][col] = actualPos;
                    this.table_data[row][col] = 0;
                    this.moveOk = true;
                };
            };
        };
    };

    moveDown() {
        this.moveOk = false;
        for (var col = 3; col >= 0; col--) {
            for (var row = 3; row >= 0; row--) {
                var temp = row + 1;
                while (temp <= 3 && this.table_data[temp][col] == 0) {
                    temp++;
                }
                temp--;
                if (this.table_data[row][col] !== 0 && this.table_data[temp][col] === 0 && temp <= 3) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[temp][col] = actualPos;
                    this.table_data[row][col] = 0;
                    this.moveOk = true;
                };
            };
        };
    };

    moveLeft() {
        this.moveOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                var temp = col - 1;
                while (temp >= 0 && this.table_data[row][temp] == 0) {
                    temp--;
                }
                temp++;
                if (this.table_data[row][col] !== 0 && this.table_data[row][temp] === 0 && temp >= 0) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[row][temp] = actualPos;
                    this.table_data[row][col] = 0;
                    this.moveOk = true;
                };
            };
        };
    };

    moveRight() {
        this.moveOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 3; col >= 0; col--) {
                var temp = col + 1;
                while (temp <= 3 && this.table_data[row][temp] == 0) {
                    temp++;
                }
                temp--;
                if (this.table_data[row][col] !== 0 && this.table_data[row][temp] === 0 && temp <= 3) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[row][temp] = actualPos;
                    this.table_data[row][col] = 0;
                    this.moveOk = true;
                };
            };
        };
    };

    // MERGE FUNCTIONS
    mergeUp() {
        this.mergeOk = false;
        for (var col = 3; col >= 0; col--) {
            for (var row = 0; row < this.size; row++) {
                var next_row1 = row + 1;
                var next_row2 = row + 2;
                var next_row3 = row + 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_row1 <= 3 && this.table_data[row][col] === this.table_data[next_row1][col]) {
                        this.table_data[row][col] += this.table_data[next_row1][col];
                        this.table_data[next_row1][col] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_row2 <= 3 && this.table_data[row][col] === this.table_data[next_row2][col] && this.table_data[next_row1][col] === 0) {
                        this.table_data[row][col] += this.table_data[next_row2][col];
                        this.table_data[next_row2][col] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_row3 <= 3 && this.table_data[row][col] === this.table_data[next_row3][col] && this.table_data[next_row1][col] === 0 && this.table_data[next_row2][col] === 0) {
                        this.table_data[row][col] += this.table_data[next_row3][col];
                        this.table_data[next_row3][col] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                }
            }
        }
    }

    mergeDown() {
        this.mergeOk = false;
        for (var col = 0; col < this.size; col++) {
            for (var row = 3; row >= 0; row--) {
                var next_row1 = row - 1;
                var next_row2 = row - 2;
                var next_row3 = row - 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_row1 >= 0 && this.table_data[row][col] === this.table_data[next_row1][col]) {
                        this.table_data[row][col] += this.table_data[next_row1][col];
                        this.table_data[next_row1][col] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_row2 >= 0 && this.table_data[row][col] === this.table_data[next_row2][col] && this.table_data[next_row1][col] === 0) {
                        this.table_data[row][col] += this.table_data[next_row2][col];
                        this.table_data[next_row2][col] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_row3 >= 0 && this.table_data[row][col] === this.table_data[next_row3][col] && this.table_data[next_row1][col] === 0 && this.table_data[next_row2][col] === 0) {
                        this.table_data[row][col] += this.table_data[next_row3][col];
                        this.table_data[next_row3][col] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                }
            }
        }
    }

    mergeLeft() {
        this.mergeOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                var next_col1 = col + 1;
                var next_col2 = col + 2;
                var next_col3 = col + 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_col1 <= 3 && this.table_data[row][col] === this.table_data[row][next_col1]) {
                        this.table_data[row][col] += this.table_data[row][next_col1];
                        this.table_data[row][next_col1] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_col2 <= 3 && this.table_data[row][col] === this.table_data[row][next_col2] && this.table_data[row][next_col1] === 0) {
                        this.table_data[row][col] += this.table_data[row][next_col2];
                        this.table_data[row][next_col2] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_col3 <= 3 && this.table_data[row][col] === this.table_data[row][next_col3] && this.table_data[row][next_col2] === 0 && this.table_data[row][next_col1] === 0) {
                        this.table_data[row][col] += this.table_data[row][next_col3];
                        this.table_data[row][next_col3] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                }
            }
        }
    }

    mergeRight() {
        this.mergeOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 3; col >= 0; col--) {
                var next_col1 = col - 1;
                var next_col2 = col - 2;
                var next_col3 = col - 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_col1 >= 0 && this.table_data[row][col] === this.table_data[row][next_col1]) {
                        this.table_data[row][col] += this.table_data[row][next_col1];
                        this.table_data[row][next_col1] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_col2 >= 0 && this.table_data[row][col] === this.table_data[row][next_col2] && this.table_data[row][next_col1] === 0) {
                        this.table_data[row][col] += this.table_data[row][next_col2];
                        this.table_data[row][next_col2] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                    else if (next_col3 >= 0 && this.table_data[row][col] === this.table_data[row][next_col3] && this.table_data[row][next_col2] === 0 && this.table_data[row][next_col1] === 0) {
                        this.table_data[row][col] += this.table_data[row][next_col3];
                        this.table_data[row][next_col3] = 0;
                        this.score += this.table_data[row][col];
                        this.mergeOk = true;
                    }
                }
            }
        }
    }

    // VERIF MOVE FUNCTIONS
    isMovePoss() {
        if (this.isMoveLeft() || this.isMoveRight() || this.isMoveUp() || this.isMoveDown())
            return true;
        else
            return false;
    }

    isMoveRight() {
        var returned = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 3; col >= 0; col--) {
                var temp = col + 1;
                while (temp <= 3 && this.table_data[row][temp] == 0) {
                    temp++;
                }
                temp--;
                if (this.table_data[row][col] !== 0 && this.table_data[row][temp] === 0 && temp <= 3) {
                    returned = true;
                }
            };
        };
        return returned;
    }

    isMoveLeft() {
        var returned = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                var temp = col - 1;
                while (temp >= 0 && this.table_data[row][temp] == 0) {
                    temp--;
                }
                temp++;
                if (this.table_data[row][col] !== 0 && this.table_data[row][temp] === 0 && temp >= 0) {
                    returned = true;
                };
            };
        };
        return returned;
    }

    isMoveUp() {
        var returned = false;
        for (var col = 0; col < this.size; col++) {
            for (var row = 0; row < this.size; row++) {
                var temp = row - 1;
                while (temp >= 0 && this.table_data[temp][col] == 0) {
                    temp--;
                }
                temp++;
                if (this.table_data[row][col] !== 0 && this.table_data[temp][col] === 0 && temp >= 0) {
                    returned = true;
                };
            };
        };
        return returned;
    }

    isMoveDown() {
        var returned = false;
        for (var col = 3; col >= 0; col--) {
            for (var row = 0; row < this.size; row++) {
                var temp = row + 1;
                while (temp <= 3 && this.table_data[temp][col] == 0) {
                    temp++;
                }
                temp--;
                if (this.table_data[row][col] !== 0 && this.table_data[temp][col] === 0 && temp <= 3) {
                    returned = true;
                };
            };
        };
        return returned;
    }

    // VERIF MERGE FUNCTIONS
    isMergePoss() {
        if (this.isMergeLeft() || this.isMergeRight() || this.isMergeUp() || this.isMergeDown())
            return true;
        else
            return false;
    }

    isMergeUp() {
        for (var col = 3; col >= 0; col--) {
            for (var row = 0; row < this.size; row++) {
                var next_row1 = row + 1;
                var next_row2 = row + 2;
                var next_row3 = row + 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_row1 <= 3 && this.table_data[row][col] === this.table_data[next_row1][col]) {
                        return true;
                    }
                    else if (next_row2 <= 3 && this.table_data[row][col] === this.table_data[next_row2][col] && this.table_data[next_row1][col] === 0) {
                        return true;
                    }
                    else if (next_row3 <= 3 && this.table_data[row][col] === this.table_data[next_row3][col] && this.table_data[next_row1][col] === 0 && this.table_data[next_row2][col] === 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isMergeDown() {
        for (var col = 0; col < this.size; col++) {
            for (var row = 3; row >= 0; row--) {
                var next_row1 = row - 1;
                var next_row2 = row - 2;
                var next_row3 = row - 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_row1 >= 0 && this.table_data[row][col] === this.table_data[next_row1][col]) {
                        return true;
                    }
                    else if (next_row2 >= 0 && this.table_data[row][col] === this.table_data[next_row2][col] && this.table_data[next_row1][col] === 0) {
                        return true;
                    }
                    else if (next_row3 >= 0 && this.table_data[row][col] === this.table_data[next_row3][col] && this.table_data[next_row1][col] === 0 && this.table_data[next_row2][col] === 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isMergeLeft() {
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                var next_col1 = col + 1;
                var next_col2 = col + 2;
                var next_col3 = col + 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_col1 <= 3 && this.table_data[row][col] === this.table_data[row][next_col1]) {
                        return true;
                    }
                    else if (next_col2 <= 3 && this.table_data[row][col] === this.table_data[row][next_col2] && this.table_data[row][next_col1] === 0) {
                        return true;
                    }
                    else if (next_col3 <= 3 && this.table_data[row][col] === this.table_data[row][next_col3] && this.table_data[row][next_col2] === 0 && this.table_data[row][next_col1] === 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isMergeRight() {
        for (var row = 0; row < this.size; row++) {
            for (var col = 3; col >= 0; col--) {
                var next_col1 = col - 1;
                var next_col2 = col - 2;
                var next_col3 = col - 3;
                if (this.table_data[row][col] !== 0) {
                    if (next_col1 >= 0 && this.table_data[row][col] === this.table_data[row][next_col1]) {
                        return true;
                    }
                    else if (next_col2 >= 0 && this.table_data[row][col] === this.table_data[row][next_col2] && this.table_data[row][next_col1] === 0) {
                        return true;
                    }
                    else if (next_col3 >= 0 && this.table_data[row][col] === this.table_data[row][next_col3] && this.table_data[row][next_col2] === 0 && this.table_data[row][next_col1] === 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isWon() {
        for (var row = 0; row < this.size; ++row) {
            for (var col = 0; col < this.size; ++col) {
                if (this.table_data[row][col] == 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    restartBoard() {
        for (var row = 0; row < this.size; ++row) {
            for (var col = 0; col < this.size; ++col) {
                this.table_data[row][col] = 0;
            }
        }
    }
}