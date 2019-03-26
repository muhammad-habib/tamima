const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fieldValue = require("firebase-admin").firestore.FieldValue;

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
            res.status(200).send({ length: snap.size?snap.size:0 });
        });
    });
});

exports.createOrder = functions.firestore
    .document('requests/{requestId}')
    .onCreate((snap, context) => {
        
        var order_indexRef = db.collection('incremental_index').doc('order-index');    
        order_indexRef.get().then(indexOrder=>{
            var order_code = 1 ;
            if(indexOrder.exists){
                order_code = indexOrder.data().order;
                order_indexRef.update({order: ++order_code})
            }else{
                order_indexRef.set({order:1})                
            }


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
            // if(snap.data().user && snap.data().user.token)
            //     admin.messaging().sendToDevice(snap.data().user.token, payload);

            let market_indexRef = db.collection("markets").doc(snap.data().market.id);    
            market_indexRef.get().then(market=>{
                if(market.data().notification && market.data().token)
                    admin.messaging().sendToDevice(market.data().token, payload);                
            })
            
            db.collection('users_notifications').add({
                    userId:snap.data().user.id,
                    orderId:context.params.requestId,
                    marketId:snap.data().market.id,
                    payload:payload,
                    createdAt:fieldValue.serverTimestamp()
                });

            db.collection('markets_notifications').add({
                    userId:snap.data().user.id,
                    orderId:context.params.requestId,
                    marketId:snap.data().market.id,
                    payload:payload,
                    createdAt:fieldValue.serverTimestamp()
                });                              

            db.collection('portal_notifications').add({
                    type:'orders',
                    id:context.params.requestId,
                    body:'تم اضاقه طلب جديد برقم '+'  '+order_code,
                    type:'orders',
                    createdAt:fieldValue.serverTimestamp()
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
        let title='';
        let body='';
        let receiverLang = snap.data().receiverLang; 
        switch(snap.data().content.type){
            case 'text':
                    title = snap.data().senderName + ((receiverLang=='en')? " ارسلك رساله جديده":" send you message")
                    body = snap.data().content.text;
                    break;
            case 'image':                   
                         title = snap.data().senderName + ((receiverLang=='en')?" ارسلك صوره": " sent you Image " );
                    break;
            case 'voice':
                        title = snap.data().senderName + ((receiverLang=='en')?" ارسلك رساله صوتيه": "sent you Voice ");
                    break;
            case 'invoice':
                        title = snap.data().senderName + ((receiverLang=='en')?" ارسلك رساله فاتوره": "sent you Invoice ");
                    break;
            }
        let payload = {
            notification: {
                title: title,
                body: body
            },
            data:{
                id:snap.data().requestId,
                'userType':snap.data().userType,
                userId:snap.data().userId,
                market:snap.data().marketId
            }
        };

            let collection ='';
            if(snap.data().userType == 'type_user' ){
                collection = 'markets'
            }else{
                collection = 'users';                
            }

            console.log(collection);
        var receiver_indexRef = db.collection(collection).doc(snap.data().receiverId);    
        
        return receiver_indexRef.get().then(receiver=>{
            console.log(receiver.data().token);
            if(receiver.data() && receiver.data().notification && receiver.data().token)
                admin.messaging().sendToDevice(receiver.data().token, payload);

        db.collection(collection+'_notifications').add({
            orderId:snap.data().requestId,
            payload:payload,              
            receiverLang:snap.data().receiverLang,
            receiverImage:snap.data().receiverImage,
            userId:snap.data().userId,
            market:snap.data().marketId,
            createdAt:fieldValue.serverTimestamp()
        });
            

        })



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
            createdAt:fieldValue.serverTimestamp()
        });
        
        

    });
