function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

const mapWidth =  window.innerWidth;
const mapHeight = window.innerHeight;
const isMobile = detectMobile();

var player=document.getElementById("player")
var supply=document.getElementById("supply")

var zombieDivs=document.getElementsByClassName("zombie")
var zombies = [];
// [...zombieDivs].forEach((div) =>  {
//     zombies.push({
//         element: div,
//         X: Math.random() * mapWidth,
//         Y: Math.random() * mapHeight,
//         Speed: Math.random() * 5,
//     })
// })

var alive = true;
var score=0
var playerX = window.innerWidth / 2;
var playerY = window.innerHeight / 2;
var playerSpeed = 20;

var playerVelocity =  {
    x: 0,
    y: 0 
};

supply.style.left = Math.random() * mapWidth + 'px'
supply.style.top = Math.random() * mapHeight + 'px'


if (isMobile) {
    console.log('mobile mode enabled')

    document.addEventListener('swiped-right', function(e) {
        console.log(e.target); // the element that was swiped
        playerVelocity =  {
            x: 10,
            y: 0 
        }

    });

    document.addEventListener('swiped-left', function(e) {
        console.log(e.target); // the element that was swiped
        playerVelocity =  {
            x: -10,
            y: 0 
        }   
     });

    document.addEventListener('swiped-up', function(e) {
        console.log(e.target); // the element that was swiped
        playerVelocity =  {
            x: 0,
            y: -10 
        }

    });

    document.addEventListener('swiped-down', function(e) {
        console.log(e.target); // the element that was swiped
        playerVelocity =  {
            x: 0,
            y: 10 
        }

    });

}

else {

    document.addEventListener('keydown', function(event) {
        var key = event.key;
        moveplayer(event.key)
    });
    
}


function moveplayer(direction) {

    if (direction === 'ArrowUp') {
        console.log('Moving Up');
        playerY -= playerSpeed;

    }

    if (direction === 'ArrowDown') {
        console.log('Moving Down');
        playerY += playerSpeed;
    }


    if (direction === 'ArrowLeft') {
        playerX -= playerSpeed;

    }

    if (direction === 'ArrowRight') {
        console.log('Moving Right');
        playerX += playerSpeed;

    }

}

function collide(player, zombie) {
    var rect1 = player.getBoundingClientRect();
    var rect2 = zombie.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
}

function gameover() {
    document.getElementById("gameover").style.display="block"
}

setInterval(() => {


    if (!alive) {
        return;
    }

    playerY += playerVelocity.y;
    playerX += playerVelocity.x;
    console.log(playerVelocity, playerX, playerY)
    Math.min(Math.max(playerY, 0), document.body.scrollHeight)
    player.style.top = Math.min(Math.max(playerY, 0), document.body.scrollHeight - player.getBoundingClientRect().height) + 'px';
    player.style.left = Math.min(Math.max(playerX, 0), document.body.scrollWidth - player.getBoundingClientRect().width) + 'px';

    zombies.forEach((zombie) =>  {
        if (zombie.X < playerX) {
            zombie.X += zombie.Speed;
        }

        if (zombie.X > playerX) {
            zombie.X -= zombie.Speed;
        }

        if (zombie.Y < playerY) {
            zombie.Y += zombie.Speed;
        }

        if (zombie.Y > playerY) {
            zombie.Y -= zombie.Speed;
        }

        zombie.element.style.top = zombie.Y + 'px';
        zombie.element.style.left = zombie.X + 'px';

        if (collide(player, zombie.element)) {
            console.error('YOU DIED!!');
            alive = false
            gameover()
        }
    })


        if (collide(player, supply)) {
            score = score + 1
            const newZombie = document.getElementById('zombie').cloneNode(false);

            zombies.push({
                element: newZombie,
                X: Math.random() * mapWidth,
                Y: Math.random() * mapHeight,
                Speed: Math.random() * 5,
            })

            document.body.appendChild(newZombie);
            document.getElementById("score").innerHTML="score: "+score
            supply.style.left = Math.random() * mapWidth + 'px'
            supply.style.top = Math.random() * mapHeight + 'px'
        }



}, 24);
