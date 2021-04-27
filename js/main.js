// Появление блоков - анимация
AOS.init();

// Speedometr

document.addEventListener("DOMContentLoaded", () => {
    const counter_arrow = document.querySelector('.header-main__counter-arrow');
    const counter_num = document.querySelector('.header-main__counter-number');
    let number = parseInt(counter_num.textContent);
    // let arrow_angle = parseInt(counter_arrow.style.transform);

    setTimeout(() => {
        let timer = setInterval(() => {
            if (number <= 890) {
                number += 10;
                counter_num.textContent = number;
                counter_arrow.style.transform = `rotateZ(120deg)`;
            }
        }, 50);
    }, 200);
});

// Ответы и вопросы

const qna = document.getElementById('qna');

qna.addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("qna__toggleBtn")) {
        target.nextElementSibling.classList.toggle('qna__content-active');
        target.classList.toggle('qna__toggleBtn-active');
    } else return;
});

// Плавная прокрутка

$("a.scrollTo").on("click", function (e) {
    e.preventDefault();
    var anchor = $(this).attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 60
    }, 0);
});

// Слайдер с отзывами 
$('.feedbacks__items').slick({
    dots: true,
    // infinite: false,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

// Форма

const inputs = document.getElementsByTagName('input');
for(let input of inputs){ 
    input.addEventListener('focus', ()=>{
        input.nextElementSibling.style.top = "12px";
        input.nextElementSibling.style.fontSize = "12px";
    });
    input.addEventListener('blur', ()=>{
        if(input.nextElementSibling != null){
            if(input.value == ""){
              input.nextElementSibling.style.fontSize = "14px";
                input.nextElementSibling.style.top = "50%";
            }
        }
    });
}

// Шаги формы

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...

  let step = n + 1;
  document.querySelector('.form__steps').innerHTML = 'Шаг ' + step + ' из 4';
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Отправить";
  } else {
    document.getElementById("nextBtn").innerHTML = "Далее";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById('empty__fiyelds').style.display = "block";
    document.getElementById('empty__fiyelds').innerHTML = "Заявка успешно отправлена!";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = 'none';
    document.getElementById("form").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    document.getElementById('empty__fiyelds').style.display = "none";
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      document.getElementById('empty__fiyelds').style.display = "block";
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// Masks
// tab 1
var phoneMask = IMask(document.getElementById('phone'), {
  mask: `+{7}(000)000-00-00`,
});

// tab 2
var birthday = IMask(document.getElementById('birthday'), {
  mask: Date,
  min: new Date(1900, 0, 1),
  max: new Date(2021, 0, 1)
});
var serial = IMask(document.getElementById('serial'), {
  mask: `0000-000000`,
});
var release_date = IMask(document.getElementById('release_date'), {
  mask: Date,
  min: new Date(1900, 0, 1),
  max: new Date(2021, 0, 1)
});
var division_code = IMask(document.getElementById('division_code'), {
  mask: `000-000`,
});

// tab 3
var index = IMask(document.getElementById('index'), {
  mask: `000000`,
});

// tab 4
var sms = IMask(document.getElementById('sms'), {
  mask: `0000`,
});

// Запретить ввод цифр
function noDigits(event){
  if("`~!@#$%^&*()_+=-{}[]|,./?;:'1234567890".indexOf(event.key) != -1){
    event.preventDefault();
  }
}