    let age = document.getElementById('age');

    function showUser (surname, name) {
        alert("Пользователь " + surname + " " + name + ", его возраст " + age.value);
    };

    showUser.apply(age, ['Проценко', 'Влад']);

    showUser();


    class Options {
        constructor (height, width, bg, fontSize, textAlign, textColor) {
            this.height = height; 
            this.width = width;
            this.bg = bg; 
            this.fontSize = fontSize;
            this.textAlign = textAlign ;
            this.textColor = textColor;
        }
        createDiv() {
            let div = document.createElement('div');
            div.className = ('newDiv');
            div.innerHTML = ('Create new element "div" for DZ');
            document.body.appendChild(div);
            let cssStyle = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}; color:${this.textColor}`;
            div.style.cssText = cssStyle;
        }
    };
    const item = new Options (20, '100%', 'black', 16, 'center', '#fff');
    item.createDiv();