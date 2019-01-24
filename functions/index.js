const functions = require('firebase-functions');
const cors = require('cors')({origin:true});

var admin = require("firebase-admin");

var serviceAccount = require('./timesheet-e37a7-firebase-adminsdk-cezqy-764530ac5f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timesheet-e37a7.firebaseio.com"
});



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
cors(request,response,()=>{
    var dateData = new Date(request.body.queryResult.parameters.date)
    var jDate = new Date(dateData); 
    var s = jDate.toLocaleDateString();
    var jsonData = {
        "fulfillmentText": "timeSheet has been bocked on " +  s
      }
    var ref = admin.database().ref().child("testDB");
    var dataRef = ref.child("timesheets").push(jsonData)

    return response.status(200).json(
        jsonData
    )
})

});
