      /*TODO @Darwin clean up and organize code
        TODO @Darwin move functions to appropriate place
        TODO @Darwin database security
        TODO @Darwin make separate javascript files*/
  

    //All functions

    /*
    / @brief this function retrieves the already existent
    /        items from a list and adds the new ones to it
    /        can be used to update lists and arrays
    /
    / @param relevantRef a reference to the appropriate object header
    / @param childName the name of the object you want to update
    / @param itemName the item you want to update
    / @param newValue the values you want to add
    */
    function getSnapshot(relevantRef, childName, itemName, newValue) {
      var ref = relevantRef.child(childName).child(itemName)
      var oldlist = [];
      ref.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          oldlist.push(item);
        });
        var newList = oldlist.concat(newValue);
        relevantRef.child(childName).update({
          [itemName]: newList
        })
      });
    }

    function updateCompany(companyName, employees, locations = null) {
      getSnapshot(companyRef, companyName, "listOfLocations", locations);
      getSnapshot(companyRef, companyName, "listOfEmployees", employees);
    };

    function updateIntern(name, email, location) {
      if(email != null) {
        internRef.child(name).update({
          "email": email
        })
      }
      if(location != null) {
        internRef.child(name).update({
          "location": location
        })
      }
    }





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

    //Setup references to Object headers
    var companyRef = ref.child("Company");
    var internRef = ref.child("User/Interns");


    //createCompany("Mind Readers Inc", ["Place1", "Drace1", "Trace1"], ["P1", "P2"]);
    //createCompany("Telefrags", ["US", "UK", "UV"]);
    //updateCompany("Mind Readers Inc", ["France", "Trance", "Drance"], ["Person", "Persona"]);
    //updateCompany("Telefrags", [] , "Atlan");

    internRef.update({
      "AAlength": 0
    });

    createIntern("Andrew", "$!@#$","bass1purduedu", "Hawaii");
    createIntern("Mihir", "paswrod", "tiwar@purdue.d", "NeYrok");
    createIntern("Hitena", "Sseptu", "rarho@prud.2");
    updateIntern("Mihir", null, "Cali");

    