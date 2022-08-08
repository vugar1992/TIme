class Stopwatch extends General{
    constructor(start, pause, reset, stopwatch) {
        super();
        this.start = document.getElementById(start);
        this.pause = document.getElementById(pause);
        this.reset = document.getElementById(reset);
        this.stopwatchHTML = document.querySelector(stopwatch);
        this.count = 0;
        this.timeOut = null;

        this.listener();
    }

    startTime() {

        this.count += 10;
        let date = new Date(this.count);
        this.stopwatchHTML.innerHTML =
        `${this.zeroPlus(date.getUTCHours())}:${this.zeroPlus(date.getUTCMinutes())}:${this.zeroPlus(date.getUTCSeconds())}<span>.${this.zeroPlus(Math.floor(date.getUTCMilliseconds() / 10))}</span>` 

        this.timeOut = setTimeout(() => {
            this.startTime();
        }, 10)

    }
    
    displayVisible(start, pause) {
        this.start.style.display = start;
        this.pause.style.display = pause;
    }

    listener() {


        this.start.addEventListener('click', () => {
            clearTimeout(this.timeOut);
            this.startTime();
            this.displayVisible('none', 'inline')
        })

        this.pause.addEventListener('click', () => {
            clearTimeout(this.timeOut);
            this.displayVisible('inline', 'none')
        })

        this.reset.addEventListener('click', () => {
            this.count = 0;
            this.stopwatchHTML.innerHTML = `00:00:00<span>.00</span>`;
        })

    }

}

const stopwatch = new Stopwatch('start', 'pause', 'reset', '.stopwatch');