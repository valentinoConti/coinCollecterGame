//Variable declarations
var gameInterval,
 canv,
 ctx,
 images = [],
 sounds = [],
 soundsLoaded = [],
 imagesLoaded = false,
 soundsLoaded = false,
 heroX = 150,
 heroY = 115,
 coinX = 150,
 coinY = 157,
 cara = 1,
 points = 0,
 cont = 0,
 timer = 10,
 jugando = false,
 reloj = 0,
 dificultad = 6,
 musicOn = true,
 soundOn = true,
 texto = 'Beginner',
 inTheMenu = false,
 enemyX = 10,
 enemyY = 10,
 clocks = 0,
 enemySpeedX = 2,
 enemySpeedY = 2,
 stop = false,
 yaTa = false,
 now,
 last = 0,
 dt = 0,
 step = 1/60,
 rapido = true;

//Game Functions
function drawTheHero(g) {
    if (cara != 5) g.drawImage(img, heroX, heroY, 30, 30);
}

function drawEnemy(g) {
    g.drawImage(images[1], enemyX, enemyY, 30, 30);
    if (points <= 249) {
        g.drawImage(images[6], 0, 0, 50, 50);
        enemyX = 10;
        enemyY = 10;
        if (points >= 248) {
            if (soundOn) {
                sounds[2].pause();
                sounds[2].currentTime = 0;
                sounds[2].play();
            }
        }
    } else {
        enemyX += enemySpeedX;
        enemyY += enemySpeedY;
        if (enemyX >= 570) {
            enemySpeedX = -enemySpeedX;
        }
        if (enemyX <= 0) {
            enemySpeedX = -enemySpeedX;
        }
        if (enemyY >= 380) {
            enemySpeedY = -enemySpeedY;
        }
        if (enemyY <= 0) {
            enemySpeedY = -enemySpeedY;
        }
    }
}

function drawCoin(g) {
    g.drawImage(images[4], coinX, coinY, 30, 30);
}

function drawLine(g, startX, startY, endX, endY) {
    g.beginPath();
    g.moveTo(startX,startY);
    g.lineTo(endX,endY);
    g.stroke();
}

function drawSounds() {
    if (soundOn && musicOn) {
        ctx.drawImage(images[11], 530, 50, 40, 40);
        ctx.drawImage(images[12], 480, 50, 40, 40);
    }else if (soundOn && !musicOn) {
        ctx.drawImage(images[11], 530, 50, 40, 40);
        ctx.drawImage(images[12], 480, 50, 40, 40);
        ctx.drawImage(images[13], 480, 50, 40, 40);
    }else if (!soundOn && musicOn) {
        ctx.drawImage(images[11], 530, 50, 40, 40);
        ctx.drawImage(images[12], 480, 50, 40, 40);
        ctx.drawImage(images[13], 530, 50, 40, 40);
    }else{
        ctx.drawImage(images[11], 530, 50, 40, 40);
        ctx.drawImage(images[12], 480, 50, 40, 40);
        ctx.drawImage(images[13], 530, 50, 40, 40);
        ctx.drawImage(images[13], 480, 50, 40, 40);
    }
}

function checkDiff() {
    if (points >= 0 && points < 25) { 
        texto = 'Beginner';
        sounds[5].playbackRate = 1;
        return "#c8cbd1";
    } else
    if (points >= 25 && points < 50) {
        return "#b6bbc4";
    } else
    if (points >= 50 && points < 75) {
        return "#9da3ad";
    } else
    if (points >= 75 && points < 100) {
        if (points == 75) dificultad = 7;
        return "#8e95a0";
    } else
    if (points >= 100 && points < 150) {
        return "#78808c";
    } else
    if (points >= 150 && points < 200) { 
        return "#6b7482";
    } else
    if (points >= 200 && points < 250) {
        texto = 'Mouse enthusiast';
        return "#535e70"; 
    } else
    if (points >= 250 && points < 300) {
        if (points == 250) dificultad = 8;
        return "#475770";
    } else
    if (points >= 300 && points < 350) {
        return "#3a4c68";
    } else
    if (points >= 350 && points < 400) {
        return "#2c3e5b";
    }
    if (points >= 400 && points < 500) {
        texto = 'Mouse addict';
        sounds[5].playbackRate = 1.2
        return "#233451"; 
    } else
    if (points >= 500 && points < 600) {
        if (rapido) {
            rapido = false;
            enemySpeedX = enemySpeedX*1.4;
            enemySpeedY = enemySpeedY*1.4;
        }
        sounds[5].playbackRate = 1.4
        return "#192a47";
    } else
    if (points >= 600 && points < 700) {
        rapido = true;
        texto = 'Mouse professional';
        sounds[5].playbackRate = 1.6
        return "#122442"; 
    } else
    if (points >= 700 && points < 750) {
        if (rapido) {
            rapido = false;
            dificultad = 9; 
            enemySpeedX = enemySpeedX*1.4; 
            enemySpeedY = enemySpeedY*1.4; 
        }
        return "#0a1d3a";
    } else
    if (points >= 750 && points < 800) {
        sounds[5].playbackRate = 1.8
        return "#0a1d3a";
    } else
    if (points >= 800 && points < 850) {
        texto = 'You are a legend';
        return "#021430"; 
    } else
    if (points >= 850 && points < 900) {
        if (points == 850) dificultad = 10;
        sounds[5].playbackRate = 2
        return "#021430";  
    } else
    if (points >= 900 && points < 1000){
        if (points == 915) dificultad = 11;
        texto = 'SAVAGE. You just won';
        return "#ff33cc";  
    } else {
        return "#f442b9";
    }
}

function drawClock(g) {
    if (clocks <= 8) { 
        g.drawImage(images[2], clockX, clockY, 30, 30); 
    } else {
        g.drawImage(images[5], clockX, clockY, 40, 40);
    }
        
}

function isTouchingClock() {
    if (clocks <= 8) {
        if (heroX + 30 > clockX -5 && heroX < clockX + 30 && heroY + 30 > clockY -5 && heroY < clockY + 30) { //normal clock
            return true;
        }
    } else {
        if (heroX + 30 > clockX - 30 && heroX < clockX + 30 && heroY + 30 > clockY - 30 && heroY < clockY + 30) { //redclock
            return true;
        }
    }
}

function moveClock() {
    if (clocks <= 8) {
        if (soundOn) sounds[3].play();
        clockX = (Math.random() * (canv.width-60))+30;
        clockY = (Math.random() * (canv.height-60))+30;
        clocks++;
        timer += 3;
        reloj = 0;
    } else {
        if (soundOn) sounds[1].play();
        clockX = (Math.random() * (canv.width-60))+30;
        clockY = (Math.random() * (canv.height-60))+30;
        clocks = 0;
        timer += 9;
        reloj = 0;
    }
}

function caraa() {   //changing player function
    switch(cara) {
        case 1:
            img = images[14];
            break;
        case 2:
            img = images[15];
            break;
        case 3:
            img = images[16];
            break;
        case 4:
            img = images[17];
            break;
        case 5:
            img = images[18];
        }
}

function drawText(g, textito, x, y, size) {   //Drawing text function
    g.font = size+"px Calibri";
    g.fillStyle = "black";
    g.fillText(textito, x, y);    //strokeText draw just border & fillText fills it up
}

function isTouchingEnemy() {   
    if (heroX + 25 > enemyX && heroX < enemyX + 25 && heroY + 25 > enemyY && heroY < enemyY + 25)
        return true;
}

function isTouchingCoin() {   
    if (heroX + 30 > coinX && heroX < coinX + 30 && heroY + 30 > coinY && heroY < coinY + 30)
        return true;
}

function moveCoin() {
    coinX = (Math.random() * (canv.width-60))+30; 
    coinY = (Math.random() * (canv.height-60))+30; 
    points++;
    reloj++;
    yaTa = false;
    if (soundOn) {
        sounds[0].pause();
        sounds[0].currentTime = 0;
        sounds[0].play();
    }
}

//Events Functions
function canvasMove(E) {  //Get mouse X,Y
    var rect = canv.getBoundingClientRect();
    heroX = E.clientX - rect.left;
    heroY = E.clientY - rect.top;
    if (!jugando && inTheMenu) {
        if (heroX >= 431 && heroX <= 600 && heroY >= 212 && heroY <= 280) {
            canv.style.cursor = 'pointer';
        } else {
            canv.style.cursor = 'default';
        }
    }
}

function clickeado(E) {  //Click for return to the startScreen.
    if (!jugando && !inTheMenu) { //User in the end-screen
        points = 0;
        coinX = 150;
        coinY = 157;
        runStart();
    } else if (!jugando && inTheMenu) {
        if (heroX >= 431 && heroX <= 600 && heroY >= 212 && heroY <= 280) {
            window.open('https://github.com/valentinoConti','_top');
        }
    }
}

function keyPush(E) {   //Keyboard input
    if (E.keyCode == 77) {  //Key M: Toggle music-sound
        if (!jugando && points == 0) {
            if (soundOn && musicOn) {
                musicOn = false;
                drawSounds();
            }else if (soundOn && !musicOn) {
                musicOn = true;
                soundOn = false;
                drawSounds();
            }else if (!soundOn && musicOn) {
                musicOn = false;
                soundOn = false;
                drawSounds();
            }else{
                musicOn = true;
                soundOn = true;
                drawSounds();
            }
        }
    }

    if (E.keyCode == 78) {  //Key N: Changing player
        if (!jugando && points == 0) {
            if (cara < 5) {
                cara++;
            }else{
                cara = 1;
            }
            caraa();
            ctx.drawImage(img, 150, 115, 30, 30);
        }
    }

    if (E.keyCode == 13) {   //Key ENTER: StartPlaying
        if (!jugando) {
            if (cara != 5) canv.style.cursor = 'none';
            points = 0;
            inTheMenu = false;
            gameInterval = requestAnimationFrame(runGame);
            jugando = true;
        }
    }

    if (E.keyCode == 65 || E.keyCode == 83 || E.keyCode == 68) {  //keys ASD: coin coin coin
        if (stop) {
            points++;
            if (soundOn) {
                sounds[0].pause();
                sounds[0].currentTime = 0;
                sounds[0].play();
            }
        }
    }
}   


function startLoading() {
    //Getting everything ready, parsing everything

    function preloadIMG() {
        var i,
        c = 0,
        totalito = preloadIMG.arguments.length;
        for (i = 0; i < totalito; i++) {
            images[i] = new Image();
            images[i].onload = function(){
                c++;
                if (c == totalito) {
                    imagesLoaded = true;
                }
            }
            images[i].src = preloadIMG.arguments[i];
        }
    }

    function preloadAUD() {
        var i, 
        d = 0, 
        totalito = preloadAUD.arguments.length;
        for (i = 0; i < totalito; i++) {
            sounds[i] = document.createElement('audio');
            sounds[i].oncanplay = function(){
                d++;
                if (d == totalito) {
                    soundsLoaded = true;
                }
            }
            sounds[i].src = preloadAUD.arguments[i];
        }
    }

    preloadIMG(
        'images\\coinCollecter.png',
        'images\\chau.png',
        'images\\reloj.png',
        'images\\mousee.png',
        'images\\moneda.png',
        'images\\reloj2.png',
        'images\\jail.png',
        'images\\gitLogo.png',
        'images\\spacebar.png',
        'images\\register.png',
        'images\\charac.png',
        'images\\sound.png',
        'images\\music.png',
        'images\\error.png',
        'images\\hola.png',
        'images\\holaa.png',
        'images\\holaaa.png',
        'images\\holaaaa.png',
        'images\\holis.png'
    );
    caraa();
    preloadAUD(
        'sound\\piuf.mp3',
        'sound\\paaf.mp3',
        'sound\\TAAS.mp3',
        'sound\\campana.mp3',
        'sound\\final.mp3',
        'sound\\hurryUpViolin.mp3'
    );
    gameInterval = setInterval(hasLoaded, 25);   
}
function hasLoaded(){
    if (soundsLoaded && imagesLoaded) {
        sounds[3].volume = 0.5;
        sounds[4].volume = 0.5;
        sounds[5].volume = 0.1;
        canv = document.getElementById("GraphicsBox");
        ctx = canv.getContext("2d");
        //First clock position
        clockX = (Math.random() * (canv.width-60))+30;
        clockY = (Math.random() * (canv.height-60))+30;
        //Event Catcher
        canv.addEventListener("mousemove", canvasMove);
        canv.addEventListener("click", clickeado);
        document.addEventListener("keydown", keyPush);
        clearInterval(gameInterval);
        runStart();
    }
}

//Start screen
function runStart() {
    canv.style.cursor = 'default';
    inTheMenu = true;
    ctx.fillStyle = "#9da3ad";
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.drawImage(img, 150, 115, 30, 30);
    drawCoin(ctx); 
    ctx.drawImage(images[2], 150, 200, 30, 30);
    ctx.drawImage(images[5], 150, 240, 30, 30);
    ctx.drawImage(images[1], 150, 75, 30, 30);
    drawText(ctx, 'You are this guy', 190, 135, 22);
    drawText(ctx, 'This guy is your enemy', 190, 95, 22);
    drawText(ctx, 'Collect these coins', 190, 180, 22);
    drawText(ctx, 'This clock adds 3 seconds', 190, 225, 22);
    drawText(ctx, 'This one adds 9', 190, 265, 22);
    drawLine(ctx, 0, 280, 600, 280);
    drawLine(ctx, 130, 0, 130, 280);
    drawLine(ctx, 430, 0, 430, 280);
    ctx.fillStyle = "#b6bbc4";
    ctx.fillRect(0,0,129,279);
    ctx.fillRect(431,0,599,279);
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 281, 600, 119)
    drawText(ctx, 'You will have to be fast with the mouse!', 195, 350, 25);
    drawText(ctx, 'Press Enter to play!', 405, 385, 25);
    ctx.drawImage(images[3], 10, 250, 150, 150);
    ctx.drawImage(images[0], 150, 10, 260, 100);
    drawSounds();
    ctx.drawImage(images[7], 431, 212, 169, 68);
    drawLine(ctx, 430, 212, 600, 212);
    drawLine(ctx, 430, 100, 600, 100);
    drawLine(ctx, 430, 150, 600, 150);
    drawText(ctx, 'Your fingers gotta be', 432, 175, 20);
    drawText(ctx, 'on your ASD keys!', 441, 200, 20);
    drawText(ctx, 'Press M to', 475, 20, 20);
    drawText(ctx, 'toggle music/sound', 440, 40, 19);
    drawText(ctx, 'Press N to', 465, 120, 22);
    drawText(ctx, 'change your guy', 440, 140, 22);
}

function update() {
    ctx.fillStyle = checkDiff();
    ctx.fillRect(0,0,canv.width,canv.height);  //Background Screen
    cont++;
    if (musicOn) sounds[5].play(); else sounds[5].pause();

    if (!stop) {  //jugando
        if (!yaTa && (points == 110 || points == 211 || points == 315 || points == 433 || points == 651 || points == 820 || points == 922)) {
            cont = 0;
            stop = true;
        }
        if (isTouchingCoin()) moveCoin();
        if (isTouchingEnemy() && points >= 251) timer = 0;
        
        if (cont >= 60) {
            timer--;
            cont = 0;
        }
    }else{    //click click click!! 
        yaTa = true;
        
        if (cont >= 126) {
            cont = 0;
            stop = false;
        }
    }
}

function draw() {
   drawTheHero(ctx);                           
    drawText(ctx,'Points: ' + points,10,canv.height-15, 30);
    drawText(ctx, 'Time: ' + timer,canv.width-115,canv.height-15, 30);
    if (!stop) {
        drawCoin(ctx);                              
        drawEnemy(ctx);       
        if (reloj >= dificultad) {
            drawClock(ctx);
            if (isTouchingClock()) moveClock();
        }
    } else {
        ctx.drawImage(images[8], 240, 360, 120, 30);
        drawText(ctx, 'ASD ASD ASD ASD!!!', 185, 345, 30);
    } 
}

function lose() {
    canv.style.cursor = "default";
    sounds[5].pause();
    if (soundOn) sounds[4].play();
    window.cancelAnimationFrame(gameInterval);
    runEnd();
}

//Playing the game
function runGame() 
{
    now = window.performance.now();
    dt = dt + Math.min(1, (now - last) / 1000);
    if(dt > step) {      //making sure logic goes 60fps
        dt = dt - step;
        update();
    }
    draw();             //but drawing as fast as it cans
    last = now;
    gameInterval = requestAnimationFrame(runGame);

    if (timer <= 0) { //LOSED!
        lose();
    }
}

//Score screen
function runEnd() 
{
    enemyX = 10;
    enemyY = 10;
    ctx.fillStyle = checkDiff();
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.fillStyle = "#999966";
    ctx.fillRect(0,0,600,64);
    drawText(ctx, 'Score: ' + points, 200, 45, 45);
    drawLine(ctx, 0, 65, 600, 65);
    drawText(ctx, 'Click for the Menu', 435, 280, 20);
    drawText(ctx, 'Press ENTER to Play again!', 7, 390, 20);
    ctx.drawImage(images[3], 440, 250, 150, 150);
    ctx.drawImage(images[10], 6, 80, 250, 78);
    drawText(ctx, ': ' + texto, 266, 130, 30);
    jugando = false;
    cont = 0;
    clocks = 0;
    timer = 10;
    reloj = 0;
    rapido = true;
    dificultad = 6;
    enemySpeedX = 2;
    enemySpeedY = 2;
}