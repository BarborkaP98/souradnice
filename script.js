const canvas = document.getElementById("platno");
const ctx = canvas.getContext("2d");

const krok = 50;

const levyOkraj = 50;
const horniOkraj = 100;

function nakresliSit(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // mřížka
    ctx.strokeStyle = "#d9d9d9";
    ctx.lineWidth = 1;

    for(let i = 0; i <= 10; i++){

        // svislé čáry
        ctx.beginPath();
        ctx.moveTo(levyOkraj + i*krok, horniOkraj);
        ctx.lineTo(levyOkraj + i*krok, horniOkraj + 500);
        ctx.stroke();

        // vodorovné čáry
        ctx.beginPath();
        ctx.moveTo(levyOkraj, horniOkraj + i*krok);
        ctx.lineTo(levyOkraj + 500, horniOkraj + i*krok);
        ctx.stroke();
    }

    // osa X
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(levyOkraj, horniOkraj + 500);
    ctx.lineTo(levyOkraj + 520, horniOkraj + 500);
    ctx.stroke();

    // šipka X
    ctx.beginPath();
    ctx.moveTo(levyOkraj + 520, horniOkraj + 500);
    ctx.lineTo(levyOkraj + 510, horniOkraj + 494);
    ctx.lineTo(levyOkraj + 510, horniOkraj + 506);
    ctx.closePath();
    ctx.fill();

    // osa Y
    ctx.beginPath();
    ctx.moveTo(levyOkraj, horniOkraj + 500);
    ctx.lineTo(levyOkraj, horniOkraj - 30);
    ctx.stroke();

    // šipka Y
    ctx.beginPath();
    ctx.moveTo(levyOkraj, horniOkraj - 30);
    ctx.lineTo(levyOkraj - 6, horniOkraj - 18);
    ctx.lineTo(levyOkraj + 6, horniOkraj - 18);
    ctx.closePath();
    ctx.fill();

    // čísla X
    ctx.font = "14px Arial";

    for(let i=0;i<=10;i++){

        ctx.fillText(
            i,
            levyOkraj + i*krok - 4,
            horniOkraj + 525
        );
    }

    // čísla Y
    for(let i=0;i<=10;i++){

        ctx.fillText(
            i,
            levyOkraj - 25,
            horniOkraj + 505 - i*krok
        );
    }

    // popisky os
    ctx.font = "bold 22px Arial";

    ctx.fillText(
        "x",
        levyOkraj + 540,
        horniOkraj + 508
    );

    ctx.fillText(
        "y",
        levyOkraj - 7,
        horniOkraj - 45
    );
}

nakresliSit();

canvas.addEventListener("click", function(e){

    const rect = canvas.getBoundingClientRect();

    const x = Math.round(
        (e.clientX - rect.left - levyOkraj) / krok
    );

    const y = 10 - Math.round(
        (e.clientY - rect.top - horniOkraj) / krok
    );

    if(x < 0 || x > 10 || y < 0 || y > 10){
        return;
    }

    ctx.beginPath();
    ctx.arc(
        levyOkraj + x*krok,
        horniOkraj + (10-y)*krok,
        5,
        0,
        Math.PI * 2
    );
    ctx.fill();

    document.getElementById("vypis").textContent =
        `Souřadnice: [${x},${y}]`;
});

