//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark (e) {
    //get values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting 
    e.preventDefault();
}

//delete bookmark 
function deleteBookmark(url) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
            //re-set back to local storage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

            //re-fetch bookmarks
            fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResults = document.getElementById('bookmarksResults');

    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                     '<h3>'+name+
                                     ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                     ' <a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> ' +
                                     '</h3>'+
                                     '</div>';
    }
}

//Validate form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('please use a valid URL');
        return false;
    }

    return true;
}