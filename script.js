const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerHTML
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

window.addEventListener("load", (event) => {
  fetch("https://eshop-deve.herokuapp.com/api/v2/orders", {
    method: "GET",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let ordersArr = [];
      data.orders.forEach((ordersObj, index) => {
        ordersObj.items.forEach((itemsObj, index) => {
          let itemsUnit = {
            sku: itemsObj.sku,
            name: itemsObj.name,
            quantity: itemsObj.quantity,
            price: itemsObj.price,
          };
          ordersArr.push(itemsUnit);
        });
      });
      let tableRowHTML = "";
      ordersArr.forEach((obj) => {
        tableRowHTML += `<tr> <td>${obj.sku}</td> <td>${obj.name}</td> <td>${obj.quantity}</td> <td>${obj.price}</td> </tr>`;
      });

      document.getElementById("tableBody").innerHTML = tableRowHTML;
    });
});

const addData = () => {
    let skuData = document.getElementById("sku").value;
    let nameData = document.getElementById("name").value;
    let quantityData = document.getElementById("quantity").value;
    let priceData = document.getElementById("price").value;
    let isError = false;
    let errorFieldId = null;

    let elems = document.getElementsByClassName('input-field');
    [].forEach.call(elems, function(el) {
        el.classList.remove("error-field");
    });

    if (!priceData) {
        errorFieldId = 'price';
        isError = true;
    }

    if (!quantityData) {
        errorFieldId = 'quantity';
        isError = true;
    }

    if (!nameData) {
        errorFieldId = 'name';
        isError = true;
    }

    if (!skuData) {
        errorFieldId = 'sku';
        isError = true;
    }

    if (isError) {
        document.getElementById(errorFieldId).classList.add("error-field");
        document.getElementById('errMsg').style.display = "block";
        return;
    }

    let newData = document.getElementById('tableBody').innerHTML;

    console.log(document.getElementById('tableBody').innerHTML, 'OLD ---');
    newData+= `<tr><td>${skuData}</td> <td>${nameData}</td> <td>${quantityData}</td> <td>${priceData}`;

    document.getElementById('tableBody').innerHTML  = newData;
    return false;
};
