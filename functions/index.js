const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

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

        var order_indexRef = db.collection('incremental_index').doc('rO49bWFR3640YvPvvm2T');    
        order_indexRef.get().then(indexOrder=>{
            console.log(indexOrder);
            var order_code = 0 ;
            order_code = indexOrder.data().order;
            order_indexRef.update({order: ++order_code})

            var orderRef = db.collection("requests").doc(context.params.requestId);
            orderRef.update({
                orderId: order_code
            })
            .then(function () {
                    console.log("Document successfully updated!");
            })
            .catch(function (error) {
                    console.error("Error updating document: ", error);
            });
    
    
            db.collection("users").doc(snap.data().user.id).get().then(user=>{
                const payload = {
                    notification: {
                        title: 'Tamima order '+order_code,
                        body: 'Order '+order_code+ ' has been created'
                    }
                };
                admin.messaging().sendToDevice(user.data().token, payload);                              
            });
    
            db.collection("markets").doc(snap.data().market.id).get().then(market=>{
                const payload = {
                    notification: {
                        title: 'Tamima order '+order_code,
                        body: 'Order '+order_code+ ' has been created'
                    }
                };
                admin.messaging().sendToDevice(market.data().token, payload);                
            });
    
            db.collection("portals_tokens").get().then(tokens=>{
                const payload = {
                    notification: {
                        title: 'Tamima order '+order_code,
                        body: 'Order '+order_code+ ' has been created'
                    }
                };
                console.log(tokens)
    //            admin.messaging().sendToDevice(market.data().token, payload);                
            });
    
    






        });
        

    });
