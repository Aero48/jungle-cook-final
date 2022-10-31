export function changePage(pageID, callback) {
    if (pageID == '' || pageID == "home") {
        $.get(`pages/home.html`, function (contents) {
            $('#app').html(contents);
            console.log(pageID);
        });
    } else {
        $.get(`pages/${pageID}.html`, function (contents) {
            $('#app').html(contents);
            console.log(pageID);
        });
    }
}