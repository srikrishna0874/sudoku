const N0 = 3;
const N = N0 * N0;
const N2 = N * N;
const random = Math.random;
var timer;
var timerCnt = 0;
var b = new ArrayBuffer(N2)
var a = new Uint8Array(b);
function setCell(x, y, val) {
    a[y * N + x] = val;
}
function getCell(x, y) {
    return a[y * N + x];
}
function clear(v) {
    if (v === undefined) v = 0;
    for (let i = 0; i < N2; i++)
        a[i] = v;
}
function removeNumFromArray(num, array) {
    let index = array.indexOf(num);
    if (index > -1)
        array.splice(index, 1);
}
function testCell(x, y) {
    var set = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < N; i++) {
        if (i != x) {
            removeNumFromArray(getCell(i, y), set);
        }
        if (i != y) {
            removeNumFromArray(getCell(x, i), set);
        }
    }
    let x0 = (x / N0 | 0) * N0; let x1 = x0 + 3;
    let y0 = (y / N0 | 0) * N0; let y1 = y0 + 3;
    for (let j = y0; j < y1; j++)
        for (let i = x0; i < x1; i++) {
            if (x == i && y == j)
                continue;
            removeNumFromArray(getCell(i, j), set);
        }
    return set;
}
function g() {
    var nt1 = 100;
    var nt2 = 5;
    var nt3 = 15;
    var nt4 = 5;
    var nb = [0, 0, 0, 0, 0];
    function checkRow(n, val) {
        let idx = n * N;
        for (let i = 0; i < N; i++) {
            if (a[idx] == val)
                return true;
            idx++;
        }
        return false;
    }
    function checkCol(n, val) { 
        let idx = n;
        for (let i = 0; i < N; i++) {
            if (a[idx] == val)
                return true;
            idx += N;
        }
        return false;
    }
    function checkTotal() {
        for (let i = 0; i < N2; i++) {
            if (a[i] == 0)
                return false;
        }
        return true;
    }
    function clearQuad(n) {
        let x = (n * N0) % N;
        let y = ((n / N0 | 0) * N0 * N) | 0;
        for (let j = 0; j < N0; j++)
            for (let i = 0; i < N0; i++) {
                let idx = y + j * N + x + i;
                a[idx] = 0;
            }
    }
    function swapCol(n) {
        let m = (N0 * ((n / N0) | 0)) + (n + 1) % N0;
        for (let i = 0; i < N; i++) {
            let t = getCell(n, i);
            setCell(n, i, getCell(m, i));
            setCell(m, i, t);
        }
    }
    function swapRow(n) {
        let m = (N0 * ((n / N0) | 0)) + (n + 1) % N0;
        for (let i = 0; i < N; i++) {
            let t = getCell(i, n);
            setCell(i, n, getCell(i, m));
            setCell(i, m, t);
        }
    }
    function swapRowCol(n, m) {
        let n1 = (N0 * ((n / N0) | 0)) + (n + 1) % N0;
        let m1 = (N0 * ((m / N0) | 0)) + (m + 1) % N0;
        for (let i = 0; i < N0; i++) {
            for (let j = 0; j < N; j++) {
                let t = getCell(i * N0 + n, j * N0 + m);
                setCell(i * N0 + n, j * N0 + m, getCell(i * N0 + n1, j * N0 + m1));
                setCell(i * N0 + n1, j * N0 + m1, t);
            }
        }
    }
    var nnn = nt2;
    function generateFull() {
        clear();
        for (let z = 0; z < N0; z++) {
            let p = [];
            for (let v = 1; v <= N; v++)  p.push(v);

            for (let y = 0; y < N0; y++)
                for (let x = 0; x < N0; x++) {
                    let len = p.length;
                    setCell(z * N0 + x, z * N0 + y, p.splice(random() * len | 0, 1));
                }
        }
        nnn = nt2;
        let OK = false;
        while (!OK) {
            if (--nnn == 0) {
                nb[0]++;
                return;
            }
            for (let t = 0; t < nt4; t++) {
                clearQuad(1);
                let p = [];
                for (let v = 1; v <= N; v++)  p.push(v);

                for (let y = 0; y < N0; y++)
                    for (let x = 0 + N0; x < N0 + N0; x++) {
                        for (let t1 = 0; t1 < nt1; t1++) {
                            let idx = random() * p.length | 0;
                            let v = p[idx];
                            if (checkCol(x, v) || checkRow(y, v)) continue;
                            setCell(x, y, p.splice(idx, 1));
                            OK = p.length == 0;
                            break;
                        }
                    }
                if (OK)
                    break;
            }
        }
        nnn = nt2;
        OK = false;
        while (!OK) {
            if (--nnn == 0) {
                nb[1]++;
                dump();
                return;
            }

            for (let t = 0; t < nt4; t++) {
                clearQuad(3);
                let p = [];
                for (let v = 1; v <= N; v++)  p.push(v);

                for (let y = 0 + N0; y < N0 + N0; y++)
                    for (let x = 0; x < N0; x++) {
                        for (let t1 = 0; t1 < nt1; t1++) {
                            let idx = random() * p.length | 0;
                            let v = p[idx];
                            if (checkCol(x, v) || checkRow(y, v)) continue;
                            setCell(x, y, p.splice(idx, 1));
                            OK = p.length == 0;
                            break;
                        }
                    }
                if (OK)
                    break;
            }
        }
        nnn = nt2;
        OK = false;
        while (!OK) {
            if (--nnn == 0) {
                nb[2]++;
                return;
            }
            for (let t = 0; t < nt3; t++) {
                let p = [];
                for (let v = 1; v <= N; v++)  p.push(v);
                clearQuad(5);
                for (let y = N0; y < N0 + N0; y++)
                    for (let x = N0 + N0; x < N0 + N0 + N0; x++) {
                        for (let t1 = 0; t1 < nt1; t1++) {
                            let idx = random() * p.length | 0;
                            let v = p[idx];
                            if (checkCol(x, v) || checkRow(y, v)) continue;
                            setCell(x, y, p.splice(idx, 1));
                            OK = p.length == 0;
                            break;
                        }
                    }
                if (OK)
                    break;
            }
        }
        nnn = nt2;
        OK = false;
        while (!OK) {
            if (--nnn == 0) {
                nb[3]++;
                return;
            }
            for (let t = 0; t < nt3; t++) {
                let p = [];
                for (let v = 1; v <= N; v++)  p.push(v);
                clearQuad(7);
                for (let y = N0 + N0; y < N0 + N0 + N0; y++)
                    for (let x = N0; x < N0 + N0; x++) {
                        for (let t1 = 0; t1 < nt1; t1++) {
                            let idx = random() * p.length | 0;
                            let v = p[idx];
                            if (checkCol(x, v) || checkRow(y, v)) continue;
                            setCell(x, y, p.splice(idx, 1));
                            OK = p.length == 0;
                            break;
                        }
                    }
                if (OK)
                    break;
            }
        }
        for (let v = 1; v <= N; v++) {
            for (let y = 0; y < N0; y++)
                for (let x = N0 + N0; x < N0 + N0 + N0; x++) {
                    if (checkCol(x, v) || checkRow(y, v)) continue;
                    setCell(x, y, v);
                }
        }
        for (let v = 1; v <= N; v++) {
            for (let y = N0 + N0; y < N0 + N0 + N0; y++)
                for (let x = 0; x < N0; x++) {
                    if (checkCol(x, v) || checkRow(y, v)) continue;
                    setCell(x, y, v);
                }
        }
    }
    function dump(msg) {
        if (msg) console.log(msg);
        for (let y = 0; y < N; y++) {
            let s = "";
            for (let x = 0; x < N; x++) {
                s += getCell(x, y);
                if (x % 3 == 2) s += " ";
            }
            console.log(y + ": " + s);
            if (y % 3 == 2) console.log(".");
        }
    }
    do {
        generateFull();
        nb[4]++;
    } while (!checkTotal());
}
function generateLevel1(nn) {
    if (nn === undefined) nn = 1000;
    for (let n = 0; n < nn; n++) {
        let x = random() * 9 | 0;
        let y = random() * 9 | 0;
        if (getCell(x, y) && testCell(x, y).length === 1)
            setCell(x, y, 0);
    }
    display(a);
}
function generate(n) {
    tm.classList.remove("tmfixed");
    clear();
    g();
    generateLevel1(n);
    display(a);
    if (!timer)
        timer = setInterval(onTimer, 100);
    timerCnt = 0;
}
function solved() {
    for (let x = 0; x < N; x++)
        for (let y = 0; y < N; y++) {
            let v = getCell(x, y);
            if (!v) {
                return false;
            }
            if (testCell(x, y).indexOf(v) === -1) {
                return false;
            }
        }
    return true;
}
function display(a) {
    let tbls = document.getElementsByClassName("innertable");
    for (let tn = 0; tn < N; tn++) {
        tds = tbls[tn].getElementsByTagName("td");
        for (let tdn = 0; tdn < N; tdn++) {
            let x = (tn % N0) * N0 + tdn % N0;
            let y = (tn / N0 | 0) * N0 + (tdn / N0 | 0);
            let v = getCell(x, y);
            tds[tdn].innerHTML = v ? v : ' ';
        }
    }
}
function onClickCell() {
    let x = this.id[4] | 0;
    let y = this.id[5] | 0;
    if (this.classList.contains("man")) {
        // console.log("has man");
        setCell(x, y, 0);
        this.classList.remove("man");
        this.classList.remove("wrong");
        display(a);
        return;
    }
    if (getCell(x, y))
        return;
    if (selectedN === 0) {
        if (selectedCell) {
            selectedCell.classList.remove("selected");
            if (selectedCell.id == this.id) {
                selectedCell = undefined;
                return;
            }
        }
        this.classList.add("selected");
        selectedCell = this;
        return;
    }
    let res = testCell(x, y);
    let found = res.indexOf(selectedN) !== -1;
    if (!found) {
        this.classList.add("wrong");
    }
    this.classList.add("man");
    setCell(x, y, selectedN);
    display(a);
    if (solved()) {
        clearInterval(timer);
        timer = undefined;
        tm.classList.add("tmfixed");
    }
}
function onMouseOver() {
    let x = this.id[4] | 0;
    let y = this.id[5] | 0;
}
function onMouseOut() {
    dbg.innerHTML = "";
}
function displayTime() {
    timerCnt++;
    let m = timerCnt / 600 | 0;
    let s10 = timerCnt % 600;
    let s = s10 / 10 | 0;
    s10 %= 10;
    tm.innerHTML = m + ":" + ('0' + s).substr(-2);                
}
function onTimer() {
    displayTime();
}
var selectedCell;
var selected;
var selectedN = 0;
function onClickSelect() {
    if (selectedCell) {
        let sel = this.id[3] | 0;
        let x = selectedCell.id[4] | 0;
        let y = selectedCell.id[5] | 0;
        let res = testCell(x, y);
        let found = res.indexOf(sel) !== -1;
        if (!found) {
            selectedCell.classList.add("wrong");
        }
        selectedCell.classList.add("man");
        setCell(x, y, sel);
        display(a);
        if (solved()) {
            clearInterval(timer);
            timer = undefined;
            tm.classList.add("tmfixed");
        }
        selectedCell.classList.remove("selected");
        selectedCell = undefined;
        return;
    }
    let next = (selected === undefined || this.id !== selected.id)
    if (selected) {
        selected.classList.remove("selected");
    }
    if (next) {
        selected = document.getElementById(this.id);
        selectedN = this.id[3] | 0;
        selected.classList.add("selected");
    }
    else {
        selected = undefined;
        selectedN = 0;
    }
}
function test() {
}

window.onload=function() {
    {
        let tbls=document.getElementsByClassName("innertable");
        for (let i= 0;i<N;i++) {
            nu=tbls[tn].getElementsByTagName("td");
            for (let tdn = 0; tdn < N; tdn++) {
                let x = (tn % N0) * N0 + tdn % N0;
                let y = (tn / N0 | 0) * N0 + (tdn / N0 | 0);
                nu[tdn].id = "cell" + x + y;
                nu[tdn].onclick = onClickCell;
                nu[tdn].onmouseover = onMouseOver;
                nu[tdn].onmouseout = onMouseOut;
            }
        }
    }
    {
        let tbls = document.getElementsByClassName("seltable");
        nu = tbls[0].getElementsByTagName("td");
        for (let i = 0; i < tds.length; i++) {
            nu[i].id = "sel" + (i + 1);
            nu[i].onclick = onClickSelect;
        }
    }
    g();
    generateLevel1();
    display(a);
    timerCnt = 0;
    timer = setInterval(onTimer, 100);
}
