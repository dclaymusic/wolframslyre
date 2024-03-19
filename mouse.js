//TILE-BASED VERSION: divide X and Y by tileW/tileH if needed, then multiply by tileW/tileH at "draw rect" function
    //PIXEL-BASED VERSION: x and y are not divided by tileW/tileH, and "draw rect" function has no tileW/tileH multiplier
    function clickHandler(event) 
    {
        if(!soundInit)
        {
            initSnd();
        }
        else if(!hasStarted && soundInit && allBuffersLoaded)
        { 
            startGame();
        }
        else if(!hasStarted && !allBuffersLoaded && soundInit)
        { }
        else
        {
            const rect = document.getElementById('game').getBoundingClientRect();
            // var x = Math.floor(event.clientX - rect.left) * scale; // divide by a tileW if needed
            // var y = Math.floor(event.clientY - rect.top) * scale; // divide by a tileH if needed
            var x = Math.floor(((event.clientX - rect.left) * scale) / tileW);
            var y = Math.floor(((event.clientY - rect.top) * scale) / tileH);
            // if(x < 0) { x = 0; }
            // if(x > width / tileW) { x = width - tileW; }
            // if(y < 0) { y = 0; }
            // if(y > height / tileW) { y = height - tileH; }
            //console.log(x,y);
            //change bottom row
            if(y == mapH-1 && (x >= 0 && x <= width / tileW))
            {
                if(gameMap[toIndex(x,y)] == 1) { gameMap[toIndex(x,y)] = 0; }
                else if(gameMap[toIndex(x,y)] == 0) { 
                    gameMap[toIndex(x,y)] = 1; 
                    if(!isPlaying) { selectSnd(`${instrumentChoice}${x+1}`); }
                }
            }
        }
    }

    function getHoverOver(event) {
        const rect = document.getElementById('game').getBoundingClientRect();
        // var x = Math.floor(event.clientX - rect.left) * scale;
        // var y = Math.floor(event.clientY - rect.top) * scale;
        var x = Math.floor(((event.clientX - rect.left) * scale) / (tileW));
        var y = Math.floor(((event.clientY - rect.top) * scale) / (tileH));
        // if(x < 0) { x = 0; }
        // if(x > (width / tileW) - 1) { x = (width / tileW) - 1; }
        // if(y < 0) { y = 0; }
        // if(y > (height / tileH) - 1) { y = (height / tileH) - 1; }
        return([x,y]);
    }


    function changeRule(index)
    {
        if(currentRule[index] == 0) 
        { 
            currentRule[index] = 1;
            document.getElementById(`cell${index}`).src = 'squareblk.png'; 
        }
        else { 
            document.getElementById(`cell${index}`).src = 'square.png';
            currentRule[index] = 0; 
        }

        document.getElementById('r0').innerHTML = 
            'Current Rule: <br>' + parseInt(`${currentRule[0]}${currentRule[1]}${currentRule[2]}${currentRule[3]}${currentRule[4]}${currentRule[5]}${currentRule[6]}${currentRule[7]}`,2)
    }

    function changeTempo()
    {  
        if(document.getElementById('tempo').value <= 999)
        {
            tempo = (60/document.getElementById('tempo').value)*1000;
            clearInterval(timer);
            if(isPlaying) { timer = setInterval(writeNewRow, tempo); }
        }
        else
        {
            document.getElementById('tempo').value = 999;
            tempo = (60/document.getElementById('tempo').value)*1000;
            clearInterval(timer);
            if(isPlaying) { timer = setInterval(writeNewRow, tempo); }
        }

    }