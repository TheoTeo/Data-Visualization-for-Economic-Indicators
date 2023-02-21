let urlPIB = ["http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/sdg_08_10?na_item=B1GQ&precision=1&geo=AT&geo=BE&geo=BG&geo=CY&geo=CZ&geo=DE&geo=DK&geo=EE&geo=EL&geo=ES&geo=FI&geo=FR&geo=HR&geo=HU&geo=IE&geo=IT&geo=LT&geo=LU&geo=LV&geo=MT&geo=NL&geo=PL&geo=PT&geo=RO&geo=SE&geo=SI&geo=SK&unit=CLV10_EUR_HAB&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018&time=2019&time=2020"]

let urlSV = ["http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_mlexpec?precision=1&sex=T&geo=AT&geo=BE&geo=BG&geo=CY&geo=CZ&geo=DE&geo=DK&geo=EE&geo=EL&geo=ES&geo=FI&geo=FR&geo=HR&geo=HU&geo=IE&geo=IT&geo=LT&geo=LU&geo=LV&geo=MT&geo=NL&geo=PL&geo=PT&geo=RO&geo=SE&geo=SI&geo=SK&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018&time=2019&time=2020&age=Y1"]

let urlPOP = ["http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_pjan?precision=1&sex=T&geo=AT&geo=BE&geo=BG&geo=CY&geo=CZ&geo=DE&geo=DK&geo=EE&geo=EL&geo=ES&geo=FI&geo=FR&geo=HR&geo=HU&geo=IE&geo=IT&geo=LT&geo=LU&geo=LV&geo=MT&geo=NL&geo=PL&geo=PT&geo=RO&geo=SE&geo=SI&geo=SK&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018&time=2019&time=2020&age=TOTAL"]

let lista_PIB = []
let lista_SV = []
let lista_POP = []
let lista_ani = []
let lista_tari = []

function getPIB(link) {
    return fetch(link)
        .then(res => res.json())
        .then(data => {
            let stringValPIB = data.value;
            lista_PIB = Object.values(stringValPIB);//am preluat PIB-ul

            let stringTari = data.dimension.geo.category.label;
            lista_tari = Object.values(stringTari);//am preluat tarile

            let stringAni = data.dimension.time.category.label;
            lista_ani = Object.values(stringAni);//am preluat anii
            return Promise.resolve(lista_PIB, lista_tari, lista_ani);


        }
        )
        .catch(err => { throw err; });
}

function getSV(link) {
    return fetch(link)
        .then(res => res.json())
        .then(data => {
            let stringSV = data.value;
            lista_SV = Object.values(stringSV);//am preluat speranta la viata

            lista_SV.splice(14, 0, 0);
            lista_SV.splice(29, 0, 0);
            lista_SV.splice(44, 0, 0);
            lista_SV.splice(59, 0, 0);
            lista_SV.splice(74, 0, 0);
            lista_SV.splice(89, 0, 0);
            lista_SV.splice(104, 0, 0);
            lista_SV.splice(119, 0, 0);
            lista_SV.splice(134, 0, 0);
            lista_SV.splice(149, 0, 0);
            lista_SV.splice(164, 0, 0);
            lista_SV.splice(179, 0, 0);
            lista_SV.splice(194, 0, 0);
            lista_SV.splice(209, 0, 0);
            lista_SV.splice(224, 0, 0);
            lista_SV.splice(239, 0, 0);
            lista_SV.splice(254, 0, 0);
            lista_SV.splice(269, 0, 0);
            lista_SV.splice(284, 0, 0);
            lista_SV.splice(299, 0, 0);
            lista_SV.splice(314, 0, 0);
            lista_SV.splice(329, 0, 0);
            lista_SV.splice(344, 0, 0);
            lista_SV.splice(359, 0, 0);
            lista_SV.splice(374, 0, 0);
            lista_SV.splice(389, 0, 0);
            lista_SV.splice(404, 0, 0);//am adaugat 0 pentru anul 2020 la fiecare tara deoarece erau date lipsa 

            return Promise.resolve(lista_SV);

        }
        )
        .catch(err => { throw err; });
}


function getPOP(link) {
    return fetch(link)
        .then(res => res.json())
        .then(data => {
            let stringPOP = data.value;
            lista_POP = Object.values(stringPOP);//am preluat Populatia
            return Promise.resolve(lista_POP);


        }
        )
        .catch(err => { throw err; });
}

/////////////PRELUCRAREA DATELOR
Promise.all(
    urlPIB.map(getPIB)
).then((data1) => {
    Promise.all(urlSV.map(getSV)).then((data2 => {
        Promise.all(urlPOP.map(getPOP)).then((data3) => {
            let listaCompleta = [];
            let index = 0;

            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "PIB", "valoare": lista_PIB[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "SV", "valoare": lista_SV[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "POP", "valoare": lista_POP[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }

            let listaCompletaJSON = [];
            listaCompletaJSON = JSON.stringify(listaCompleta);
            console.log(listaCompletaJSON);
        })
    }))
})

var sirAni = new Array();
sirAni[0] = "2006";
sirAni[1] = "2007";
sirAni[2] = "2008";
sirAni[3] = "2009";
sirAni[4] = "2010";
sirAni[5] = "2011";
sirAni[6] = "2012";
sirAni[7] = "2013";
sirAni[8] = "2014";
sirAni[9] = "2015";
sirAni[10] = "2016";
sirAni[11] = "2017";
sirAni[12] = "2018";
sirAni[13] = "2019";
sirAni[14] = "2020";

///////////////////////BAR CHART
var svg, svgW, svgH, svgMargine, svgSpatiu, margineSpatiu, margineH, barchartW, barchartMargine, nrTotalBare, valMax, labelPeAxaY;

function SetBarChart(lista) {
    svgMargine = 20;
    svgSpatiu = 0;
    svgH = 600 - 2 * svgMargine - svgSpatiu;
    svgW = 550 - 2 * svgMargine - svgSpatiu;

    margineSpatiu = svgMargine + svgSpatiu;
    margineH = svgMargine + svgH;
    barchartMargine = 15;
    nrTotalBare = sirAni.length;
    barchartW = (svgW / nrTotalBare) - barchartMargine;

    valMax = 0;
    for (let i = 0; i < nrTotalBare; i++) {
        var barVal = lista[i];
        if (barVal > valMax) {
            valMax = barVal;
        }
    }
    labelPeAxaY = nrTotalBare;
}

function deseneazaXY(x1, y1, x2, y2) {
    var noileAxe = document.createElementNS("http://www.w3.org/2000/svg", "line");
    noileAxe.setAttribute("x1", x1);
    noileAxe.setAttribute("y1", y1);
    noileAxe.setAttribute("x2", x2);
    noileAxe.setAttribute("y2", y2);
    noileAxe.style.stroke = "black";
    noileAxe.style.strokeWidth = "2px";
    svg.appendChild(noileAxe);

}

function scrieMarcatori() {
    for (let i = 0; i < nrTotalBare; i++) {
        markerX = margineSpatiu + barchartMargine + (i * (barchartW + barchartMargine)) + (barchartW / 2);
        markerY = margineH + 20;
        textelem = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textelem.setAttribute("dx", markerX);
        textelem.setAttribute("dy", markerY);
        textelem.setAttribute("class", "text");
        textnode = document.createTextNode(sirAni[i]);
        textelem.appendChild(textnode);
        svg.appendChild(textelem);
    }
}

function deseneazaAxele() {
    deseneazaXY(margineSpatiu, margineH, margineSpatiu, svgMargine);
    deseneazaXY(margineSpatiu, margineH, margineSpatiu + barchartW + 500, margineH);
    scrieMarcatori();
}

function deseneazaRectChart(x, y, wdth, hth, fill, i) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    rect.setAttributeNS(null, "width", wdth);
    rect.setAttributeNS(null, "height", hth);
    rect.setAttributeNS(null, "fill", "indigo");
    rect.setAttributeNS(null, "id", i);
    rect.setAttribute("class", "tooltip")
    svg.appendChild(rect);

}

function deseneazaChart(lista_b) {
    for (let i = 0; i < nrTotalBare; i++) {
        var bVal = lista_b[i];
        bh = (bVal * svgH / (valMax));
        bx = margineSpatiu + (i * (barchartW + barchartMargine)) + barchartMargine + 10;
        by = margineH - bh - 2;
        deseneazaRectChart(bx, by, barchartMargine, bh, true, "id" + i);
    }
}

function clear() {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
}

svg = document.getElementById('svgGrafic');

Promise.all(
    urlPIB.map(getPIB)
).then((data1) => {
    Promise.all(urlSV.map(getSV)).then((data2 => {
        Promise.all(urlPOP.map(getPOP)).then((data3) => {
            let listaCompleta = [];
            let index = 0;

            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "PIB", "valoare": lista_PIB[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "SV", "valoare": lista_SV[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "POP", "valoare": lista_POP[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }

            var select = document.getElementById("tari");
            var option = select.options[select.selectedIndex];
            select.onchange = function () {
                option = select.options[select.selectedIndex];
                lista_barchart = [];
                for (let j = 0; j < listaCompleta.length; j++) {
                    option = select.options[select.selectedIndex];
                    if (option.value == listaCompleta[j].tara) {

                        if (listaCompleta[j].indicator == "PIB") {

                            lista_barchart.push(listaCompleta[j].valoare);
                        }
                    }
                }

                clear();
                SetBarChart(lista_barchart);
                deseneazaAxele();
                deseneazaChart(lista_barchart);

            }
        })
    }))
})

/////////////////////TABEL
Promise.all(
    urlPIB.map(getPIB)
).then((data1) => {
    Promise.all(urlSV.map(getSV)).then((data2 => {
        Promise.all(urlPOP.map(getPOP)).then((data3) => {
            let listaCompleta = [];
            let index = 0;

            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "PIB", "valoare": lista_PIB[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "SV", "valoare": lista_SV[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "POP", "valoare": lista_POP[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }

            var select = document.getElementById("ani15");
            var option = select.options[select.selectedIndex];
            var lista_tabel1 = [];
            select.onchange = function () {
                option = select.options[select.selectedIndex];
                lista_tabel1 = [];
                lista_tabel2 = [];
                lista_tabel3 = [];
                for (let j = 0; j < listaCompleta.length; j++) {
                    option = select.options[select.selectedIndex];
                    if (option.value == listaCompleta[j].an) {

                        if (listaCompleta[j].indicator == "PIB") {

                            lista_tabel1.push(listaCompleta[j].valoare);
                        }
                    }

                }
                for (let j = 0; j < listaCompleta.length; j++) {
                    option = select.options[select.selectedIndex];
                    if (option.value == listaCompleta[j].an) {

                        if (listaCompleta[j].indicator == "SV") {

                            lista_tabel2.push(listaCompleta[j].valoare);
                        }
                    }

                }
                for (let j = 0; j < listaCompleta.length; j++) {
                    option = select.options[select.selectedIndex];
                    if (option.value == listaCompleta[j].an) {

                        if (listaCompleta[j].indicator == "POP") {

                            lista_tabel3.push(listaCompleta[j].valoare);
                        }
                    }

                }

                var mediaPIB = 0;
                for (i = 0; i < lista_tabel1.length; i++) {
                    mediaPIB = lista_tabel1[i] + mediaPIB;
                }
                mediaPIB = mediaPIB / 27;

                for (i = 0; i < lista_tabel1.length; i++) {
                    var td = document.getElementById('idpib' + i);
                    td.textContent = lista_tabel1[i];
                    if (lista_tabel1[i] > mediaPIB) {
                        td.style.backgroundColor = "#ff6666";
                    }
                    else {
                        td.style.backgroundColor = "#5cd65c";
                    }
                }


                var mediaSV = 0;
                for (i = 0; i < lista_tabel2.length; i++) {
                    mediaSV = lista_tabel2[i] + mediaSV;
                }
                mediaSV = mediaSV / 27;
                for (i = 0; i < lista_tabel2.length; i++) {
                    var td = document.getElementById('idsv' + i);
                    td.textContent = lista_tabel2[i];
                    if (lista_tabel2[i] > mediaSV) {
                        td.style.backgroundColor = "#ff6666";
                    }
                    else {
                        td.style.backgroundColor = "#5cd65c";
                    }

                }

                var mediaPOP = 0;
                for (i = 0; i < lista_tabel3.length; i++) {
                    mediaPOP = lista_tabel3[i] + mediaPOP;
                }
                mediaPOP = mediaPOP / 27;
                for (i = 0; i < lista_tabel3.length; i++) {
                    var td = document.getElementById('idpop' + i);
                    td.textContent = lista_tabel3[i];
                    if (lista_tabel3[i] > mediaPOP) {
                        td.style.backgroundColor = "#ff6666";
                    }
                    else {
                        td.style.backgroundColor = '#5cd65c';
                    }
                }
            }
        })
    }))
})


/////////////////BUBBLE CHART
Promise.all(
    urlPIB.map(getPIB)
).then((data1) => {
    Promise.all(urlSV.map(getSV)).then((data2 => {
        Promise.all(urlPOP.map(getPOP)).then((data3) => {
            let listaCompleta = [];
            let index = 0;

            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "PIB", "valoare": lista_PIB[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "SV", "valoare": lista_SV[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            index = 0;
            for (let i = 0; i < lista_tari.length; i++) {
                for (let j = 0; j < lista_ani.length; j++) {
                    let tara = { "tara": lista_tari[i], "an": lista_ani[j], "indicator": "POP", "valoare": lista_POP[index] };
                    listaCompleta.push(tara);
                    index++;
                }
            }
            var lista_tabelBubblePIB = [];
            var lista_tabelBubbleSV = [];
            var lista_tabelBubblePOP = [];
            var select = document.getElementById("aniBubble");
            var option = select.options[select.selectedIndex];

            select.onchange = function () {
                option = select.options[select.selectedIndex];
                for (let j = 0; j < listaCompleta.length; j++) {
                    option = select.options[select.selectedIndex];
                    if (option.value == listaCompleta[j].an) {

                        if (listaCompleta[j].indicator == "PIB") {

                            lista_tabelBubblePIB.push(listaCompleta[j].valoare);
                        }
                        if (listaCompleta[j].indicator == "SV") {

                            lista_tabelBubbleSV.push(listaCompleta[j].valoare);
                        }
                        if (listaCompleta[j].indicator == "POP") {

                            lista_tabelBubblePOP.push(listaCompleta[j].valoare);
                        }
                    }
                }


                bubble = [];
                for (var i = 0; i < lista_tari.length; i++) {
                    var datebubble = [];
                    var lspib = lista_tabelBubblePIB[i];
                    var lssv = lista_tabelBubbleSV[i];
                    var lspop = lista_tabelBubblePOP[i];
                    var nrtara = i;
                    datebubble.push({ x: lspib, y: lssv, size: lspop, nrtara: nrtara, })
                    bubble[i] = datebubble;
                }

                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                var colors = ["red", "green", "blue", "yellow", "orange", "indigo", "purple", "pink", "cyan", "crimson", "darkblue", "black", "blueviolet", "coral", "chocolate", "cornsilk", "darkgreen", "darkgray", "forestgreen", "darksalmon", "darkmagenta", "darkolivegreen", "firebrick", "fuchsia", "greenyellow", "hotpink", "indianred"];
                var t = 0;

                function deseneazaBubble() {
                    ctx.fillStyle = "aliceblue";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "black";

                    for (t = 0; t < 27; t++) {
                        bubble[t].forEach(function (d) {
                            ctx.save();
                            ctx.fillStyle = colors[d.nrtara % colors.length];
                            ctx.globalAlpha = 0.5;
                            ctx.beginPath();
                            ctx.arc(d.x / 100, canvas.height - d.y * 3, d.size / 1000000, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();
                        });
                    }
                }
                deseneazaBubble();

            }



        })
    }))
})