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
        
            let payload = {
                notification: {
                    title: 'Tamima order '+order_code,
                    body: 'Order '+order_code+ ' has been created'
                },
                data:{
                    id:context.params.requestId
                }
            };
            if(snap.data().user && snap.data().user.token)
                admin.messaging().sendToDevice(snap.data().user.token, payload);

            if(snap.data().market && snap.data().market.token)
                admin.messaging().sendToDevice(snap.data().market.token, payload);                

            db.collection('users_notifications').add({
                    userId:snap.data().user.id,
                    orderId:context.params.requestId,
                    marketId:snap.data().market.id,
                    payload:payload,
                    createdAt:Date.now()
                });

            db.collection('markets_notifications').add({
                    userId:snap.data().user.id,
                    orderId:context.params.requestId,
                    marketId:snap.data().market.id,
                    payload:payload,
                    createdAt:Date.now()
                });                              

            db.collection('portal_notifications').add({
                    type:'orders',
                    id:context.params.requestId,
                    body:'تم اضاقه طلب جديد برقم '+'  '+order_code,
                    type:'orders',
                    createdAt:Date.now()
                });

            payload = {
                    notification: {
                        title: 'Tamima order '+order_code,
                        body: 'Order '+order_code+ ' has been created'
                    },
                    data:{
                        id:context.params.requestId
                    }
                };                
    
            db.collection("portals_tokens").get().then(tokensQuerySnapshot=>{
                if (!tokensQuerySnapshot.empty) {
                    let portalTokens=tokensQuerySnapshot.docs.map((docSnapShot)=>docSnapShot.data().token)
                    admin.messaging().sendToDevice(portalTokens, payload);                
                  }
            });
        });
        

    });


    exports.createMessage = functions.firestore
    .document('messages/{id}/messages_threads/{threadId}')
    .onCreate((snap, context) => {
        console.log(snap.data(),context.params);
        // switch(snap.data().content.type){
        //     case 'text':
        //             break;
        //     case 'image':
        //             break;
        //     case 'voice':
        //             break;
        //     case 'invoice':
        //             break;
        // }
        let payload = {
            notification: {
                title: snap.data().content.text,
                body: snap.data().content.text
            },
            data:{
                id:snap.data().requestId
            }
        };
        if(snap.data().token)
            admin.messaging().sendToDevice(snap.data().token, payload);

            let collection = 'users';
            if(snap.data().userType == 'type_user' ){
                collection = 'markets'
            }

        db.collection(collection).add({
            orderId:snap.data().requestId,
            payload:payload,
            createdAt:Date.now()
        });


    });


    exports.createMarket = functions.firestore
    .document('markets/{id}')
    .onCreate((snap, context) => {

        const payload = {
            notification: {
                title: 'تم اضافه متجر جديد ',
                body: ' '+snap.data().name+' '
            },
            data:{
                id:context.params.id
            }
        };

        db.collection("portals_tokens").get().then(tokensQuerySnapshot=>{
            if (!tokensQuerySnapshot.empty) {
                let portalTokens=tokensQuerySnapshot.docs.map((docSnapShot)=>docSnapShot.data().token)
                admin.messaging().sendToDevice(portalTokens, payload);                
              }
        });
        db.collection('portal_notifications').add({
            type:'markets',
            id:context.params.id,
            body:'تم اضافه متجر جديد ',
            createdAt:Date.now()
        });
        
        

    });
