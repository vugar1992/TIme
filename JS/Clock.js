class Clock extends General {
    constructor(hours, today) {
        super();
        this.hours = document.querySelector(hours);
        this.today = document.querySelector(today);

        this.render();
    }

    actualTime() {

        setInterval(() => {
            this.hours.textContent =
            this.zeroPlus(new Date().getHours()) + ':' + this.zeroPlus(new Date().getMinutes()) +
             ':' + this.zeroPlus(new Date().getSeconds());
        }, 1000);
    }

    render() {
        
        let day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 
            'Сентября', 'Октября', 'Ноября', 'Декабря'];

        this.hours.textContent =
        this.zeroPlus(new Date().getHours()) + ':' + this.zeroPlus(new Date().getMinutes()) + 
        ':' + this.zeroPlus(new Date().getSeconds());

        let a = new Date();

        this.today.textContent = `${day[a.getDay()]} - ${this.zeroPlus(a.getDate())} 
        ${month[a.getMonth()]} ${a.getFullYear()}`;

        this.actualTime()
    }

}

const clock = new Clock('.hours span', '.today');