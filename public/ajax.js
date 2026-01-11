function searchDep(str) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonObj = JSON.parse(this.responseText);
            let tablebody = document.getElementById("tb");
            tablebody.innerHTML = "";

            if (jsonObj.length === 0) {
                let row = document.createElement("tr");
                let col = document.createElement("td");
                col.colSpan = 7;

                col.textContent = "No matching products found.";
                row.appendChild(col);
                tablebody.appendChild(row);
                return;
            }

            jsonObj.forEach((element, index) => {
                let row = document.createElement("tr");

                let col = document.createElement("td");
                col.textContent = index + 1;
                row.appendChild(col);

                col = document.createElement("td");
                col.textContent = element.name;
                row.appendChild(col);

                col = document.createElement("td");
                col.textContent = element.category;
                row.appendChild(col);

                col = document.createElement("td");
                col.textContent = element.price;
                row.appendChild(col);

                col = document.createElement("td");
                col.textContent = element.quantity;
                row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = "<a href='/delpro?id=" + element.id + "'>🗑️</a>";
                row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = "<a href='/upprod?name=" + encodeURIComponent(element.name) + "&id=" + element.id + "'>✏️</a>";
                row.appendChild(col);

                tablebody.appendChild(row);
            });
        }
    };

    // Send str as both name and category
    xhttp.open("get", "/searchProduct?name=" + encodeURIComponent(str) + "&category=" + encodeURIComponent(str), true);
    xhttp.send();
}
