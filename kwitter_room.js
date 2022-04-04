//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
  apiKey: "AIzaSyCOcbKrsN_COFhaHqk36Z6ca8qmZPZR4ys",
  authDomain: "test-2-10201.firebaseapp.com",
  databaseURL: "https://test-2-10201-default-rtdb.firebaseio.com",
  projectId: "test-2-10201",
  storageBucket: "test-2-10201.appspot.com",
  messagingSenderId: "152648441768",
  appId: "1:152648441768:web:622941ca9982d349ee079d",
  measurementId: "G-GNF2MH0GMG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page_html";
}


function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name-"+Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row; 


      
    });
  });
}
function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name",name);
  window.location="kwitter_page.html";
}

getData();

function send()
{
  msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
  })
  document.getElementById("msg").value="";


}