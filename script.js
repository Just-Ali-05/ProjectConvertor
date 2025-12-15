const valyutalar = document.querySelectorAll(".valyuta");
const valbox1 = document.querySelector(".valbox1");
const valbox2 = document.querySelector(".valbox2");
const convert1 = document.querySelector(".convert1");
const convert2 = document.querySelector(".convert2");
const input1 = document.querySelector(".v1 input");
const input2 = document.querySelector(".v2 input");

let fromCurrency = valbox1.querySelector(".purple").textContent;
let toCurrency = valbox2.querySelector(".purple").textContent;

const key = "9f538120a44b10b9a21543d29b03af56";

const rates = (from, to) => {
    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=1&access_key=${key}`)
        .then(res => res.json())
        .then(data => {
            convert1.textContent = `1 ${from} = ${data.result.toFixed(4)} ${to}`;
            convert2.textContent = `1 ${to} = ${(1 / data.result).toFixed(4)} ${from}`;
        });
}

const convert1to2 = () => {
    const amount = input1.value;
    if (!amount) {
        input2.value = "";
        return;
    }
    fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&access_key=${key}`)
        .then(res => res.json())
        .then(data => {
            input2.value = Number(data.result.toFixed(4));
        });
}

const convert2to1 = () => {
    const amount = input2.value;
    if (!amount) {
        input1.value = "";
        return;
    }
    fetch(`https://api.exchangerate.host/convert?from=${toCurrency}&to=${fromCurrency}&amount=${amount}&access_key=${key}`)
        .then(res => res.json())
        .then(data => {
            input1.value = Number(data.result.toFixed(4));
        });
}

valyutalar.forEach(item => {
    item.addEventListener("click", () => {
        const parent = item.parentElement;
        parent.querySelectorAll(".valyuta").forEach(i => {
            i.classList.remove("purple");
            i.classList.add("white");
        });
        item.classList.remove("white");
        item.classList.add("purple");

        fromCurrency = valbox1.querySelector(".purple").textContent;
        toCurrency = valbox2.querySelector(".purple").textContent;

        rates(fromCurrency, toCurrency);
        convert1to2();
    });
});

input1.addEventListener("input", convert1to2);
input2.addEventListener("input", convert2to1);

rates(fromCurrency, toCurrency);