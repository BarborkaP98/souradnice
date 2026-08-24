const canvas = document.getElementById("platno");
const ctx = canvas.getContext("2d");

const krok = 50;

const levyOkraj = 50;
const horniOkraj = 100;

const obrazky = [

    {
        nazev: "Domeček",
        body: [
            [2,2],
            [2,6],
            [5,9],
            [8,6],
            [8,2],
            [2,2]
        ]
    },

    {
        nazev: "Loďka",
        body: [
            [2,2],
            [8,2],
            [6,5],
            [4,5],
            [2,2]
        ]
    },

    {
        nazev: "Trojúhelník",
        body: [
            [2,2],
            [5,8],
            [8,2],
            [2,2]
        ]
    }

];
const vybranyObrazek =
    obrazky[Math.floor(Math.random() * obrazky.length)];

const obrazek = vybranyObrazek.body;
let aktualniBod = 0;
let odpovedi = [];

// =====================
// KRESLENÍ SÍTĚ
// =====================

function nakresliSit(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // mřížka
    ctx.strokeStyle = "#d9d9d9";
    ctx.lineWidth = 1;

    for(let i = 0; i <= 10; i++){

        ctx.beginPath();
        ctx.moveTo(levyOkraj + i*krok, horniOkraj);
        ctx.lineTo(levyOkraj + i*krok, horniOkraj + 500);
        ctx.stroke();

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

// =====================
// ZADÁNÍ
// =====================

function zobrazUkol(){

    if(aktualniBod >= obrazek.length){

        vyhodnot();
        return;
    }

    document.getElementById("vypis").textContent =
        `Klikni na bod [${obrazek[aktualniBod][0]},${obrazek[aktualniBod][1]}]`;
}

// =====================
// VYHODNOCENÍ
// =====================

function vyhodnot(){

    // překreslíme síť
    nakresliSit();

    let spravne = 0;

    for(let i = 0; i < obrazek.length; i++){

        const jeSpravne =
            odpovedi[i][0] === obrazek[i][0] &&
            odpovedi[i][1] === obrazek[i][1];

        if(jeSpravne){
            spravne++;
        }

        ctx.beginPath();

        ctx.arc(
            levyOkraj + odpovedi[i][0] * krok,
            horniOkraj + (10 - odpovedi[i][1]) * krok,
            8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = jeSpravne ? "green" : "red";
        ctx.fill();
    }

    // při 100 % spoj body
    if(spravne === obrazek.length){

        ctx.beginPath();

        for(let i = 0; i < obrazek.length; i++){

            const x = levyOkraj + obrazek[i][0] * krok;
            const y = horniOkraj + (10 - obrazek[i][1]) * krok;

            if(i === 0){
                ctx.moveTo(x,y);
            } else {
                ctx.lineTo(x,y);
            }
        }

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        ctx.stroke();

        document.getElementById("vypis").textContent =
            "🎉 Výborně! Obrázek odhalen!";
    }
    else{

        document.getElementById("vypis").textContent =
            `Správně ${spravne} z ${obrazek.length}`;
    }
}
function restartHry(){

    aktualniBod = 0;
    odpovedi = [];

    nakresliSit();
    zobrazUkol();
}
// =====================
// START
// =====================

nakresliSit();
zobrazUkol();

// =====================
// KLIKNUTÍ
// =====================

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

    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(
        levyOkraj + x*krok,
        horniOkraj + (10-y)*krok,
        5,
        0,
        Math.PI * 2
    );
    ctx.fill();

    odpovedi.push([x,y]);

    aktualniBod++;

    zobrazUkol();
});
