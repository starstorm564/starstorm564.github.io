var player=document.getElementById("player")
var supply=document.getElementById("supply")

var zombieDivs=document.getElementsByClassName("zombie")
var zombies = [];
[...zombieDivs].forEach((div) =>  {
    zombies.push({
        element: div,
        X: Math.random() * 800,
        Y: Math.random() * 800,
        Speed: Math.random() * 5,
    })
})

var alive = true;
var score=0
var playerX = window.innerWidth / 2;
var playerY = window.innerHeight / 2;
var playerSpeed = 20;

supply.style.left = Math.random() * 800 + 'px'
supply.style.top = Math.random() * 800 + 'px'

document.addEventListener('keydown', function(event) {
    var key = event.key;
    moveplayer(event.key)
});


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

    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';

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
                X: Math.random() * 800,
                Y: Math.random() * 800,
                Speed: Math.random() * 5,
            })

            document.body.appendChild(newZombie);
            document.getElementById("score").innerHTML="score: "+score
            supply.style.left = Math.random() * 800 + 'px'
            supply.style.top = Math.random() * 800 + 'px'
        }



}, 24);
