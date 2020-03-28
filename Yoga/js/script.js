window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer

    let deadline = '2020-03-30';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'seconds' : seconds,
            'minutes' : minutes,
            'hours' : hours
        }
    }

        function setClock (id, endtime) {
            let timer = document.getElementById(id),
            seconds = timer.querySelector('.seconds'),
            minutes = timer.querySelector('.minutes'),
            hours = timer.querySelector('.hours'),
            timeInterval = setInterval(updateClock, 1000);

            function updateClock () {
                let t = getTimeRemaining(endtime);

                function addZero(num) {
                    if (num <= 9) {
                        return '0' + num;
                    } else return num;
                };

                hours.textContent = addZero(t.hours),
                minutes.textContent = addZero(t.minutes),
                seconds.textContent = addZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    hours.textContent = '00',
                    minutes.textContent = '00',
                    seconds.textContent = '00';
                }
            }
        }

    setClock('timer', deadline);

    // modal



    let overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');
    function showModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
        overlay.style.display = 'none';
        descriptionBtn.forEach(item => item.classList.remove('more-splash'));
        document.body.style.overflow = '';
    }

    descriptionBtn.forEach(item => item.addEventListener('click', showModal));
    close.addEventListener('click', hideModal);


    // Form

    let massage = {
        loading: 'Загрузка...',
        success: 'Спасибо, мы с Вами свяжемся!',
        failure: 'Что-то пошло не так!'
    };
    
    let form = document.querySelector('.main-form'),
        input = form.querySelectorAll('input'),
        statusMassage = document.createElement('div');
    
        statusMassage.classList.add('status');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMassage);
    
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'appication/x-www-form-urlencoded');
    
        let formData = new FormData(form);
        
        request.send(formData);
    
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.readyStatus == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMassage.innerHTML = massage.failure;
            }
        });
    
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        };
    });



    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides (n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    };

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }
    function currentSlides (n) {
         showSlides(slideIndex = n);
    }

    next.addEventListener('click', () => {
        plusSlides(1);
    })

    prev.addEventListener('click', () => {
        plusSlides(-1);
    })

    dotsWrap.addEventListener('click', (event) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlides(i);
            }
        }
    })


    // calc 

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('input', function () {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }

        });

        restDays.addEventListener('input', function () {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function () {
            if(persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });

});