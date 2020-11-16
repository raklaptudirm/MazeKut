// Prep //

const map = 
[99,25,99,99,00
,99,25,25,25,25
,99,25,99,25,25
,25,25,99,25,99
,26,25,99,25,25];

const moves = [];

const length = 5;
const breadth = 5;
const wall = 99;
const path = length*breadth;
const errNo = length*breadth*length;

var at = map.lastIndexOf(length*breadth+1);
const end = map.lastIndexOf(00);

var changes = [];

let move = (dir) => {
    if (dir == 'u') at -= breadth;
    else if (dir == 'l') at -= 1;
    else if (dir == 'r') at += 1;
    else if (dir == 'd') at += breadth;
    else console.log("ERROR: Unrecognized movement requested");
}

let getXCoord = (here) => here % breadth;
let getYCoord = (here) => Math.floor(here / breadth);

let getPathVal = (at, dir) => {
    if ((dir == 'u')){
        if (getYCoord(at)!=0) return map[at-breadth];
        else return errNo;
    } else if ((dir == 'd')){
        if (getYCoord(at)!= breadth-1) return map[at+breadth];
        else return errNo;
    } else if ((dir == 'l')){
        if (getXCoord(at)!=0) return map[at-1];
        else return errNo;
    } else if ((dir == 'r')){
        if (getXCoord(at)!=length-1) return map[at+1];
        else return errNo;
    }
}

let mapPaths = (item) => {
    var changeAt = item;

    if ((getPathVal(changeAt, 'r') == (length*breadth+1))||(getPathVal(changeAt, 'l') == (length*breadth+1))||(getPathVal(changeAt, 'u') == (length*breadth+1))||(getPathVal(changeAt, 'd') == (length*breadth+1))) return 1;

    if ((map[changeAt+1] == path)&&(getXCoord(changeAt)!=breadth-1)){
        map[changeAt+1] = map[changeAt]+1;
        changes.push(changeAt+1);
    }
    if ((map[changeAt-1] == path)&&(getXCoord(changeAt)!=0)){
        map[changeAt-1] = map[changeAt]+1;
        changes.push(changeAt-1);
    }
    if ((map[changeAt+breadth] == path)&&(getYCoord(changeAt)!=length-1)){
        map[changeAt+breadth] = map[changeAt]+1;
        changes.push(changeAt+breadth);
    }
    if ((map[changeAt-breadth] == path)&&(getYCoord(changeAt)!=0)){
        map[changeAt-breadth] = map[changeAt]+1;
        changes.push(changeAt-breadth);
    }
    
    map[changeAt] = errNo;

    return 0;
}

let getBestMove = (at) => {
    let lowestPrice = getPathVal(at, 'r');
    let dir = 'r';

    if (getPathVal(at, 'l')<lowestPrice){
        lowestPrice = getPathVal(at, 'l');
        dir = 'l';
    }
    if (getPathVal(at, 'u')<lowestPrice){
        lowestPrice = getPathVal(at, 'u');
        dir = 'u';
    }
    if (getPathVal(at, 'd')<lowestPrice){
        lowestPrice = getPathVal(at, 'd');
        dir = 'd';
    }

    return dir;
}

// Prep //

// Main //

var step = 0;
var ret = 0;

while (true){

    while (map.includes(step)){
        ret = mapPaths(map.lastIndexOf(step));
        if (ret == 1) break;
    }

    while (map.includes(errNo)){
        map[map.indexOf(errNo)] = step;
    }

    if (ret == 1) break;

    step++;
}

while (at != end){
    let moveDir = getBestMove(at);
    console.log(`Move: ${moveDir}`);
    move(moveDir);
}

// Main //