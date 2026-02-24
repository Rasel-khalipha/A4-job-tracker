console.log("I am coming from index");

let interviewList = [];
let rejectedList = [];

let totalCount = document.querySelectorAll(".total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

const cardContainer = document.getElementById("card-container");
const filterSection = document.getElementById("filter-section");

const dynamicData = document.querySelector(".available .right");