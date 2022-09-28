Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


export const dateFormat = (dateString) =>{
    var createdDate = new Date(dateString);
    var date = createdDate.toLocaleDateString();

    var day = createdDate.getDate();
    var month = createdDate.getMonth() + 1; //months are zero based
    var year = createdDate.getFullYear();

    var time = createdDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    return `${year}-${month.pad()}-${day.pad()} ${time}`;
}
