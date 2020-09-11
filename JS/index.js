var current_page = 1;
var records_per_page = 20;
var total_result = 0;
var isSearch = 0;

window.onload = load();

function load() {
    // changePage(page);
    // inputValue();
    showDefault(current_page);
}

function reset() {
    document.getElementById("song_name").value = "";
    showDefault(1);
    current_page = 1;
    isSearch = 0;
    // sessionStorage.removeItem("keyword");
    // sessionStorage.removeItem("cluster");
}

// Delete
function deleteData(oid) {
    var request = new XMLHttpRequest();
    var url = "http://localhost/myWeb/ATWD2/Assignment/PHP/Res/core.php/song/" + oid;
    request.open("DELETE", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (data.code == "204") {
                    alert("Failed: Target data is not exist!!");
                } else if (data.code == "202") {
                    alert("Deleted!");
                    reset();
                }
            }
        }
    };
    request.send(null);
}
// Delete

// Update
function updateData(oid) {
    console.log(oid);
    var es = quoteReplace(document.getElementById("eS" + oid).value);
    var ea = quoteReplace(document.getElementById("eA" + oid).value);
    var eal = quoteReplace(document.getElementById("eAL" + oid).value);
    var eau = quoteReplace(document.getElementById("eAU" + oid).value);
    var epu = quoteReplace(document.getElementById("ePU" + oid).value);
    // console.log(es);
    // console.log(ea);
    // console.log(eal);
    // console.log(eau);
    // console.log(epu);
    var request = new XMLHttpRequest();
    var url = "http://localhost/myWeb/ATWD2/Assignment/PHP/Res/core.php/song/" + oid + "/" + es + "/" + ea + "/" + eal + "/" + eau + "/" + epu;
    // console.log(url);
    request.open("PUT", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (data.code == "204") {
                    alert("Failed: Target data is not exist!!");
                } else if (data.code == "202") {
                    alert("Update!");
                    reset();
                }
            }
        }
    };
    request.send(null);
}
// Update

// create
function createData(){
    var cs = quoteReplace(document.getElementById("cSong").value);
    var ca = quoteReplace(document.getElementById("cArtist").value);
    var cal = quoteReplace(document.getElementById("cAlbum").value);
    var cau = quoteReplace(document.getElementById("cImage").value);
    var cpu = quoteReplace(document.getElementById("cAudio").value);
    // console.log(es);
    // console.log(ea);
    // console.log(eal);
    // console.log(eau);
    // console.log(epu);
    var request = new XMLHttpRequest();
    var url = "http://localhost/myWeb/ATWD2/Assignment/PHP/Res/core.php/song/" + cs + "/" + ca + "/" + cal + "/" + cau + "/" + cpu;
    // console.log(url);
    request.open("POST", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (data.code == "204") {
                    alert("Failed: Data has error!!");
                } else if (data.code == "202") {
                    alert("Create!");
                    reset();
                }
            }
        }
    };
    request.send(null);
}
// create

// default
function showDefault(page) {
    var request = new XMLHttpRequest();
    var skip = (page - 1) * records_per_page;
    var url = "http://localhost/myWeb/ATWD2/Assignment/PHP/Res/core.php/song/" + skip + "/" + records_per_page;
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                changePage(page, data);
            }
        }
    };
    request.send(null);
}
// default

//  Search
function Search(page) {
    var request = new XMLHttpRequest();
    var keyword = "";
    // var r_keyword = sessionStorage.getItem("keyword");
    if (document.getElementById("song_name").value != "") {
        keyword = document.getElementById("song_name").value;
        var skip = (page - 1) * records_per_page;
        var url = "http://localhost/myWeb/ATWD2/Assignment/PHP/Res/core.php/song/" + skip + "/" + records_per_page + "/" + keyword;
        request.open("GET", url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    changePage(page, data);
                }
            }
        }
        request.send(null);
    } else {
        alert("Please input keyword!");
    }

    // if (keyword == "") {
    //     url += quoteReplace(cluster);
    // } else {
    //     url += quoteReplace(keyword) + "/" + quoteReplace(cluster);
    // }
}

function quoteReplace(str) {
    var result = str.replaceAll(/[/]/gi, "_");
    result = result.replaceAll(/\s/gi, "+");
    return result;
}
//  Search

//Pagination
function changePage(page, data) {
    var showPage = document.getElementById("page");
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var showPlace = document.getElementById("show");
    var countResult = document.getElementById("count");

    total_result = data[1].NumDocs;
    console.log(data[1].NumDocs);
    countResult.innerHTML = "About " + total_result + " results, page " + page + " of " + numPages();
    showPage.innerHTML = page;

    // Validate page
    if (page < 1) {
        page = 1;
        current_page = 1;
    };

    showPlace.innerHTML = "";
    if (page > numPages()) {
        page = numPages();
        current_page = numPages();
    };


    for (var i = 0; i < data[0].length; i++) {
        // console.log(i);
        ShowAsformat(i, data[0]);
    }

    if (page == 1) {
        btn_prev.classList.add("disabled");
    } else {
        btn_prev.classList.remove("disabled");
    }

    if (page == numPages()) {
        btn_next.classList.add("disabled");
    } else {
        btn_next.classList.remove("disabled");
    }
}

function prevPage() {
    current_page--;
    if (isSearch == 1) {
        Search(current_page);
    } else {
        showDefault(current_page);
    }

}

function nextPage() {
    current_page++;
    if (isSearch == 1) {
        Search(current_page);
    } else {
        showDefault(current_page);
    }
}

function numPages() {
    return Math.ceil(total_result / records_per_page);
}
//Pagination

function ShowAsformat(i, data) {
    //target node
    var showDiv = document.getElementById("show");

    //create elements
    var cardDiv = document.createElement("div");
    var cardHeader = document.createElement("div");
    var h5 = document.createElement("h5");
    var songName = document.createElement("div");
    var artistName = document.createElement("div");
    var showBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");
    var editBtn = document.createElement("button");
    var contentDiv = document.createElement("div");
    var cardBody = document.createElement("div");

    //contentDiv
    var rowDiv = document.createElement("div");
    var listDiv = document.createElement("div");
    var list = document.createElement("ul");
    var album = document.createElement("li");
    var albumName = document.createTextNode("Album");
    var albumContent = document.createElement("div");
    var br = document.createElement("br");
    var hr = document.createElement("hr");
    var list1 = document.createElement("ul");
    var preview = document.createElement("li");
    var previewContent = document.createElement("audio");
    var previewSource = document.createElement("source");
    var previewName = document.createTextNode("preview");
    var albumImgDiv = document.createElement("div");
    var albumImg = document.createElement("img");
    //contentDiv

    //set elements
    //header
    cardDiv.classList.add("card");
    cardHeader.classList.add("card-header");
    cardHeader.id = "h" + i;
    h5.classList.add("mb-0");
    h5.classList.add("row");
    songName.classList.add("col-sm-6");
    songName.innerHTML = data[i]["title"];
    songName.id = "sN" + data[i]._id['$oid'];
    artistName.className = "col-sm-4";
    artistName.style = "border-left: 1px solid rgb(0, 0, 0);";
    artistName.innerHTML = data[i].artist.name;
    artistName.id = "aN" + data[i]._id['$oid'];
    //header

    //Btn
    showBtn.innerHTML = "show"
    showBtn.classList.add("btn");
    showBtn.classList.add("btn-primary");
    showBtn.classList.add("col-sm-2");
    showBtn.setAttribute("type", "button");
    showBtn.setAttribute("data-toggle", "collapse");
    showBtn.setAttribute("data-target", "#c" + i);
    showBtn.setAttribute("aria-expanded", true);
    showBtn.setAttribute("aria-controls", "c" + i);

    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.setAttribute("onclick", "deleteData('" + data[i]._id['$oid'] + "')");

    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.setAttribute("onclick", "deleteData('" + data[i]._id['$oid'] + "')");

    // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"></button>
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-success");
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#m" + data[i]._id['$oid']);
    // editBtn.setAttribute("onclick", "editModal(" + i + ",'" + data[0]._id['$oid'] + "')");
    //Btn

    contentDiv.id = "c" + i;
    contentDiv.classList.add("collapse");
    contentDiv.setAttribute("aria-labelledby", "h" + i);
    contentDiv.setAttribute("data-parent", "#show");
    cardBody.classList.add("card-body");
    rowDiv.classList.add("row");

    listDiv.classList.add("col-sm-8");
    list.classList.add("list-group");
    list.classList.add("list-group-horizontal");
    album.classList.add("list-group-item");
    albumContent.classList.add("list-group-item");
    album.style = "background-color: #f5f5f0";
    albumContent.innerHTML = data[i]["album"].title;
    albumContent.id = "a" + data[i]._id['$oid'];

    list1.classList.add("list-group");
    preview.classList.add("list-group-item");
    preview.style = "background-color: #f5f5f0";
    previewContent.classList.add("list-group-item");
    previewContent.controls = true;
    previewSource.src = data[i]["preview"];
    previewSource.type = "audio/mpeg";
    previewSource.id = "p" + data[i]._id['$oid'];

    albumImgDiv.classList.add("col-sm-4");
    albumImg.id = "Img" + data[i]._id['$oid'];
    if (data[i]["album"].cover_medium == null) {
        albumImg.src = "http://localhost/myWeb/ATWD2/Assignment/PHP/Res/Img/noImage.jpg";
    } else {
        albumImg.src = data[i]["album"].cover_medium;
    }
    albumImg.width = 340;
    albumImg.height = 200;

    //show elements on target node
    showDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(contentDiv);
    cardHeader.appendChild(h5);
    h5.appendChild(songName);
    h5.appendChild(artistName);
    h5.appendChild(showBtn);
    albumImgDiv.appendChild(albumImg);
    albumImgDiv.appendChild(hr);
    albumImgDiv.appendChild(deleteBtn);
    albumImgDiv.appendChild(editBtn);
    contentDiv.appendChild(cardBody);
    cardBody.appendChild(rowDiv);
    //list
    album.appendChild(albumName);
    list.appendChild(album);
    list.appendChild(albumContent);
    //list1
    preview.appendChild(previewName);
    previewContent.appendChild(previewSource);
    list1.appendChild(preview);
    list1.appendChild(previewContent);
    //listDiv
    listDiv.appendChild(list);
    listDiv.appendChild(br);
    listDiv.appendChild(list1);
    rowDiv.appendChild(listDiv);
    rowDiv.appendChild(albumImgDiv);

    editModal(data[i]._id['$oid']);
    
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

function editModal(oid) {
    var modal = document.createElement("div");
    var modalDialog = document.createElement("div");
    var modalContent = document.createElement("div");
    var modalHeader = document.createElement("div");
    var modalTitle = document.createElement("h4");
    var dismissBtn = document.createElement("button");
    var modalBody = document.createElement("div");
    var modalFooter = document.createElement("div");
    var cancelBtn = document.createElement("Button");
    var submitBtn = document.createElement("Button");

    //header
    var name = document.createTextNode("Edit");
    modalTitle.appendChild(name);
    modalHeader.appendChild(modalTitle);
    //<button type="button" class="close" data-dismiss="modal">&times;</button>
    dismissBtn.classList.add("close");
    dismissBtn.setAttribute("data-dismiss", "modal");
    dismissBtn.innerHTML = "&times;";
    modalHeader.appendChild(dismissBtn);
    //header

    //body
    var songVal = document.getElementById("sN" + oid);
    var artistVal = document.getElementById("aN" + oid);
    var albumVal = document.getElementById("a" + oid);
    var albumUrlVal = document.getElementById("Img" + oid);
    var previewVal = document.getElementById("p" + oid);

    var songList = document.createElement("ul");
    var song = document.createElement("li");
    var songName = document.createTextNode("Song");
    var songContent = document.createElement("input");

    var artistList = document.createElement("ul");
    var artist = document.createElement("li");
    var artistName = document.createTextNode("Artists");
    var artistContent = document.createElement("input");

    var albumList = document.createElement("ul");
    var album = document.createElement("li");
    var albumName = document.createTextNode("Album");
    var albumContent = document.createElement("input");

    var albumUrlList = document.createElement("ul");
    var albumUrl = document.createElement("li");
    var albumUrlName = document.createTextNode("Album Image Url");
    var albumUrlContent = document.createElement("input");

    var previewUrlList = document.createElement("ul");
    var previewUrl = document.createElement("li");
    var previewUrlName = document.createTextNode("Preview Audio Url");
    var previewUrlContent = document.createElement("input");

    songList.classList.add("list-group");
    song.classList.add("list-group-item");
    song.style = "background-color: #f5f5f0";
    song.appendChild(songName);
    songList.appendChild(song);
    songContent.id = "eS" + oid;
    songContent.type = "text";
    songContent.classList.add("list-group-item");
    songContent.required = true;
    songContent.value = songVal.innerHTML;
    songList.appendChild(songContent);
    modalBody.appendChild(songList);

    artistList.classList.add("list-group");
    artist.classList.add("list-group-item");
    artist.style = "background-color: #f5f5f0";
    artist.appendChild(artistName);
    artistList.appendChild(artist);
    artistContent.id = "eA" + oid;
    artistContent.type = "text";
    artistContent.classList.add("list-group-item");
    artistContent.required = true;
    artistContent.value = artistVal.innerHTML;
    artistList.appendChild(artistContent);
    modalBody.appendChild(artistList);

    albumList.classList.add("list-group");
    album.classList.add("list-group-item");
    album.style = "background-color: #f5f5f0";
    album.appendChild(albumName);
    albumList.appendChild(album);
    albumContent.id = "eAL" + oid;
    albumContent.type = "text";
    albumContent.classList.add("list-group-item");
    albumContent.required = true;
    albumContent.value = albumVal.innerHTML;
    albumList.appendChild(albumContent);
    modalBody.appendChild(albumList);

    albumUrlList.classList.add("list-group");
    albumUrl.classList.add("list-group-item");
    albumUrl.style = "background-color: #f5f5f0";
    albumUrl.appendChild(albumUrlName);
    albumUrlList.appendChild(albumUrl);
    albumUrlContent.id = "eAU" + oid;
    albumUrlContent.classList.add("list-group-item");
    albumUrlContent.required = true;
    albumUrlContent.value = albumUrlVal.src;
    albumUrlList.appendChild(albumUrlContent);
    modalBody.appendChild(albumUrlList);

    previewUrlList.classList.add("list-group");
    previewUrl.classList.add("list-group-item");
    previewUrl.style = "background-color: #f5f5f0";
    previewUrl.appendChild(previewUrlName);
    previewUrlList.appendChild(previewUrl);
    previewUrlContent.id = "ePU" + oid;
    previewUrlContent.classList.add("list-group-item");
    previewUrlContent.required = true;
    previewUrlContent.value = previewVal.src;
    previewUrlList.appendChild(previewUrlContent);
    modalBody.appendChild(previewUrlList);

    //body

    //footer
    //<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.classList.add("btn");
    cancelBtn.classList.add("btn-secondary");
    cancelBtn.setAttribute("data-dismiss", "modal");
    // '<button type="button" class="btn btn-success" onclick="update(' + i + ',\'' + data._id['$oid'] + '\')">Update</button>' +
    submitBtn.innerHTML = "Update";
    submitBtn.classList.add("btn");
    submitBtn.classList.add("btn-success");
    submitBtn.setAttribute("onclick", "updateData('" + oid + "')");
    submitBtn.setAttribute("data-dismiss", "modal");
    modalFooter.appendChild(cancelBtn);
    modalFooter.appendChild(submitBtn);
    //footer

    modal.className = "modal fade";
    modalDialog.className = "modal-dialog modal-xl";
    modalContent.className = "modal-content";
    modalHeader.className = "modal-header";
    modalTitle.className = "modal-title";
    modalBody.className = "modal-body";
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    modal.id = "m" + oid;
    document.getElementById("modalShow").appendChild(modal);
    // document.getElementById("m" + i).click();
}