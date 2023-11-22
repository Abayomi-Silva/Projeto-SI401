let canvas   = null
let ctx      = null 
let dims     = null
let n_pieces = null

let piece_iterator = null
let curr_piece     = null
let next_piece     = null


let game_stats    = null
let stats_tick_id = null

document.game_paused   = false
document.game_reversed = false
document.game_state    = []
document.game_over     = false

let img_next_piece = document.getElementById("game_next_piece")


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

function remove_whole_lines(gs){
    let mask = gs.map(col => col.reduce((acc, curr) => curr==0 ? acc : acc+1, 0));
    mask     = mask.map(sum => sum===n_pieces.w ? true : false);

    let blank_line = [];
    for (let j = 0; j < n_pieces.w; j++) {
        blank_line.push(0);
    } 

    let specials_removed = 0;

    for (let i = n_pieces.h-1; i >= 0; i--) {
        if(mask[i]){
            if(i === 0){
                gs[i] = structuredClone(blank_line);
            }
            else{
                specials_removed += gs[i].reduce((acc, curr) => curr===7 ? acc+1 : acc, 0);

                gs.splice(i, 1);
                gs.unshift(structuredClone(blank_line));
                
                // This is necessary because the line that
                // "dropped" wasn't checked yet
                mask.unshift(false);
                i++;
            }
        }
    }

    if(specials_removed%2 == 1){
        document.game_reversed = !document.game_reversed;
        gs = gs.map((col) => col.reverse());
    } 

    let lines_removed = mask.reduce((acc, curr) => curr? acc+1 : acc, 0);
    game_stats.removed_lines += lines_removed;
    game_stats.score         += 10 * (lines_removed**2);

    return gs;
}

function update_stats() {
    let elem_score         = document.getElementById("game_pontuacao");
    let elem_removed_lines = document.getElementById("game_linhas_eliminadas");
    let elem_elapsed_time  = document.getElementById("game_tempo");
    let elem_level         = document.getElementById("game_nivel");

    let elapsed_time  = Date.now() - game_stats.start_time;
    let formated_time = (new Date(value=elapsed_time))
                            .toLocaleTimeString("pt-BR", options={minute: "numeric", second:"numeric"});

    clearInterval(tick_id);
    game_stats.level = Math.floor(game_stats.score/300);
    let new_interval = tick_interval - game_stats.level * 100;
    tick_id = setInterval(()=> should_tick = true, new_interval);


    elem_score.innerText         = game_stats.score;
    elem_removed_lines.innerText = game_stats.removed_lines;
    elem_elapsed_time.innerText  = formated_time;
    elem_level.innerText         = game_stats.level + 1; // So that it starts on 1

}

function update_game(gs){
    let ngs = structuredClone(gs);
    
    let is_new_piece = false;
    let drop = false;
    if (curr_piece == null){
        is_new_piece  = true;
        curr_piece    = next_piece;
        next_piece    = piece_iterator.next().value;

        img_next_piece.src = "./images/pieces/" + next_piece.file_name;
        
        // This is so that new pieces don't immediately drop
        should_tick   = false;
    }
    else if (should_tick){
        should_tick = false;
        drop = true;
    }

    let ret = curr_piece.tick(ngs, drop);

    if (ret.stopped){
        if (is_new_piece){
            // If a new piece is created and it is immediately 
            // stopped, the player loses
            document.game_over = true;
        }
        else{
        document.game_state = ret.ngs;
        curr_piece = null;

        ret.ngs = remove_whole_lines(ret.ngs);
        should_tick = false;
        }
    }

    return ret.ngs;
}

function switch_pause() {
    document.game_paused = !document.game_paused
    should_tick = false
}

document.addEventListener('keydown', function(event) {
    if (curr_piece == null){
        return;
    }
    
    let ngs = structuredClone(document.game_state);

    if(!document.game_reversed){
        if(event.code === "ArrowLeft") {
            curr_piece.move(ngs, -1) 
        }
        else if(event.code === "ArrowRight") {
            curr_piece.move(ngs, 1) 
        }
        else if(event.code === "ArrowUp") {
            curr_piece.rotate(ngs, 1) // Sentido horário
        }
        else if(event.code === "ArrowDown") {
            curr_piece.rotate(ngs, -1) // Sentido anti-horário
        }
    }
    else{
        if(event.code === "ArrowLeft") {
            curr_piece.move(ngs, 1) 
        }
        else if(event.code === "ArrowRight") {
            curr_piece.move(ngs, -1) 
        }
        else if(event.code === "ArrowUp") {
            curr_piece.rotate(ngs, -1) // Sentido anti-horário
        }
        else if(event.code === "ArrowDown") {
            curr_piece.rotate(ngs, 1) // Sentido horário
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
    else if(event.code === "KeyP") {
        switch_pause()
    }
});

let elem_pause = document.getElementById("game_pause")
elem_pause.addEventListener("click", switch_pause)

function game_loop(){
    if(document.game_over){
        end_game()
    }
    else if(!document.game_paused){
        console.log("New Loop");
        let temp_gs = update_game(document.game_state)
        draw_game(temp_gs)
        setTimeout(game_loop, loop_interval)
    }
    else {
        setTimeout(game_loop, loop_interval*10)
    }
}

function end_game(){
    clearInterval(tick_id)
    clearInterval(stats_tick_id)

    game_ot.innerText = "Jogar Novamente"

    canvas.style.display  = 'none'
    game_o.style.display  = 'flex'
    game_ob.style.display = 'block'

    document.game_paused   = false
    document.game_reversed = false
    document.game_state    = []
    document.game_over     = false
}

function setup_game(){
    let temp = sessionStorage.getItem('game_mode_classic')

    temp === null ? temp = "true" : () => {}

    if( temp === "true"){ // Modo Clássico
        n_pieces = {
            h: 20,
            w: 10
        }
    }
    else{ // Modo Avançado
        n_pieces = {
            h: 44,
            w: 22
        }
    }





    // Using this ration to make blocks more like squares
    let ratio = n_pieces.w / n_pieces.h
    dims = {
        w: canvas.clientWidth*ratio,
        h: canvas.clientHeight
    }
    canvas.setAttribute('width', dims.w)
    canvas.setAttribute('height', dims.h)
    console.log("Canvas: w:" + dims.w + " h:" + dims.h)

    document.game_state = []
    for (let i = 0; i < n_pieces.h; i++) {
        document.game_state.push([])
        for (let j = 0; j < n_pieces.w; j++) {
            document.game_state[i].push(0)
        }   
    }

    piece_iterator = piece_gen()
    curr_piece     = piece_iterator.next().value
    next_piece     = piece_iterator.next().value
    img_next_piece.src = "./images/pieces/" + next_piece.file_name


    game_stats = {
        score: 0,
        removed_lines: 0,
        start_time: 0,
        level: 1
    }

    stats_tick_id = setInterval(update_stats, 1000)
}


let tick_interval = 500
let should_tick   = false
let tick_id       = setInterval(()=> should_tick = true, tick_interval)

let loop_interval = 25


let game_o  = document.getElementById('game_overlay')
let game_ot = document.getElementById('game_overlay_text')
let game_ob = document.getElementById('game_overlay_button')

game_ot.addEventListener('click', () => {
    canvas = document.getElementById("game_canvas")
    ctx    = canvas.getContext("2d")

    game_o.style.display = 'none'
    canvas.style.display = 'inherit' 

    setup_game()

    game_stats.start_time = Date.now()
    game_loop()
})