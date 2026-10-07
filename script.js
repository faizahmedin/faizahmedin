/* =========================================
   GET ELEMENTS
========================================= */

const loadingScreen =
    document.getElementById("loading-screen");

const progressBar =
    document.getElementById("progress-bar");

const progressNumber =
    document.getElementById("progress-number");

const scanScreen =
    document.getElementById("scan-screen");

const scanLines =
    document.getElementById("scan-lines");

const continueButton =
    document.getElementById("continue-btn");



/* =========================================
   SCREEN 1 — LOADING
========================================= */

let progress = 0;

const progressTimer = setInterval(() => {

    progress++;

    progressBar.style.width =
        progress + "%";

    progressNumber.textContent =
        progress + "%";


    if (progress >= 100) {

        clearInterval(progressTimer);


        setTimeout(() => {

            loadingScreen.style.opacity =
                "0";


            setTimeout(() => {

                loadingScreen.style.display =
                    "none";

                scanScreen.classList.add(
                    "show"
                );

                startScanning();

            }, 1300);

        }, 500);

    }

}, 30);



/* =========================================
   SCREEN 2 — SCANNING
========================================= */

const messages = [

    "scanning memories...",

    "loading 20 years of awesomeness...",

    "finding birthday girl...",

    "FOUND ❤️"

];


function startScanning() {

    let currentLine = 0;


    function showNextLine() {

        if (
            currentLine >=
            messages.length
        ) {

            continueButton.style.display =
                "inline-block";

            return;

        }


        const line =
            document.createElement("div");


        line.classList.add(
            "scan-line"
        );


        if (currentLine === 3) {

            line.classList.add(
                "found"
            );

        }


        line.textContent =
            messages[currentLine];


        scanLines.appendChild(line);


        currentLine++;


        setTimeout(
            showNextLine,
            1100
        );

    }


    showNextLine();

}



/* =========================================
   SCREEN 3 — BIRTHDAY
========================================= */

const birthdayScreen =
    document.getElementById(
        "birthday-screen"
    );


const birthdayReveal =
    document.getElementById(
        "birthday-reveal"
    );


const flame =
    document.getElementById(
        "flame"
    );


const birthdayMusic =
    document.getElementById(
        "birthday-music"
    );



/* =========================================
   CONTINUE SCREEN 2 → SCREEN 3
========================================= */

continueButton.addEventListener(
    "click",
    () => {

        scanScreen.classList.remove(
            "show"
        );

        birthdayScreen.classList.add(
            "show"
        );

    }
);



/* =========================================
   CANDLE CLICK
========================================= */

flame.addEventListener(
    "click",
    () => {


        /*
            Prevent clicking twice
        */

        if (
            flame.classList.contains(
                "out"
            )
        ) {

            return;

        }


        /*
            Turn flame off
        */

        flame.classList.add(
            "out"
        );


        /*
            Small delay before reveal
        */

        setTimeout(
            () => {


                /*
                    Hide Screen 3
                */

                birthdayScreen.classList.remove(
                    "show"
                );


                /*
                    Show Screen 4
                */

                birthdayReveal.classList.add(
                    "show"
                );


                /*
                    Start music
                */

                birthdayMusic.volume =
                    0.65;


                birthdayMusic.play().catch(
                    error => {

                        console.log(
                            "Music could not start:",
                            error
                        );

                    }
                );


                /*
                    Start fireworks
                */

                startFireworkShow();


            },
            700
        );

    }
);



/* =========================================
   FIREWORK CANVAS
========================================= */

const fireworksCanvas =
    document.getElementById(
        "fireworks"
    );


const fireworksContext =
    fireworksCanvas.getContext(
        "2d"
    );


let fireworksParticles = [];
let fireworksAnimationRunning = true;



/* =========================================
   FIREWORK CANVAS SIZE
========================================= */

function resizeFireworks() {

    fireworksCanvas.width =
        window.innerWidth;

    fireworksCanvas.height =
        window.innerHeight;

}


resizeFireworks();


window.addEventListener(
    "resize",
    resizeFireworks
);



/* =========================================
   CREATE ONE FIREWORK
========================================= */

function launchFirework(
    x,
    y
) {


    /*
        Number of particles
        in each explosion.
    */

    const particleCount =
        130;


    /*
        Firework colors
    */

    const colors = [

        {
            r: 230,
            g: 70,
            b: 170
        },

        {
            r: 180,
            g: 50,
            b: 210
        },

        {
            r: 255,
            g: 120,
            b: 190
        },

        {
            r: 150,
            g: 80,
            b: 230
        }

    ];


    const color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {


        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            6 + 2;


        fireworksParticles.push({

            x: x,

            y: y,

            velocityX:
                Math.cos(angle) *
                speed,

            velocityY:
                Math.sin(angle) *
                speed,

            /*
                Slow fading
            */

            life: 1,

            decay:
                Math.random() *
                0.003 +
                0.002,

            size:
                Math.random() *
                2.5 +
                1,

            gravity:
                0.025,

            red:
                color.r,

            green:
                color.g,

            blue:
                color.b

        });

    }

}



/* =========================================
   RANDOM FIREWORK
========================================= */

function launchRandomFirework() {


    /*
        Random horizontal position
    */

    const x =
        Math.random() *
        fireworksCanvas.width;


    /*
        Random vertical position
    */

    const y =
        Math.random() *
        (
            fireworksCanvas.height *
            0.65
        );


    launchFirework(
        x,
        y
    );

}



/* =========================================
   CONTINUOUS FIREWORK SHOW
   LASTS 20 SECONDS
========================================= */


/* =========================================
   FIREWORK SHOW
   CONTINUOUS FOR 6 SECONDS
========================================= */

function startFireworkShow() {

    const showDuration = 6000;

    const showEnd =
        Date.now() + showDuration;


    /* =====================================
       FIREWORK LAUNCHER
    ===================================== */

    const fireworksTimer = setInterval(() => {

        /* Stop launching after 6 seconds */

        if (Date.now() >= showEnd) {

            clearInterval(fireworksTimer);

            /*
                Remove ALL remaining fireworks
            */

            fireworksParticles = [];

            return;

        }


        /* =================================
           LAUNCH MULTIPLE FIREWORKS
        ================================= */

        launchRandomFirework();


        setTimeout(() => {

            if (Date.now() < showEnd) {

                launchRandomFirework();

            }

        }, 120);


        setTimeout(() => {

            if (Date.now() < showEnd) {

                launchRandomFirework();

            }

        }, 250);


        setTimeout(() => {

            if (Date.now() < showEnd) {

                launchRandomFirework();

            }

        }, 380);


    }, 450);


    /* =====================================
       BIG OPENING
    ===================================== */

    launchRandomFirework();

    setTimeout(
        launchRandomFirework,
        150
    );

    setTimeout(
        launchRandomFirework,
        300
    );

}


/* =========================================
   ANIMATE FIREWORKS
========================================= */

function animateFireworks() {


    /*
        Clear previous frame
    */

    fireworksContext.clearRect(

        0,

        0,

        fireworksCanvas.width,

        fireworksCanvas.height

    );


    /*
        Remove dead particles
    */

    fireworksParticles =
        fireworksParticles.filter(
            particle =>
                particle.life > 0
        );


    /*
        Update and draw particles
    */

    fireworksParticles.forEach(
        particle => {


            /*
                Movement
            */

            particle.x +=
                particle.velocityX;


            particle.y +=
                particle.velocityY;


            /*
                Gravity
            */

            particle.velocityY +=
                particle.gravity;


            /*
                Smooth slowdown
            */

            particle.velocityX *=
                0.992;


            particle.velocityY *=
                0.992;


            /*
                Fade slowly
            */

            particle.life -=
                particle.decay;


            /*
                Draw
            */

            fireworksContext.beginPath();


            fireworksContext.fillStyle =
                `rgba(
                    ${particle.red},
                    ${particle.green},
                    ${particle.blue},
                    ${particle.life}
                )`;


            fireworksContext.shadowBlur =
                12;


            fireworksContext.shadowColor =
                `rgba(
                    ${particle.red},
                    ${particle.green},
                    ${particle.blue},
                    ${particle.life}
                )`;


            fireworksContext.arc(

                particle.x,

                particle.y,

                particle.size,

                0,

                Math.PI * 2

            );


            fireworksContext.fill();

        }
    );


    fireworksContext.shadowBlur =
        0;


    /*
        Keep animation running
    */

    if (fireworksAnimationRunning) {

    requestAnimationFrame(
        animateFireworks
    );

}

}


animateFireworks();



/* =========================================
   WISH BOX
   SAVE WISH FOR LAST PAGE
========================================= */

const wishInput =
    document.getElementById("wish-input");


if (wishInput) {

    /* Save the wish whenever she types */

    wishInput.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "birthdayWish",
                wishInput.value
            );

        }
    );

}
/* =========================================
   FURTHER QUESTION — YES / NO
========================================= */

const yesButton =
    document.getElementById("yes-btn");

const noButton =
    document.getElementById("no-btn");


/* =========================================
   YES → MESSAGE PAGE
========================================= */

yesButton.addEventListener(
    "click",
    () => {

        /* Save current music position */

        localStorage.setItem(
            "birthdayMusicTime",
            birthdayMusic.currentTime
        );

        window.location.href =
            "message.html";

    }
);


/* =========================================
   NO → PLAYFUL BUTTON
========================================= */

noButton.addEventListener(
    "click",
    () => {

        noButton.textContent =
            "😭😭😔HAHAHA! You have to, No going back😂";

    }
);
