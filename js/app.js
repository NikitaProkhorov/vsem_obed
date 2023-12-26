let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

// let btn1 = document.getElementById("btn1");
// let btn2 = document.getElementById("btn2");
// let btn3 = document.getElementById("btn3");
// let btn4 = document.getElementById("btn4");
// let btn5 = document.getElementById("btn5");
// let btn6 = document.getElementById("btn6");

// btn1.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 1!");
// 		item = "1";
// 		tg.MainButton.show();
// 	}
// });

// btn2.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 2!");
// 		item = "2";
// 		tg.MainButton.show();
// 	}
// });

// btn3.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 3!");
// 		item = "3";
// 		tg.MainButton.show();
// 	}
// });

// btn4.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 4!");
// 		item = "4";
// 		tg.MainButton.show();
// 	}
// });

// btn5.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 5!");
// 		item = "5";
// 		tg.MainButton.show();
// 	}
// });

// btn6.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 6!");
// 		item = "6";
// 		tg.MainButton.show();
// 	}
// });


function grab(g) {
    document.onmousemove = function(e) {
        g.scrollLeft -= e.movementX;
        return false;
    };

    document.onmouseleave = document.onmouseup = function() {
        document.onmousemove = null;
    };
}






// export function createPriceButton(price) {
//     const priceButton = document.createElement('button');
//     priceButton.classList.add('btn');
//     priceButton.textContent = price;

//     priceButton.addEventListener('click', function() {
//         const existingCounter = this.querySelector('.counter');
//         if (existingCounter) return;

//         const counter = document.createElement('div');
//         counter.classList.add('counter');

//         const decreaseButton = document.createElement('button');
//         decreaseButton.textContent = '-';
//         decreaseButton.addEventListener('click', function() {
//             const currentCount = parseInt(counter.textContent);
//             if (currentCount > 1) {
//                 counter.textContent = currentCount - 1;
//             }
//         });

//         const increaseButton = document.createElement('button');
//         increaseButton.textContent = '+';
//         increaseButton.addEventListener('click', function() {
//             const currentCount = parseInt(counter.textContent);
//             counter.textContent = currentCount + 1;
//         });

//         counter.textContent = '1';

//         this.appendChild(decreaseButton);
//         this.appendChild(counter);
//         this.appendChild(increaseButton);
//     });

//     return priceButton;
// }
























Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});


let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);



