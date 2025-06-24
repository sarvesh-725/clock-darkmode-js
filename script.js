const themetoggle = document.getElementById('theme-change');
const formattoggle = document.getElementById('time-format');

const body = document.body;
const savedTh = localStorage.getItem('theme');

let clockInterval = null;

if (savedTh === 'dark') {
    body.classList.add('no-transition');

    body.classList.add('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themetoggle.innerText = isDark ? 'Light Mode' : 'Dark Mode';

    setTimeout(() => {
        body.classList.remove('no-transition');
    }, 50);
}


function update12hrClock() {
    const currTime = new Date();
    let hr = currTime.getHours();

    let min = String(currTime.getMinutes()).padStart(2, '0');
    let sec = String(currTime.getSeconds()).padStart(2, '0');

    const ampm = hr >= 12 ? "PM" : "AM";
    hr = hr % 12;
    hr = hr == 0 ? 12 : hr;

    hr = String(hr).padStart(2, '0');
    const clk = document.getElementById('12hr');
    clk.innerText = `${hr}:${min}:${sec} ${ampm}`;
}

function update24hrClock() {
    const currTime = new Date();
    const hr = String(currTime.getHours()).padStart(2, '0');
    let min = String(currTime.getMinutes()).padStart(2, '0');
    let sec = String(currTime.getSeconds()).padStart(2, '0');
    const clk = document.getElementById('24hr');
    clk.innerText = `${hr}:${min}:${sec}`;

}

function show12() {
    document.getElementById('12hr').hidden = false;
    document.getElementById('24hr').hidden = true;

    clearInterval(clockInterval);
    update12hrClock();
    clockInterval = setInterval(update12hrClock, 1000);
}
function show24() {
    document.getElementById('24hr').hidden = false;
    document.getElementById('12hr').hidden = true;

    clearInterval(clockInterval);
    update24hrClock();
    clockInterval = setInterval(update24hrClock, 1000);
}

formattoggle.addEventListener('click', () => {
    const isformat24hr = document.getElementById('12hr').hidden;

    if (isformat24hr) {
        show12();
        formattoggle.innerText = '24 hour Format';
        localStorage.setItem('format', '12');
    } else {
        show24();
        formattoggle.innerText = '12 hour Format';
        localStorage.setItem('format', '24');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') formattoggle.click();
    if (e.key === 'ArrowRight') formattoggle.click();
});

function togglethemefn() {
    body.classList.add('no-transition');

    body.classList.toggle('dark-mode');

    const isDark = body.classList.contains('dark-mode');
    themetoggle.innerText = isDark ? 'Light Mode' : 'Dark Mode';

    setTimeout(() => {
        body.classList.remove('no-transition');
    }, 50);

    localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
themetoggle.addEventListener('click', () => {
    togglethemefn();
});


document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'd') { togglethemefn(); }
})


show24();

//stopwatch logic
function stopwatchlogic() {
    let h = 0, m = 0, s = 0, ms = 0;
    let watchInterval = null;
    let blinkInterval = null;
    let stopwatchRunning = false;
    const clockwatch = document.getElementById('clockwatch');


    function showWatch() {
        clockwatch.classList.remove('blink');

        h = String(h).padStart(2, '0');
        m = String(m).padStart(2, '0');
        s = String(s).padStart(2, '0');
        ms = String(ms).padStart(2, '0');

        document.getElementById('stopwatch-time').innerText = `${h}:${m}:${s}`;
        document.getElementById('millisec').innerText = `${ms}`;
    }

    let startstop = document.getElementById('stop-resume');
    let reset = document.getElementById('reset');

    function startWatch() {
        clearInterval(blinkInterval);
        watchInterval = setInterval(function () {
            if (ms > 99) {
                ms = 0;
                s++;
            }
            if (s > 59) {
                s = 0;
                m++;
            }
            if (m > 59) {
                m = 0;
                h++;
            }
            ms++;
            showWatch();
        }, 10);
        startstop.innerText = 'Stop';
        stopwatchRunning = true;
    }

    function blinkWatch() {
        blinkInterval = setInterval(() => {
            clockwatch.classList.toggle('blink');
            
        }, 500);

    }
    function stopWatch() {
        clearInterval(watchInterval);
        blinkWatch();
        startstop.innerText = 'Resume';
        stopwatchRunning = false;
    }

    function resetWatch() {
        clearInterval(blinkInterval);
        clearInterval(watchInterval);

        h = 0; m = 0; s = 0; ms = 0;
        showWatch();
        startstop.innerText = 'Start';
        stopwatchRunning = false;

    }

    startstop.addEventListener('click', () => {
        if (stopwatchRunning == false) {
            startWatch();
        }
        else stopWatch();
    });
    reset.addEventListener('click', () => {
        resetWatch();
    });

    document.addEventListener('keypress',(e) => {
        if(e.key.toLowerCase() === 's') startstop.click();
    });
    document.addEventListener('keypress',(e) => {
        if(e.key.toLowerCase() === 'r') reset.click();
    });

}



stopwatchlogic();