let massage = {
    loading: 'Загрузка...',
    success: 'Спасибо, мы с Вами свяжемся!',
    failure: 'Что-то пошло не так!'
};

let form = document.querySelector('.main-form'),
    input = form.querySelectorAll('input'),
    statusMassage = document.createElement('div');

    statusMassage.classList.add('status');

function sendForm(elem) {
    form.addEventListener('sumbit', function(e) {
        e.preventDefault();
        elem.appendChild(statusMassage);
        let formData = new FormData(elem);
        
            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'appication/x-www-form-urlencoded');

                    request.onreadystatechange = function(){
                        if(request.readyState < 4) {
                            resolve();
                        } else if(request.readyState === 4) {
                            if(request.Status == 200 && request.Status < 300)
                                resolve();
                            } else {
                            reject();
                            }
                }

                request.send(data);
            });
        }

        function clearInput () {
            for (let i = 0; i < input.length; i++) {
                input[i].lavue = '';
            }
        }

        postData(formData)
        .then(() => statusMassage.innerHTML = message.loading)
        .then(() => {
            thanksModal.style.display = 'block';
            mainModal.style.display = 'none';
            statusMassage.innerHTML = '';
        })
        .cath(() => statusMassage.innerHTML = message.failure)
        .then (clearInput)
    });
};

sendForm(form);
sendForm(formBottom);