/* =========================================================
   MESSAGE PAGE JAVASCRIPT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
   MUSIC — CONTINUE FROM PREVIOUS PAGE
===================================================== */

const music =
    document.getElementById("message-music");

const musicButton =
    document.getElementById("music-start-btn");

if (music) {

    music.volume = 0.65;


    /* ================================================
       GET SAVED MUSIC POSITION
    ================================================ */

    const savedTime =
        localStorage.getItem("birthdayMusicTime");


    /* ================================================
       WAIT FOR AUDIO TO LOAD
    ================================================ */

    music.addEventListener(
        "loadedmetadata",
        () => {

            if (savedTime !== null) {

                music.currentTime =
                    parseFloat(savedTime);

            }


            /* Try to continue playing */

            music.play()
                .then(() => {

                    console.log(
                        "Birthday music continued."
                    );

                    if (musicButton) {

                        musicButton.style.display =
                            "none";

                    }

                })
                .catch(() => {

                    console.log(
                        "Autoplay blocked."
                    );

                    if (musicButton) {

                        musicButton.style.display =
                            "block";

                    }

                });

        }
    );


    /* ================================================
       MUSIC BUTTON
    ================================================ */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            () => {

                music.play()
                    .then(() => {

                        musicButton.style.display =
                            "none";

                    })
                    .catch(error => {

                        console.log(
                            "Music error:",
                            error
                        );

                    });

            }
        );

    }

}


        /* =================================================
   SEND WISH → GMAIL
================================================= */

const sendWishButton =
    document.getElementById("send-wish-btn");

const wishStatus =
    document.getElementById("wish-send-status");


if (sendWishButton) {

    sendWishButton.addEventListener(
        "click",
        () => {

            /* Get the wish saved on the cake page */

            const wish =
                localStorage.getItem("birthdayWish");


            /* Check if she actually wrote something */

            if (!wish || wish.trim() === "") {

                wishStatus.textContent =
                    "😭Wish is Empty 😭Go back and fill the text up😭";

                return;

            }


            /* Email details */

            const recipient =
                "faizmustafa7631@gmail.com";

            const subject =
                "A Birthday Wish ❤️";


            const emailBody =
                "FATIMA TU ZAHRA Wish Is:\n\n"
                + wish;


            /* Gmail compose */

            const gmailURL =
                "https://mail.google.com/mail/?view=cm"
                + "&fs=1"
                + "&to="
                + encodeURIComponent(recipient)
                + "&su="
                + encodeURIComponent(subject)
                + "&body="
                + encodeURIComponent(emailBody);


            /* Open Gmail */

            window.open(
                gmailURL,
                "_blank"
            );

        }
    );

}


        /* =================================================
           PREVENT IMAGE DRAGGING
        ================================================= */

        const image =
            document.querySelector(
                ".birthday-background"
            );


        if (image) {

            image.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();

                }
            );

        }


        /* =================================================
           KEEP PAGE AT TOP
        ================================================= */

        window.scrollTo(
            0,
            0
        );

    }
);