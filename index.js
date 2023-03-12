document.addEventListener("DOMContentLoaded", () => {
    let userName = 'Admin';
    let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Ipsam voluptatem aut vero velit iste neque est culpa a placeat, 
    omnis numquam nemo quidem aspernatur beatae facilis nulla ullam eaque repellat.`;
    let date = '';
    
    createComment(userName, text, date);
})


let button = document.getElementById('set');

button.addEventListener('click', () => {
    setOverlay();

    let form = document.querySelector('.form');
    form.classList.add('visible');
})


let close = document.getElementById('close');

close.addEventListener('click', () => {
    removeOverlay();

    let form = document.querySelector('.form');
    form.classList.remove('visible');
})

function setOverlay() {
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.querySelector('body').append(overlay);
}

function removeOverlay() {
    let overlay = document.querySelector('.overlay');
    document.querySelector('body').removeChild(overlay);
}


let form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let userName = document.getElementById('userName').value;
    let text = document.getElementById('text').value;
    let date = document.getElementById('date').value;

    createComment(userName, text, date);

    form.classList.remove('visible');
    clearForm(form);

    removeOverlay();
})


let userName = document.getElementById('userName');

userName.addEventListener('blur', (event) => {
    if (userName.value.length < 3) {
        setMistake(event);
    }
})

userName.addEventListener('focus', (event) => {
    removeMistake(event);
})


let text = document.getElementById('text');

text.addEventListener('blur', (event) => {
    if (text.value.length < 5) {
        setMistake(event);
    }
})

text.addEventListener('focus', (event) => {
    removeMistake(event);
})

let date = document.getElementById('date');

date.addEventListener('change', (event) => {  
    let selectedDate = date.valueAsDate;
    let selectedYear = selectedDate.getFullYear();
    let selectedMonth = selectedDate.getMonth();
    let selectedDay = selectedDate.getDate();

    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth();
    let nowDay = now.getDate();

    let flag = selectedYear == nowYear && selectedMonth >= nowMonth && selectedDay > nowDay;

    if (selectedYear > nowYear || flag) {
        setMistake(event);
        form.querySelector('.button').disabled = true;
        setTimeout(clearDate, 2000, event);
    } 
})


function clearDate(date) {
    date.target.value = '';
    removeMistake(date);
    form.querySelector('.button').disabled = false;
}


function setMistake(item) {
    let parent = item.target.parentElement
    let mistake = parent.querySelector('.mistake')
    mistake.style.opacity = '1'
}

function removeMistake(item) {
    let parent = item.target.parentElement
    let mistake = parent.querySelector('.mistake')
    mistake.style.opacity = '0'
}


function clearForm(form) {
    const { elements } = form
    const data = Array.from(elements)
    .filter((item) => !!item.name)
    .forEach(element => {
      element.value = ''
    })
}


function createComment(userName, text, date) {
    let section = document.querySelector('.comments');

    let comment = document.createElement('div');
    comment.classList.add('comment');

    let commentHeader = document.createElement('div');
    commentHeader.classList.add('comment-header');

    let about = document.createElement('div');
    about.classList.add('about');

    let aboutUser = document.createElement('p');
    aboutUser.classList.add('about-user');
    aboutUser.textContent = userName;

    let aboutDate = document.createElement('p');
    aboutDate.classList.add('about-date');

    let day = document.createElement('span');
    day.classList.add('day');


    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth();
    let nowDay = now.getDate();
    
    let selectedYear = date == ''? nowYear : +date.slice(0, 4);
    let selectedMonth = date == ''? nowMonth : +date.slice(5, 7)-1;
    let selectedDay = date == ''? nowDay : +date.slice(8);

    let today = selectedYear == nowYear && selectedMonth == nowMonth && selectedDay == nowDay;
    let yesterday = selectedYear == nowYear && selectedMonth == nowMonth && selectedDay == nowDay - 1;
    
    if (today) {
        day.textContent = 'сегодня'
    } else if (yesterday) {
        day.textContent = 'вчера'
    } else {
        day.textContent = date;
    }
    

    let time = document.createElement('span');
    time.classList.add('time');
    
    let hour = setFormat(now.getHours());
    let minuts = setFormat(now.getMinutes());

    function setFormat(elem) {
        if (elem < 10) {
          elem = '0' + elem;
        }
        return elem;
    }

    time.textContent = `${hour}:${minuts}`;

    aboutDate.append(day);
    aboutDate.append(', ');
    aboutDate.append(time);


    about.append(aboutUser);
    about.append(aboutDate);


    let buttons = document.createElement('div');
    buttons.classList.add('user-buttons')

    let like = document.createElement('div');
    like.classList.add('like');
    like.dataset.like = 'no';

    like.addEventListener('click', () => {
        if (like.dataset.like == 'no') {
            like.dataset.like = 'yes';
            like.style.backgroundImage = 'url(icons/like-clicked.svg)';
        } else {
            like.dataset.like = 'no';
            like.style.backgroundImage = 'url(icons/like.svg)';
        }
    })


    let del = document.createElement('img');
    del.src = "icons/delete.svg";
    del.classList.add('delete');

    del.addEventListener('click', (event) => {
        let parent = event.target.parentElement.parentElement.parentElement;
        parent.remove();
    })


    buttons.append(like);
    buttons.append(del);

    commentHeader.append(about);
    commentHeader.append(buttons);

    let main = document.createElement('div');
    main.classList.add('comment-main');

    let p = document.createElement('p');
    p.textContent = text;

    main.append(p);

    comment.append(commentHeader);
    comment.append(main);

    section.insertAdjacentElement('afterbegin', comment)
}