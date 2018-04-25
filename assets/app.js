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

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().trainFirstTime;
    var frequency = childSnapshot.val().frequency;

    var frequency = parseInt(frequency);

    console.log("name: " + name);
    console.log("destination: " + destination);
    console.log("train first time: " + trainFirstTime);
    console.log("frequency: " + frequency);

    var currentTime = moment();
    console.log("the current time is: " + moment(currentTime).format("HH:mm"));

    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    console.log("first train time converted: " + firstTimeConverted);

    var trainTime = moment(firstTimeConverted).format("HH:mm");
    console.log("first time formatted: " + trainTime);

    var timeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
	var timeDifference = moment().diff(moment(timeConverted), 'minutes');
    console.log("DIFFERENCE IN TIME: " + timeDifference);
    
    var timeRemainder = timeDifference % frequency;
	console.log("TIME REMAINING: " + timeRemainder);
	//MINUTES UNTIL NEXT TRAIN
	var minsAway = frequency - timeRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
	//NEXT TRAIN
	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));

  });

   //initial value variables
    // var name = "";
    // var destination = "";
    // var trainFirstTime = "";
    // var frequency = "";

    // var nextTrain = "";
    // var minutesTillTrain = "";
    // var nextTrainFormatted = "";
    // var firstTimeConverted = "";
    // var currentTime = "";
    // var difftime = "";
    // var timeRemainder = "";

    // $('#newTrain').on('click', function(event) {
    //     event.preventDefault();

    //     name = $('#train-name').val().trim();
    //  	destination = $('#train-destination').val().trim();
    //  	trainFirstTime = $('#train-first-time').val().trim();
    //     frequency = $('#train-frequency').val().trim();
         
        //   firstTimeConverted = moment(trainFirstTime, "hh:mm").subtract(1, "years");
        //   currentTime = moment();
        //   diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        //   timeRemainder = diffTime % frequency;
        //   minutesTillTrain = frequency - timeRemainder;
        //   nextTrain = moment().add(minutesTillTrain, "minutes");
        //   nextTrainFormatted = moment(nextTrain).format("hh:mm");

        //   database.ref().push({
        //     name: name,
        //     destination: destination,
        //     trainFirstTime: trainFirstTime,
        //     frequency: frequency

            // nextTrainFormatted: nextTrainFormatted,
            // minutesTillTrain: minutesTillTrain
    //       });
    // });

    // database.ref().on('child_added', function(childSnapshot) {

    //     console.log(childSnapshot.val());

    //     var firstTimeConverted = moment(trainFirstTime, "hh:mm").subtract(1, "years");
    //     var currentTime = moment();
    //     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //     var timeRemainder = diffTime % frequency;
    //     var minutesTillTrain = frequency - timeRemainder;
    //     var nextTrain = moment().add(minutesTillTrain, "minutes");
    //     var nextTrainFormatted = moment(nextTrain).format("hh:mm");

    //     $('#trainData').append(
    //         `<tr><td>${ childSnapshot.val().name }</td><td>${ childSnapshot.val().destination }</td><td>${ childSnapshot.val().frequency }</td><td>${ nextTrainFormatted }</td><td>${ minutesTillTrain }</td>`
    //     )
    // });


  //on click event to generate the rows of train data
//   $('#newTrain').on('click', function(event) {
//     event.preventDefault();

    // name = $('#train-name').val().trim();
    // destination = $('#train-destination').val().trim();
    // trainFirstTime = moment($('#train-first-time').val().trim(), "HH:mm").format("HH:mm");
    // frequency = $('#train-frequency').val().trim();

    // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    // var diffTime = moment().diff(moment(trainFirstTime), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    // var tRemainder = diffTime % frequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var minutesTillTrain = frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(minutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //code for handling the push
//     database.ref().push({
//         name: name,
//         destination: destination,
//         trainFirstTime: trainFirstTime,
//         frequency: frequency
//     });

// });

    // database.ref().on("child_added", function(childSnapshot) {

        //varible for the current time
        // var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Assumptions
        // var tFrequency = 3;

        // Time is 3:30 AM
        // var firstTime = "03:30";

        

//         $('#trainData').append(
//             `<tr><td>${ childSnapshot.val().name }</td><td>${ childSnapshot.val().destination }</td><td>${ childSnapshot.val().frequency }</td><td>${ childSnapshot.val().nextTrain }</td><td>${ childSnapshot.val().minutesTillTrain }</td>`
//         )
        
// });

});