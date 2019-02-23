const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.countCollection = functions.https.onRequest((req, res) => {
    const collection_name = req.query.name;
    cors(req, res, () => {
        return db.collection(collection_name).get().then(snap => {
            res.status(200).send({ length: snap.size });
        });
    });
});

exports.createOrder = functions.firestore
    .document('requests/{requestId}')
    .onCreate((snap, context) => {

        var orderRef = db.collection("requests").doc("requestId");
        orderRef.update({
            orderId: 123456
        })
        .then(function () {
                console.log("Document successfully updated!");
        })
        .catch(function (error) {
                console.error("Error updating document: ", error);
        });

        db.collection("users").doc(snap.data.user.id).get(user=>{
            const payload = {
                notification: {
                    title: 'You have been invited to a trip.',
                    body: 'Tap here to check it out!'
                }
            };        
        admin.messaging().sendToDevice(user.token, payload)                
        });
    });
