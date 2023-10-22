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
    h: 20,
    w: 10
}


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
let curr_piece = piece_iterator.next().value
let next_piece = piece_iterator.next().value


function update_game(gs){
    let ngs = structuredClone(gs);

    if (curr_piece == null){
        curr_piece = next_piece
        next_piece = piece_iterator.next().value
        return ngs
    }

    drop = 0
    if (should_tick){
        should_tick = false
        drop = 1
    }

    let ret = curr_piece.tick(ngs, drop) 

    if (ret.stopped){
        document.game_state = ret.ngs
        curr_piece = null
    }

    return ret.ngs
}



document.addEventListener('keydown', function(event) {
    if (curr_piece == null){
        return;
    }
    
    let ngs = structuredClone(document.game_state);

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
});


let tick_interval = 500
let should_tick = false
let tick_id = setInterval(()=> should_tick = true, tick_interval)
let min_interval = 50

function game_loop(){
    console.log("New Loop");
    let temp_gs = update_game(document.game_state)
    draw_game(temp_gs)
    setTimeout(game_loop, min_interval)
}
game_loop()






