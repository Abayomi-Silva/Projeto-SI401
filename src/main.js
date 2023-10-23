const canvas = document.getElementById("game_canvas");
const ctx    = canvas.getContext("2d");


let dims = {
    w: canvas.clientWidth,
    h: canvas.clientHeight
}
canvas.setAttribute('width', dims.w);
canvas.setAttribute('height', dims.h);
console.log("Canvas: w:"+ dims.w + " h:"+dims.h);


let n_pieces = {
    h: 18,
    w: 12
}

let game_stats = {
    score: 0,
    removed_lines: 0,
    start_time: 0,
    level: 1
}

document.game_reversed = false

document.game_state = []
for (let i = 0; i < n_pieces.h; i++) {
    document.game_state.push([])
    for (let j = 0; j < n_pieces.w; j++) {
        document.game_state[i].push(0)
    }   
}

function debug_board(game){
    board = ""
    for (let i = 0; i < n_pieces.h; i++) {
        for (let j = 0; j < n_pieces.w; j++) {
            board += game[i][j] + " "
        }   
        board += '\n'
    }
    console.log(board);
}
debug_board(document.game_state)


let piece_colors = [
    "#5f6487", // Empty
    "#f94144", // I 
    "#F3722C", // square 
    "#F8961E", // L
    "#F9C74F", // mirror L
    "#90BE6D", // T
    "#43AA8B", // U
    "#000000"  // Special piece 
]



function draw_game(gs){
    ctx.save()

    //background
    ctx.fillStyle = "#b7c0f3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let lineWidth = 5
    
    let square_sz = {
        w: (dims.w - lineWidth * (n_pieces.w + 1)) / n_pieces.w,
        h: (dims.h - lineWidth * (n_pieces.h + 1)) / n_pieces.h,
    }
    for (let i = 0; i < n_pieces.h; i++) {
        for (let j = 0; j < n_pieces.w; j++) {
            let piece = gs[i][j] 
            let color = piece_colors[piece];
            
            ctx.fillStyle = color

            ctx.fillRect(square_sz.w*j + lineWidth*(j+1), square_sz.h*i + lineWidth*(i+1) , square_sz.w, square_sz.h)
        }   
    }

    ctx.restore()
}

function* piece_gen(){
    let constructors = [
        I_piece,
        Square_piece,
        L_piece,
        Mirror_L_piece,
        T_piece,
        U_piece,
        Special_piece,
    ]

    let curr = Math.floor(7*Math.random())
    let next = null
    yield new constructors[curr](n_pieces)

    while(true){
        next = Math.floor(7*Math.random())
        if(next !== curr){
            yield new constructors[next](n_pieces)
            curr = next
        }            
    }
}

let piece_iterator = piece_gen()
let curr_piece     = piece_iterator.next().value
let next_piece     = piece_iterator.next().value


function remove_whole_lines(gs){
    let mask = gs.map(col => col.reduce((acc, curr) => curr==0 ? acc : acc+1, 0))
    mask     = mask.map(sum => sum===n_pieces.w ? true : false)

    let blank_line = []
    for (let j = 0; j < n_pieces.w; j++) {
        blank_line.push(0)
    } 

    let specials_removed = 0

    for (let i = n_pieces.h-1; i >= 0; i--) {
        if(mask[i]){

            if(i === 0){
                gs[i] = structuredClone(blank_line)
            }
            else{
                specials_removed += gs[i].reduce((acc, curr) => curr===7 ? acc+1 : acc, 0)

                gs.splice(i, 1)
                gs.unshift(structuredClone(blank_line))
                
                // This is necessary because the line that
                // "dropped" wasn't checked yet
                mask.unshift(false)
                i++
            }
        }
    }

    if(specials_removed%2 == 1){
        document.game_reversed = !document.game_reversed

        gs = gs.map((col) => col.reverse())
    } 

    let lines_removed = mask.reduce((acc, curr) => curr? acc+1 : acc, 0)
    game_stats.removed_lines += lines_removed
    game_stats.score         += 10 * (lines_removed**2)

    return gs
}

function update_stats() {
    let elem_score         = document.getElementById("game_pontuacao")
    let elem_removed_lines = document.getElementById("game_linhas_eliminadas")
    let elem_elapsed_time  = document.getElementById("game_tempo")
    let elem_level         = document.getElementById("game_nivel")

    let elapsed_time  = Date.now() - game_stats.start_time
    let formated_time = (new Date(value=elapsed_time))
                            .toLocaleTimeString("pt-BR", options={minute: "numeric", second:"numeric"}) 

    clearInterval(tick_id)
    game_stats.level = Math.floor(game_stats.score/300)
    let new_interval = tick_interval - game_stats.level * 100
    tick_id = setInterval(()=> should_tick = true, new_interval)


    elem_score.innerText         = game_stats.score
    elem_removed_lines.innerText = game_stats.removed_lines
    elem_elapsed_time.innerText  = formated_time
    elem_level.innerText         = game_stats.level + 1 // So that it starts on 1

}

function update_game(gs){
    let ngs = structuredClone(gs);

    if (curr_piece == null){
        curr_piece = next_piece
        next_piece = piece_iterator.next().value
        return ngs
    }

    let drop = false
    if (should_tick){
        should_tick = false
        drop = true
    }

    let ret = curr_piece.tick(ngs, drop) 

    if (ret.stopped){
        document.game_state = ret.ngs
        curr_piece = null

        ret.ngs = remove_whole_lines(ret.ngs)
        should_tick = false
    }

    return ret.ngs
}



document.addEventListener('keydown', function(event) {
    if (curr_piece == null){
        return;
    }
    
    let ngs = structuredClone(document.game_state);

    if(!document.game_reversed){
        if(event.key === "ArrowLeft") {
            curr_piece.move(ngs, -1) 
        }
        else if(event.key === "ArrowRight") {
            curr_piece.move(ngs, 1) 
        }
        else if(event.key === "ArrowUp") {
            curr_piece.rotate(ngs, 1) // Sentido horário
        }
        else if(event.key === "ArrowDown") {
            curr_piece.rotate(ngs, -1) // Sentido anti-horário
        }
    }
    else{
        if(event.key === "ArrowLeft") {
            curr_piece.move(ngs, 1) 
        }
        else if(event.key === "ArrowRight") {
            curr_piece.move(ngs, -1) 
        }
        else if(event.key === "ArrowUp") {
            curr_piece.rotate(ngs, -1) // Sentido horário
        }
        else if(event.key === "ArrowDown") {
            curr_piece.rotate(ngs, 1) // Sentido anti-horário
        }
    }
    
    if(event.code === "Space") {
        let ret = null
        do {
            ret = curr_piece.tick(ngs, true)
            ngs = structuredClone(document.game_state);
        }
        while(!ret.stopped)
    }
});


let tick_interval = 500
let should_tick   = false
let tick_id       = setInterval(()=> should_tick = true, tick_interval)

let stats_tick_id = setInterval(update_stats, 1000)

let min_interval = 25

function game_loop(){
    console.log("New Loop");
    let temp_gs = update_game(document.game_state)
    draw_game(temp_gs)
    setTimeout(game_loop, min_interval)
}

function end_game(){
    clearInterval(tick_id)
    clearInterval(stats_tick_id)
}

game_stats.start_time = Date.now()
game_loop()






