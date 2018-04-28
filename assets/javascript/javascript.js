  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAuKsU_c-jsiX49FaaFUimHtlQHV9S2QNg",
      authDomain: "train-sc-1fce6.firebaseapp.com",
      databaseURL: "https://train-sc-1fce6.firebaseio.com",
      projectId: "train-sc-1fce6",
      storageBucket: "",
      messagingSenderId: "1035131967873"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for adding Trains
  $("#add-train-btn").on("click", function (event) {
      event.preventDefault();

      //Grab user input
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
      var trainFrequency = $("#frequency-input").val().trim();

      // Creates local "temporary" object for holding train data
      var newTrain = {
          name: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: trainFrequency
      };

      // Uploads train data to the database
      database.ref().push(newTrain);


      // Clears all of the text-boxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#train-time-input").val("");
      $("#frequency-input").val("");
  });

  database.ref().on("child_added", function (childSnapShot, prevChildKey) {
      console.log(childSnapShot.val());

      // Stores everything into a variable
      var trainName = childSnapShot.val().name;
      var trainDestination = childSnapShot.val().destination;
      var trainTime = childSnapShot.val().time;

      var trainFrequency = childSnapShot.val().frequency;
      var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency;
      var minutes = trainFrequency - timeRemainder;
      var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
      
      // Train Info
      console.log("Train Frequency is: ", trainFrequency);
      console.log("Time Remainder is: ", timeRemainder);
      console.log("Next Train Arrival is : ", nextTrainArrival);
      console.log("Minutes is: ", minutes);

      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
          trainFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

  });