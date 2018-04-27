$('document').ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-Q83izk2qcvcb-jXHvejWdocQOBhtcfc",
    authDomain: "train-times-2872e.firebaseapp.com",
    databaseURL: "https://train-times-2872e.firebaseio.com",
    projectId: "train-times-2872e",
    storageBucket: "train-times-2872e.appspot.com",
    messagingSenderId: "780477772763"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  function append(childSnapshot) {
    //set the current time in the heading
    var currentTime = moment();
    console.log("the current time is: " + moment(currentTime).format("HH:mm"));

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().trainFirstTime;
    var frequency = childSnapshot.val().frequency;

    //go back one year with the train's first departure time
    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    //format the converted time for display - CHECK THIS IS NECESSARY
    var trainTime = moment(firstTimeConverted).format("HH:mm");
    //calculate the difference between now and the first train
	var timeDifference = moment().diff(moment(firstTimeConverted), 'minutes');
    //use modulo to check for the remainder between difference and train frequency
    var timeRemainder = timeDifference % frequency;
	//calculate minutes till next traiin
	var minsAway = frequency - timeRemainder;
	//create variable for next train's arrival time
	var nextTrain = moment().add(minsAway, 'minutes');
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
    
    //append the data to the DOM from the database
    $('#trainData').append(
            `<tr class="train-item"><td>${ childSnapshot.val().name }</td><td>${ childSnapshot.val().destination }</td><td>${ childSnapshot.val().frequency }</td><td>${ moment(nextTrain).format('HH:mm A') }</td><td>${ minsAway }</td>`
        )

    $('#current-time').text(moment(currentTime).format("HH:mm A"));

   }

   function syncData() {
       //clear table
        $('#trainData').empty();
       //call append function from database
       console.log(database.ref());
       database.ref().once('value').then(function(snapshot) {
            var val = snapshot.val();
            var keys = Object.keys(val);
            console.log(val);
            console.log(keys);
            keys.forEach(function(key) {
                database.ref(key).once('value').then(append);
            });
       });
       
   }

   setInterval(syncData, 60000);
//    setTimeout(syncData, 1000);

  $('#newTrain').on('click', function(event) {
      event.preventDefault();
        
      var name = $('#train-name').val().trim();
      var destination = $('#train-destination').val().trim();
      var trainFirstTime = $('#train-first-time').val().trim();
      var frequency = $('#train-frequency').val().trim();

      $('input').val("").focus();

      console.log(name);
      console.log(destination);
      console.log(trainFirstTime);
      console.log(frequency);

      database.ref().push({
        name: name,
        destination: destination,
        trainFirstTime: trainFirstTime,
        frequency: frequency
      });

  });

database.ref().on('child_added', append, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  //refresh the train times schedule - CHECK THAT ONLY THAT REFRESHES, NOT THE ENTIRE PAGE
  $('#refresh-schedule').on('click', function() {
    location.reload();
  });

});