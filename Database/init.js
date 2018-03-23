
    //Initialize Firebase
    const config = {
      apiKey: "AIzaSyCpow5onc7CzR9ekowLsK_VA_UbK1FnWoM",
      authDomain: "pair-ab7d0.firebaseapp.com",
      databaseURL: "https://pair-ab7d0.firebaseio.com",
      projectId: "pair-ab7d0",
      storageBucket: "pair-ab7d0.appspot.com",
      messagingSenderId: "553932382090"
    };

    //Setup references to database
    var defaultApp = firebase.initializeApp(config);
    var ref = firebase.database().ref();
    var storageRef = firebase.storage().ref();

    //Setup references to Object headers
    var companyRef = ref.child("Company");
    var internRef = ref.child("User/Interns");
    var employeeRef = ref.child("User/Employees");
    var chatRoomRef = ref.child("ChatRooms");
    var companyChatRoomRef = ref.child("ChatRooms/Company");
    var locationChatRoomRef = ref.child("ChatRooms/Location");
    var groupChatRoomRef = ref.child("ChatRooms/Group");
    var privateChatRoomRef = ref.child("ChatRooms/Private");

    // addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "hey guys");
    // setTimeout('addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "th is message")', 1000);
    // setTimeout('addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "th is messagener sd r one")', 2000);
    // setTimeout('addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "the")', 3000);

    verifyCompany(companyRef, "head@carrot.com", "something", (x) => {
        console.log(x);
    });
    verifyCompany(companyRef, "head@carrot.com", "somthing", (x) => {
        console.log(x);
    });




    







