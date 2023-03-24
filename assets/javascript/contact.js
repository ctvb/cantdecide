// // contact page that links to githubs  

// var fn
// var ln
// var email
// var comment
// var submit

// // 
// <form onsubmit="return false"></form>;

// // INPUT BOX FOR FIRST NAME
// <input type="text" placeholder="First Name" id="firstName" />;
// <br></br>;

// // INPUT BOX FOR lAST NAME
// <input type="text" placeholder="Last Name" id="lastName" />;
// <br></br>;

// // INPUT BOX FOR EMAIL
// <input type="email" placeholder="Email" id="email" />;
// <br></br>;

// // INPUT BOX FOR COMMENTS
// <span>Comments</span>;
// <br></br>;
// <textarea id="comment" rows="4"></textarea>;
// <br></br>;

// // SUBMIT BUTTON
// <button onclick="sendContact();">Send Contact</button>

// // MAKE ALL INTO A FIELD
// var fields = {};
// document.addEventListener("DOMContentLoaded", function() {
//     fields.firstName = document.getElementById('firstName');
//     fields.lastName = document.getElementById('lastName');
//     fields.email = document.getElementById('email');
//     fields.comment = document.getElementById('comment');
// });

// // CHECKS IF THE FIELD IS EMPTY
// function isNotEmpty(Value) {
//     if (Value == null || typeof value == 'undefined' )return false;
//     return (value.length >0);
// }

// // CHECKS IF THE FIELD VALUE IS A NUMBER
// function isNumber(num) {
//     return (num.length > 0) && !isNaN(num);
// }

// // SEND CONTACT INFO
// function sendContact() {
//     fields.fn = getName();

//     if (isValid()) {
//         var usr = new User(firstName.value, lastName.value, email.value, comments.value);
//         alert("${usr.firstName} Thank you for reaching out to us.")

//     } else {
//         alert("There was an issue with your request")
//     }
// }

// console.log(isNotEmpty)
// console.log(isNumber)
// console.log(sendContact)
