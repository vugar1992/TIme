class Timer extends General
{
    constructor(hour, min, sec, start, pause, reset)
    {
        super();
        this.hour = document.getElementById(hour);
        this.min = document.getElementById(min);
        this.sec = document.getElementById(sec);
        this.start = document.getElementById(start);
        this.pause = document.getElementById(pause);
        this.reset = document.getElementById(reset);
        this.htmlHour = document.querySelector('.hour'),
        this.htmlMin = document.querySelector('.min'),
        this.htmlSec = document.querySelector('.sec');
        this.timers = 
        {
            milSec: 0,
            sec: 0,
            min: 0,
            hour: 0,
            hourValue: 0,
            minValue: 0,
            secValue: 0,
        }
        this.stoper = null;

        this.listener();
    }

    upRender(key1, key2, html1, html2)
    {
        if(this.timers[key1] > 59)
        {
            this.timers[key2]++;
            html2.textContent = this.zeroPlus(this.timers[key2]);
            this.timers[key1] = 0;
            html1.textContent = this.zeroPlus(this.timers[key1]);
        }
    }

    downRender(key1, key2, html1, html2)
    {
        if(this.timers[key2])
            {
                if(this.timers[key1] < 0)
                {
                    this.timers[key2]--;
                    html2.textContent = this.zeroPlus(this.timers[key2]);
                    this.timers[key1] = 59;
                    html1.textContent = this.zeroPlus(this.timers[key1]);
                }
            }

    }


    init()
    {
        this.timers.hourValue = parseInt(this.hour.textContent);
        this.timers.minValue = parseInt(this.min.textContent);
        this.timers.secValue = parseInt(this.sec.textContent);
        this.hour.textContent = 0;
        this.min.textContent = 0;
        this.sec.textContent = 0;
    }

    resetData()
    {
        this.timers.hourValue = 0;
        this.timers.milSec = 0;
        this.timers.secValue = 0;
        this.timers.hour = 0;
        this.timers.min = 0;
        this.timers.sec = 0;
        this.timers.milSec = 0;
    }

    buttonChange(start, pause)
    {
        this.start.style.display = start;
        this.pause.style.display = pause;
    }

    timer()
    {

        if(this.timers.hourValue === 0 & this.timers.minValue === 0 & 
            this.timers.secValue === 0)
        {
            this.init();
        }

        if(this.timers.hourValue || this.timers.minValue || 
            this.timers.secValue) this.timers.milSec++;
        
        if(this.timers.milSec > 99)
        {
            this.timers.sec++;
            this.htmlSec.textContent = this.zeroPlus(this.timers.sec);
            this.timers.milSec = 0;
        }

        this.upRender('sec', 'min', this.htmlSec, this.htmlMin);

        this.upRender('min', 'hour', this.htmlHour, this.htmlMin);

        if(this.timers.hour === this.timers.hourValue  && this.timers.min === this.timers.minValue 
            && this.timers.sec === this.timers.secValue) 
            {
                clearInterval(this.stoper);
                this.resetData();
                this.buttonChange('inline-block', 'none');
            }

    }

    reverseTimer()
    {

        if(this.timers.hourValue === 0 & this.timers.minValue === 0 & 
            this.timers.secValue === 0)
            {
                this.init();
                this.htmlHour.textContent = this.zeroPlus(this.timers.hourValue);
                this.htmlMin.textContent = this.zeroPlus(this.timers.minValue);
                this.htmlSec.textContent = this.zeroPlus(this.timers.secValue);
            }

        this.timers.milSec++;

        if(this.timers.milSec > 99)
        {
            this.timers.secValue--;
            this.htmlSec.textContent = this.zeroPlus(this.timers.secValue);
            this.timers.milSec = 0;
        }

        this.downRender('secValue', 'minValue', this.htmlSec, this.htmlMin)
        
        this.downRender('minValue', 'hourValue', this.htmlMin, this.htmlHour)


        if(this.timers.hourValue === 0 & this.timers.minValue === 0 & 
        this.timers.secValue === 0)
            {
                clearInterval(this.stoper);
                this.buttonChange('inline-block', 'none');
            }
    }


    listener()
    {
        let revers = document.getElementById('revers');
            

        this.start.addEventListener('click', () => {
            
            if(this.hour.textContent !== '0' || this.min.textContent !== '0' ||
                this.sec.textContent !== '0') 
                {
                    clearInterval(this.stoper);
                    if(revers.checked)
                    {
                        this.stoper = setInterval(() =>
                        {
                            this.reverseTimer();
                        }, 10)
                    } else {
                        this.stoper = setInterval(() =>
                        {
                            this.timer();
                        }, 10)
                    }
                    this.buttonChange('none', 'inline-block');
                }
        });

        this.reset.addEventListener('click', () => {
            this.resetData();
            this.htmlHour.textContent = '00';
            this.htmlMin.textContent = '00';
            this.htmlSec.textContent = '00';
            clearInterval(this.stoper);
            this.buttonChange('visible');
        })

        this.pause.addEventListener('click', () =>
        {
            clearInterval(this.stoper);
            this.buttonChange('inline-block', 'none');
        })

    }


}

const timer = new Timer('hour', 'min', 'sec', 'start', 'pause', 'restart');