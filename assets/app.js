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

  database.ref().on('child_added', function(childSnapshot) {
    //set the current time in the heading
    var currentTime = moment();
    console.log("the current time is: " + moment(currentTime).format("HH:mm"));

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().trainFirstTime;
    var frequency = childSnapshot.val().frequency;

    //go back one year with the train's first departure time
    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    //format the converted time for display
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
            `<tr><td>${ childSnapshot.val().name }</td><td>${ childSnapshot.val().destination }</td><td>${ childSnapshot.val().frequency }</td><td>${ moment(nextTrain).format('HH:mm A') }</td><td>${ minsAway }</td>`
        )

  });

  $('#refresh-schedule').on('click', function() {
    location.reload();
  });

});