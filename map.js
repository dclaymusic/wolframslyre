

function drawCurrentMap()
{
    for(let x = 0; x <= mapW; x++)
    {
        for(let y = 0; y <= mapH; y++)
        {
            //verts
            if(y >= mapH-1) { ctx.lineWidth = '4'; }
            else { ctx.lineWidth = '1'; }
            if(x == 0)
            {
                ctx.beginPath();
                ctx.moveTo((x*tileW)+1, y*tileH);
                ctx.lineTo((x*tileW)+1, (y*tileH)+tileH);
                ctx.stroke();
                ctx.closePath();
            }
            else if(x == mapW)
            {
                ctx.beginPath();
                ctx.moveTo((x*tileW)-1, y*tileH);
                ctx.lineTo((x*tileW)-1, (y*tileH)+tileH);
                ctx.stroke();
                ctx.closePath();
            }
            else
            {
                ctx.beginPath();
                ctx.moveTo(x*tileW, y*tileH);
                ctx.lineTo(x*tileW, (y*tileH)+tileH);
                ctx.stroke();
                ctx.closePath();
            }

            //horiz
            if(y == mapH)
            {
                ctx.beginPath();
                ctx.moveTo(0, y*tileH-2);
                ctx.lineTo(x*tileW, y*tileH-2);
                ctx.stroke();
                ctx.closePath();
            }
            else
            {
                ctx.beginPath();
                ctx.moveTo(0, (y*tileH));
                ctx.lineTo(x*tileW, (y*tileH));
                ctx.stroke();
                ctx.closePath();
            }


            if(x < mapW && y < mapH)
            {
                if(gameMap[toIndex(x,y)] == 1)
                {
                    if(y >= mapH-1) { ctx.fillStyle = 'black'; }
                    else { ctx.fillStyle = 'rgba(0,0,0,0.5'; }
                    ctx.fillRect(x*tileW, y*tileH, tileW, tileH);
                }
            }


        }
    }
}


function writeNewRow()
{
    //CA CODE HERE

    //shift all rows up first
    for(let y = 0; y < mapH-1; y++)
    {
        for(let x = 0; x < mapW; x++)
        {
            gameMap[toIndex(x,y)] = gameMap[toIndex(x,y+1)];
        }
    }
    //then write new row
    let y = mapH-2;
    let xr,xm,xl;
    for(let x = 0; x < mapW; x++)
    {
        x == 0 ? xl = gameMap[toIndex(mapW-1,y)] : xl = gameMap[toIndex(x-1,y)];
        xm = gameMap[toIndex(x,y)];
        x == mapW-1 ? xr = gameMap[toIndex(0,y)] : xr = gameMap[toIndex(x+1,y)];

        if(xl == 1 && xm == 1 && xr == 1) { gameMap[toIndex(x,y+1)] = currentRule[0]; }
        else if(xl == 1 && xm == 1 && xr == 0) { gameMap[toIndex(x,y+1)] = currentRule[1]; }
        else if(xl == 1 && xm == 0 && xr == 1) { gameMap[toIndex(x,y+1)] = currentRule[2]; }
        else if(xl == 1 && xm == 0 && xr == 0) { gameMap[toIndex(x,y+1)] = currentRule[3]; }
        else if(xl == 0 && xm == 1 && xr == 1) { gameMap[toIndex(x,y+1)] = currentRule[4]; }
        else if(xl == 0 && xm == 1 && xr == 0) { gameMap[toIndex(x,y+1)] = currentRule[5]; }
        else if(xl == 0 && xm == 0 && xr == 1) { gameMap[toIndex(x,y+1)] = currentRule[6]; }
        else if(xl == 0 && xm == 0 && xr == 0) { gameMap[toIndex(x,y+1)] = currentRule[7]; }
    }

    //sound handling
    playSoundsInRow();

}

function shuffle()
{
    if(hasStarted)
    {
    // console.log(isPlaying);
    for(let x = 0; x < mapW; x++) { gameMap[toIndex(x,mapH-1)] = randomInt(1); }
    if(!isPlaying) { playSoundsInRow(); console.log('boom')}
    }

}

function clearRow()
{
    if(hasStarted)
    {
        for(let x = 0; x < mapW; x++) { gameMap[toIndex(x,mapH-1)] = 0; } 
    }
}

function clearAll()
{
    if(hasStarted)
    {
        for(let i = 0; i < gameMap.length; i++) { gameMap[i] = 0; } 
        for(let i = 0; i < 8; i++)
        {
            if(currentRule[i] == 1) { changeRule(i); }
        }
    }

}