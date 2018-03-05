import firebaseService from './firebase.service';

class ItemService {
    constructor() {
        this.db = firebaseService.database();
        this.dbRef = this.db.ref();
        this.itemsRef = this.dbRef.child('items');
    }

    getItemList() {
        var that = this;
        var dataList = [];
        return new Promise(
            function (resolve, reject) {
                that.itemsRef.once("value").then(function (snapshot) {
                    snapshot.forEach((child) => {
                        dataList.push({
                            title: child.val().title,
                            _key: child.key
                        });
                    });                    
                    if (dataList.length) {
                        resolve({
                            success: true,
                            dataList: dataList
                        });
                    } else {
                        resolve({ success: false });
                    }
                }, function () {
                    console.log("error");
                    resolve({ success: false });
                });
            }
        );
    }

    /* addMessageInfo(chatInfo){
        var that = this;
        return new Promise(
            function (resolve, reject) {
                that.messagesRef.push().set(chatInfo).then(function(response) {
                    console.log("success");
                    resolve({success: true});
                }, function (error) {
                    console.log("error");
                    resolve({success: false});
                });
            }
        );
    } */
}

const itemService = new ItemService();
export default itemService;