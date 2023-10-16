/*
let piece_colors = [
    "#5f6487", // Empty
    "#f94144", // I 
    "#F3722C", // square 
    "#F8961E", // L
    "#F9C74F", // flipped L
    "#90BE6D", // T
    "#43AA8B", // U
    gradient   // Special piece 
]
*/

const Orientation = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
};

class Piece {
    constructor (n_pieces, id){
        this.pos = {
            x: Math.floor(n_pieces.w/2),
            y: 0
        }

        this.id = id 

        this.orientation = Orientation.Up
    }

    tick(){
        throw new Error("Method 'update()' must be implemented.");
    }    
    
    rotate(){
        throw new Error("Method 'update()' must be implemented.");
    }

    draw(){
        throw new Error("Method 'draw()' must be implemented.");
    }

    check_colision(){
        throw new Error("Method 'draw()' must be implemented.");
    }


}


class I_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 1)
    }

    update(gs, drop, rotate, move) {
        let stopped = false
        
        if(drop){
            this.pos.y +=1

            if (this.check_collision(gs)){
                this.pos.y -=1
                stopped = true
            }
        }

        let ngs = this.stamp_piece(gs)

        return {
            ngs: ngs,
            stopped: stopped
        }
    }

    check_collision(gs){
        
        let ngs = structuredClone(gs);

        
        // This last line is added to help 
        // checking collisions with the floor
        let last_line = []
        for (let i = 0; i < ngs[0].length; i++) {
            last_line.push(999)
        }
        ngs.push(last_line)

        let mask = ngs.map(col => col.map(p => p==0? 0 : 1))
        ngs      = this.stamp_piece(ngs)

        // notice that the +1 here is due to the floor
        for (let i = 0; i < n_pieces.h + 1; i++) { 
            for (let j = 0; j < n_pieces.w; j++) {
                if (ngs[i][j] !== 0 && ngs[i][j] !== 999 && mask[i][j] === 1){
                    return true
                }
            }   
        }

        return false
    }

    stamp_piece(gs){

        let width = n_pieces.x

        if (this.orientation == Orientation.Up || this.orientation == Orientation.Down){
            if(this.pos.y>=2) gs[this.pos.y -2][this.pos.x] = this.id
            if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x] = this.id
            gs[this.pos.y +0][this.pos.x] = this.id
            gs[this.pos.y +1][this.pos.x] = this.id
        }
        else{
            gs[this.pos.y][(this.pos.x-2 + width) % width] = this.id
            gs[this.pos.y][(this.pos.x-1 + width) % width] = this.id
            gs[this.pos.y][this.pos.x]                     = this.id
            gs[this.pos.y][this.pos.x+1 % width]           = this.id
        }

        return gs
    }

}