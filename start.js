/* All functions that involve CSS and handling menu items */

function startGame() { 

    // let infoimg = document.getElementById('infoimg');
    // infoimg.style.visibility = 'visible';

    let loadscreen = document.querySelector('#loadscreen');
    loadscreen.style.visibility = 'hidden';

    //masterGain.gain.linearRampToValueAtTime(-0.001, (audioCtx.currentTime)); 
    //setTimeout(() => { masterGain.gain.linearRampToValueAtTime(1, (audioCtx.currentTime) + 5.0); }, 5000);

    hasStarted = true;

}

function frameRate()
{
    ////////////frame rate check
    ctx.fillStyle = "#ff0000";
    ctx.font = "30px Andale Mono";
    ctx.textAlign = "start";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);
}

function toggleInfo()
{ 
    if(hasStarted)
    {
        // infoWindow = !infoWindow; 

        // let loadscreen = document.getElementById('loadscreen');
        // if(loadscreen.style.visibility == 'visible')
        // { loadscreen.style.visibility = 'hidden'; 
        //     document.getElementById('infotext').style.visibility = 'hidden';
        // }
        // else 
        // { 
        //     document.getElementById('loadbarfull').style.visibility = 'hidden';
        //     document.getElementById('loadbarloading').style.visibility = 'hidden';
        //     document.getElementById('loadtext').style.visibility = 'hidden';
        //     loadscreen.style.visibility = 'visible'; 
        //     document.getElementById('infotext').style.visibility = 'visible';
        // }
    }
}

function togglePlay() {

    if(hasStarted)
    {

        isPlaying = !isPlaying;

        if(isPlaying)
        {
            document.getElementById("play").innerHTML = 'Stop';
            // metronomeInc = 0;
            timer = setInterval(writeNewRow, tempo); // this will be in "MAP" file
            // document.getElementById('play').innerHTML = 'Stop';
        }
        else
        {
            // document.getElementById("tempo").disabled = false;
            // metronomeInc = 0;
            // document.getElementById('play').innerHTML = 'Play';
            // for(let i = 0; i < songImages.length; i++)
            // {
            // 	document.getElementById(songImages[i]).style.outline = 'none';
            // }
            document.getElementById("play").innerHTML = 'Play';
            clearInterval(timer);
        }

    }
}

function toggleInstrument()
{
    if(hasStarted)
    {
        let sel = document.getElementById('palette');
        if(sel.value == 'harp') { instrumentChoice = 'h'; }
        if(sel.value == 'percussion') { instrumentChoice = 'p'; }
        if(sel.value == 'wood') { instrumentChoice = 'w'; }
        if(sel.value == 'prep') { instrumentChoice = 'pp'; }
    }


}

// function resetTimer()
// {
// 	// metronomeInc = 0;
// 	// document.getElementById('play').innerHTML = 'Play';
// 	// for(let i = 0; i < songImages.length; i++)
// 	// {
// 	// 	document.getElementById(songImages[i]).style.outline = 'none';
// 	// }
// 	// clearInterval(timer);
// }


// function setTempo() 
// {
// 	document.getElementById('tempo').oninput = function() {
// 		metronomeSpeed = this.value;
// 		tempo = (60/metronomeSpeed)*1000;
// 		document.getElementById('output').innerHTML = this.value + ' BPM';

// 	  }
// }


function toIndex(x, y)
{
	return((y * mapW) + x);
}

function fromIndex(m)
{
	x = m % mapW;
	y = (m - (m % mapW)) / mapH;
	return([x, y]);
}

function randomInt(max)
{
	rand_val = Math.floor(Math.random() * Math.floor(max + 1))
	return rand_val;
}
