var admin = require("firebase-admin");

var serviceAccount = require('./timesheet-e37a7-firebase-adminsdk-cezqy-764530ac5f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timesheet-e37a7.firebaseio.com"
});

var ref = admin.database().ref().child("testDB");
var jsonData = {
    test:"message",
    message : "hellow test buddy."
}

ref.on('value', function(snapshot) {
    var objs = snapshot.val() 
    var dataKeys = Object.keys(objs);
var dataArray = [];
    dataKeys.forEach(element => {
        dataArray.push(objs[element])
    });
console.log(dataArray)
  });

ref.child("timesheets").once('value').then(function(snapshot) {
        var objs = snapshot.val() 
        var dataKeys = Object.keys(objs);
    var dataArray = [];
        dataKeys.forEach(element => {
            dataArray.push(objs[element])
        });
    console.log(dataArray)
    CreateTableFromJSON(dataArray)
  });

  function CreateTableFromJSON(dataArray) {
    

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < dataArray.length; i++) {
        for (var key in dataArray[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < dataArray.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = dataArray[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

