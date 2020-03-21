    let age = document.getElementById('age');

    function showUser (surname, name) {
        alert("Пользователь " + surname + " " + name + ", его возраст " + age.value);
    };

    showUser.apply(age, ['Проценко', 'Влад']);

    showUser();
