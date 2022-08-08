class General {
    constructor() {
        
    }

    zeroPlus(data) {
        return data < 10 
        ? '0' + data
        : data;
    }
    
}

class Select
{
    constructor(head, value)
    {
        this.head = document.querySelectorAll(head);
        this.value = document.querySelectorAll(value);

        this.listener();
    }


    listener()
    {
        this.head.forEach(item =>
        {
            item.addEventListener('click', this.openHandler);
        });

        document.body.addEventListener('click', (e) => 
        {
            if(!e.target.classList.contains('head'))
            {
                this.head.forEach(item => item.parentElement.classList.remove('open'));
            } 
        });

        this.value.forEach(item =>
        {
            item.addEventListener('click', this.chooseValue);
        });
    }

    openHandler(e)
    {
        e.stopPropagation();
        this.parentElement.classList.toggle('open');
    }

    chooseValue()
    {
        let text = this.textContent,
            select = this.closest('.select'),
            span = this.closest('.select').querySelector('.head span');
        
        span.textContent = text;
        select.classList.toggle('open');
    }
}

const select = new Select('.head', '.body div')