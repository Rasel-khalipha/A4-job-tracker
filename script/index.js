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

function count(activeType = "all") {
	let totalJobs = cardContainer.querySelectorAll(".cards").length;
	for (let total of totalCount) {
		total.innerText = totalJobs;
	}
	interviewCount.innerText = interviewList.length;
	rejectedCount.innerText = rejectedList.length;

	if (activeType === "all") {
		dynamicData.innerHTML = `<p><span class="total-count">${totalJobs}</span> jobs</p>`;
	} else if (activeType === "interview") {
		dynamicData.innerHTML = `<p class="dynamic"><span class="text-success">${interviewList.length}</span> of &nbsp;</p><p><span class="total-count">${totalJobs}</span> jobs</p>`;
	} else if (activeType === "rejected") {
		dynamicData.innerHTML = `<p class="dynamic"><span class="text-secondary">${rejectedList.length}</span> of &nbsp;</p><p><span class="total-count">${totalJobs}</span> jobs</p>`;
	}
}
count();

// Toggle button area
function toggleStyle(id) {
	const buttons = [allBtn, interviewBtn, rejectedBtn];

	for (const btn of buttons) {
		if (btn.id === id) {
			btn.classList.add("btn-primary");
			btn.classList.remove("btn-soft");
		} else {
			btn.classList.remove("btn-primary");
			btn.classList.add("btn-soft");
		}
	}
	if (id === "interview-btn") {
		cardContainer.classList.add("hidden");
		filterSection.classList.remove("hidden");
		renderFilter(interviewList);
		count("interview");
	} else if (id === "rejected-btn") {
		cardContainer.classList.add("hidden");
		filterSection.classList.remove("hidden");
		renderFilter(rejectedList);
		count("rejected");
	} else {
		filterSection.classList.add("hidden");
		cardContainer.classList.remove("hidden");
		count("all");
		checkCardContainer();
	}
}