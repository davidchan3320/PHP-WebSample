function ShowAsformat(i, data) {
    //target node
    var showDiv = document.getElementById("show");
    
    //create elements
    var cardDiv = document.createElement("div");
    var cardHeader = document.createElement("div");
    var h5 = document.createElement("h5");
    var recipeName = document.createElement("div");
    // var artistName = document.createElement("div");
    var showBtn = document.createElement("button");
    var contentDiv = document.createElement("div");
    var cardBody = document.createElement("div");
    var rowDiv = document.createElement("div");
    var listDiv = document.createElement("div");
    var list = document.createElement("ul");
    var item = document.createElement("li");
    var itemName = document.createTextNode("HI");
    var item1  = document.createElement("li");
    var itemName1 = document.createTextNode("DAvid");
    var foodImgDiv = document.createElement("div");
    var foodImg = document.createElement("img");

    //set elements
    cardDiv.classList.add("card");
    cardHeader.classList.add("card-header");
    cardHeader.id = "h" + i;
    h5.classList.add("mb-0");
    h5.classList.add("row");
    recipeName.classList.add("col-sm-10");
    showBtn.innerHTML = "show"
    showBtn.classList.add("btn");
    showBtn.classList.add("btn-primary");
    showBtn.classList.add("col-sm-2");
    showBtn.setAttribute("type", "button");
    showBtn.setAttribute("data-toggle", "collapse");
    showBtn.setAttribute("data-target", "#c" + i);
    showBtn.setAttribute("aria-expanded", true);
    showBtn.setAttribute("aria-controls", "c" + i);
    contentDiv.id = "c" + i;
    contentDiv.classList.add("collapse");
    contentDiv.setAttribute("aria-labelledby", "h"+i);
    contentDiv.setAttribute("data-parent", "#show");
    cardBody.classList.add("card-body");
    rowDiv.classList.add("row");
    listDiv.classList.add("col-sm-8");
    // colDiv.classList.add("map");
    list.classList.add("list-group");
    list.classList.add("list-group-horizontal");
    item.classList.add("list-group-item");
    item1.classList.add("list-group-item");
    foodImgDiv.classList.add("col-sm-4");
    // foodImgDiv.classList.add("map");
    foodImg.src = "https://spoonacular.com/recipeImages/664288-556x370.jpg"
    foodImg.width = 280;
    foodImg.height = 200;

    //show elements on target node
    showDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(contentDiv);
    cardHeader.appendChild(h5);
    h5.appendChild(recipeName);
    h5.appendChild(showBtn);
    foodImgDiv.appendChild(foodImg);
    contentDiv.appendChild(cardBody);
    cardBody.appendChild(rowDiv);
    item.appendChild(itemName);
    item1.appendChild(itemName1);
    list.appendChild(item);
    list.appendChild(item1);
    listDiv.appendChild(list);
    rowDiv.appendChild(listDiv);
    rowDiv.appendChild(foodImgDiv);

    // var str = '<div class="card">' +
    //     '<div class="card-header" id="h' + i + '">' +
    //     '<h5 class="mb-0 row">' +
    //     '<div class="col-sm-6">' +
    //     data.institution_eng +
    //     '</div>' +
    //     '<div class="col-sm-4" style="border-left: 1px solid rgb(0, 0, 0);">' +
    //     data.cluster_eng +
    //     '</div>' +
    //     '<button class="btn btn-primary col-sm-2" type="button" data-toggle="collapse" data-target="#c' + i + '" aria-expanded="true" aria-controls="c' + i + '">' +
    //     'show' +
    //     '</button>' +
    //     '</h5>' +
    //     '</div>' +
    //     '<div id="c' + i + '" class="collapse" aria-labelledby="h' + i + '" data-parent="#show">' +
    //     '<div class="card-body">' +
    //     '<div class="row">' +
    //     '<div class="col-sm">' +
    //     '<ul class="list-group list-group-horizontal">' +
    //     '<li class="list-group-item">Address</li>' +
    //     '<li class="list-group-item">' +
    //     data.address_eng +
    //     '</li>' +
    //     '</ul>' +
    //     '</div>' +
    //     '<div class="col-sm map" id="map' + i + '" ondblclick="initMap(' + i + ',' + data.latitude + ',' + data.longitude + ')">' +
    //     'double click here to open map' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>';
    // return str;
}

ShowAsformat(0, null);