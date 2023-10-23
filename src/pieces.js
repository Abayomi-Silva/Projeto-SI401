const N_Orientations = 4;
const Orientation = {
    Up: 0,
    Right: 1,
    Down: 2,
    Left: 3,
};

class Piece {
    constructor (n_pieces, id){
        this.pos = {
            x: Math.floor(n_pieces.w/2),
            y: 0
        }

        this.width = n_pieces.w

        this.id = id 

        this.orientation = Orientation.Up
    }

    tick(gs, drop) {
        let stopped = false
        
        if(drop){
            this.pos.y +=1

            if (this.check_collision(gs)){
                this.pos.y -=1
                stopped = true
            }
        }
        else{
            stopped = this.check_collision(gs)
        }
            
        let ngs = this.stamp_piece(gs)

        return {
            ngs: ngs,
            stopped: stopped
        }
    }

    // Note that rotate and move just change the internal
    // state of the piece, the screen updates only when 
    // tick() is called
    rotate(gs, rotate){
        let last_or = this.orientation

        this.orientation = (last_or + rotate + N_Orientations) % N_Orientations

        if (this.check_collision(gs)){
            this.orientation = last_or
        }


    }

    move(gs, move){
        let last_x = this.pos.x
        let w      = this.width

        this.pos.x = (this.pos.x + move + w) % w

        if (this.check_collision(gs)){
            this.pos.x = last_x
        }
    }

    check_collision(gs){

        let ngs = structuredClone(gs)
        let blank_gs = []

        for (let i = 0; i < n_pieces.h; i++) {
            blank_gs.push([])
            for (let j = 0; j < n_pieces.w; j++) {
                blank_gs[i].push(0)
            }   
        }

        // This last line is added to help 
        // checking collisions with the floor
        let last_line = []
        for (let i = 0; i < blank_gs[0].length; i++) {
            last_line.push(999)
        }
        blank_gs.push(last_line)
        ngs.push(last_line)

        let mask = ngs.map(col => col.map(p => p==0? 0 : 1))
        mask.push(structuredClone(last_line))        
        blank_gs = this.stamp_piece(blank_gs) 

        // notice that the +1 here is due to the floor
        for (let i = 0; i < n_pieces.h + 1; i++) { 
            for (let j = 0; j < n_pieces.w; j++) {
                if (blank_gs[i][j] !== 0 && blank_gs[i][j] !== 999 && mask[i][j] === 1){
                    return true
                }
            }   
        }

        return false
    }

    stamp_piece(){
        throw new Error("Method 'stamp_piece()' must be implemented.");
    }
}


class I_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 1)
    }

    stamp_piece(gs){

        let w = this.width

        if (this.orientation == Orientation.Up || this.orientation == Orientation.Down){
            if(this.pos.y>=2) gs[this.pos.y -2][this.pos.x] = this.id
            if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x] = this.id
            gs[this.pos.y +0][this.pos.x] = this.id
            gs[this.pos.y +1][this.pos.x] = this.id
        }
        else{
            gs[this.pos.y][(this.pos.x-2 + w) % w] = this.id
            gs[this.pos.y][(this.pos.x-1 + w) % w] = this.id
            gs[this.pos.y][this.pos.x]             = this.id
            gs[this.pos.y][(this.pos.x+1) % w]     = this.id
        }

        return gs
    }
}

class Square_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 2)
    }

    stamp_piece(gs){

        let w = this.width

        if(this.pos.y>=1) {
            gs[this.pos.y -1][this.pos.x]           = this.id
            gs[this.pos.y -1][(this.pos.x-1 +w) %w] = this.id
        }
        gs[this.pos.y][this.pos.x]             = this.id 
        gs[this.pos.y][(this.pos.x-1 + w) % w] = this.id

        return gs
    }

}

class L_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 3)
    }

    stamp_piece(gs){

        let w = this.width

 
        switch(this.orientation){
            case Orientation.Up:
                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x] = this.id
                gs[this.pos.y +0][this.pos.x]                   = this.id
                gs[this.pos.y +1][this.pos.x]                   = this.id
                gs[this.pos.y +1][(this.pos.x+1 ) %w]           = this.id
                break;

            case Orientation.Right:
                gs[this.pos.y + 1][(this.pos.x-1 + w) % w] = this.id
                gs[this.pos.y][(this.pos.x-1 + w) % w]     = this.id
                gs[this.pos.y][this.pos.x]                 = this.id
                gs[this.pos.y][(this.pos.x+1) % w]         = this.id
                break;

            case Orientation.Down:
                gs[this.pos.y +1][this.pos.x]                              = this.id
                gs[this.pos.y +0][this.pos.x]                              = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x]            = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x-1 + w) %w] = this.id
                break;

            case Orientation.Left:
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x+1) % w] = this.id
                gs[this.pos.y][(this.pos.x+1) % w]                      = this.id
                gs[this.pos.y][this.pos.x]                              = this.id
                gs[this.pos.y][(this.pos.x-1 + w) % w]                  = this.id
                break;
        }

        return gs
    }
    

}

class Mirror_L_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 4)
    }

    stamp_piece(gs){

        let w = this.width

 
        switch(this.orientation){
            case Orientation.Up:
                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x] = this.id
                gs[this.pos.y +0][this.pos.x]                   = this.id
                gs[this.pos.y +1][this.pos.x]                   = this.id
                gs[this.pos.y +1][(this.pos.x-1 +w) %w]         = this.id
                break;

            case Orientation.Right:
                if(this.pos.y>=1) gs[this.pos.y - 1][(this.pos.x-1 + w) % w] = this.id
                gs[this.pos.y][(this.pos.x-1 + w) % w]                       = this.id
                gs[this.pos.y][this.pos.x]                                   = this.id
                gs[this.pos.y][(this.pos.x+1) % w]                           = this.id
                break;

            case Orientation.Down:
                gs[this.pos.y +1][this.pos.x]                          = this.id
                gs[this.pos.y +0][this.pos.x]                          = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x]        = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x+1) %w] = this.id
                break;

            case Orientation.Left:
                gs[this.pos.y + 1][(this.pos.x+1) % w] = this.id
                gs[this.pos.y][(this.pos.x+1) % w]     = this.id
                gs[this.pos.y][this.pos.x]             = this.id
                gs[this.pos.y][(this.pos.x-1 + w) % w] = this.id
                break;
        }

        return gs
    }
    

}

class T_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 5)
    }

    stamp_piece(gs){

        let w = this.width

 
        switch(this.orientation){
            case Orientation.Up:
                if(this.pos.y>=1) gs[this.pos.y-1][this.pos.x] = this.id
                gs[this.pos.y +0][this.pos.x]                  = this.id
                gs[this.pos.y +0][(this.pos.x+1) % w]          = this.id
                gs[this.pos.y +0][(this.pos.x-1 +w) %w]        = this.id
                break;

            case Orientation.Right:
                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x] = this.id
                gs[this.pos.y +0][this.pos.x]                   = this.id
                gs[this.pos.y +0][(this.pos.x+1) % w]           = this.id
                gs[this.pos.y +1][this.pos.x]                   = this.id
                break;

            case Orientation.Down:    
                gs[this.pos.y +0][this.pos.x]                   = this.id
                gs[this.pos.y +0][(this.pos.x+1) % w]           = this.id
                gs[this.pos.y +1][this.pos.x]                   = this.id
                gs[this.pos.y +0][(this.pos.x-1 +w) %w]         = this.id
                break;

            case Orientation.Left:
                if(this.pos.y>=1) gs[this.pos.y-1][this.pos.x] = this.id
                gs[this.pos.y +0][this.pos.x]                  = this.id
                gs[this.pos.y +0][(this.pos.x-1 +w) % w]       = this.id
                gs[this.pos.y +1][this.pos.x]                  = this.id
                break;
        }

        return gs
    }
    

}

class U_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 6)
    }

    stamp_piece(gs){

        let w = this.width

 
        switch(this.orientation){
            case Orientation.Up: 
                gs[this.pos.y +0][this.pos.x]                              = this.id 
                
                gs[this.pos.y +0][(this.pos.x +1) %w]                      = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x +1) %w]    = this.id

                gs[this.pos.y +0][(this.pos.x -1 +w) %w]                   = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x -1 +w) %w] = this.id
                break;

            case Orientation.Right:
                gs[this.pos.y +0][this.pos.x]                           = this.id 
                    
                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x]         = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x +1) %w] = this.id

                gs[this.pos.y +1][this.pos.x]                           = this.id
                gs[this.pos.y +1][(this.pos.x +1) %w]                   = this.id
                break;

            case Orientation.Down:    
                gs[this.pos.y +0][this.pos.x]            = this.id 
                    
                gs[this.pos.y +0][(this.pos.x +1) %w]    = this.id
                gs[this.pos.y +1][(this.pos.x +1) %w]    = this.id

                gs[this.pos.y +0][(this.pos.x -1 +w) %w] = this.id
                gs[this.pos.y +1][(this.pos.x -1 +w) %w] = this.id
                break;

            case Orientation.Left:
                gs[this.pos.y +0][this.pos.x]                              = this.id 
                    
                gs[this.pos.y +1][this.pos.x]                              = this.id
                gs[this.pos.y +1][(this.pos.x -1 +w) %w]                   = this.id

                if(this.pos.y>=1) gs[this.pos.y -1][this.pos.x]            = this.id
                if(this.pos.y>=1) gs[this.pos.y -1][(this.pos.x -1 +w) %w] = this.id

                break;
        }

        return gs
    }
    

}

class Special_piece extends Piece {
    constructor(n_pieces){
        super(n_pieces, 7)
    }

    stamp_piece(gs){
 
        gs[this.pos.y][this.pos.x] = this.id
                
        return gs
    }
    

}