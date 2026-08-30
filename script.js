    
const canvas = document.getElementById("platno");
const ctx = canvas.getContext("2d");

const krok = 50;

const levyOkraj = 50;
const horniOkraj = 100;

// =====================
// OBRÁZKY
// =====================

const obrazky = [

    {
        nazev: "Domecek",
        body: [
            [2,2],
            [2,6],
            [5,9],
            [8,6],
            [8,2]
        ]
    },

    {
        nazev: "Trojuhelnik",
        body: [
            [2,2],
            [5,8],
            [8,2]
        ]
    },
    {
        nazev: "Srdce",
        body: [
            [5,1],
            [8,4],
            [8,7],
            [6,9],
            [5,8],
            [4,9],
            [2,7],
            [2,4]
        ]
    },

    {
        nazev: "Hvezda",
        body: [
          [5,9],
          [6,6],
          [9,5],
          [6,4],
          [5,1],
          [4,4],
          [1,5],
          [4,6]
      ]      
    },

    {
        nazev: "Lodka",
        body: [
            [2,5],
            [8,5],
            [6,2],
            [4,2]
        ]
    },

    {
        nazev: "Sipka",
        body: [
            [2,5],
            [6,5],
            [6,8],
            [9,5],
            [6,2],
            [6,5]
        ]
    }
];

const vybranyObrazek =
    obrazky[Math.floor(Math.random() * obrazky.length)];

const obrazek = vybranyObrazek.body;
console.log(obrazky.length);
console.log(vybranyObrazek.nazev);
let aktualniBod = 0;
let odpovedi = [];

// =====================
// KRESLENÍ SÍTĚ
// =====================

function nakresliSit(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

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

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(levyOkraj, horniOkraj + 500);
    ctx.lineTo(levyOkraj + 520, horniOkraj + 500);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(levyOkraj + 520, horniOkraj + 500);
    ctx.lineTo(levyOkraj + 510, horniOkraj + 494);
    ctx.lineTo(levyOkraj + 510, horniOkraj + 506);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(levyOkraj, horniOkraj + 500);
    ctx.lineTo(levyOkraj, horniOkraj - 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(levyOkraj, horniOkraj - 30);
    ctx.lineTo(levyOkraj - 6, horniOkraj - 18);
    ctx.lineTo(levyOkraj + 6, horniOkraj - 18);
    ctx.closePath();
    ctx.fill();

    ctx.font = "14px Arial";

    for(let i=0;i<=10;i++){
        ctx.fillText(
            i,
            levyOkraj + i*krok - 4,
            horniOkraj + 525
        );
    }

    for(let i=0;i<=10;i++){
        ctx.fillText(
            i,
            levyOkraj - 25,
            horniOkraj + 505 - i*krok
        );
    }

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

        ctx.closePath();

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
function restartHry(){

    aktualniBod = 0;
    odpovedi = [];

    nakresliSit();
    zobrazUkol();
}

