// lib for utility functions

// Regular expression for email validation as per HTML specification
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

const formConstraints = [
  { type: "name", min: 2, max: 50 },
  { type: "email", min: 5, max: 254 },
  { type: "number", min: 7, max: 15 },
];

function validateInput(type, value) {}
