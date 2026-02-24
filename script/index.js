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

function checkCardContainer() {
	if (cardContainer.children.length === 0) {
		cardContainer.innerHTML = `
			<div class="max-w-[1110px] mx-auto flex flex-col justify-center items-center h-screen">
				<div class="mb-5">
					<i class="fa-regular fa-file-lines text-[80px] text-[#7DA8FF]"></i>
				</div>
				<h2 class="font-semibold text-2xl text-[#002C5C] mb-1">
					No jobs available
				</h2>
				<p class="font-normal text-base text-[#64748B]">
					Check back soon for new job opportunities
				</p>
			</div>
		`;
		return true;
	} else {
		const noJobs = cardContainer.querySelector(".no-jobs");
		if (noJobs) {
			noJobs.remove();
			return false;
		}
	}
}

function checkFilterEmpty(list) {
	if (list.length === 0) {
		filterSection.innerHTML = `
			<div class="max-w-[1110px] mx-auto flex flex-col justify-center items-center h-screen">
				<div class="mb-5">
					<i class="fa-regular fa-file-lines text-[80px] text-[#7DA8FF]"></i>
				</div>
				<h2 class="font-semibold text-2xl text-[#002C5C] mb-1">
					No jobs available
				</h2>
				<p class="font-normal text-base text-[#64748B]">
					Check back soon for new job opportunities
				</p>
			</div>
		`;
		return true;
	}
}

function updateToggle() {
	if (interviewBtn.classList.contains("btn-primary")) {
		renderFilter(interviewList);
		count("interview");
	} else if (rejectedBtn.classList.contains("btn-primary")) {
		renderFilter(rejectedList);
		count("rejected");
	} else {
		filterSection.classList.add("hidden");
		cardContainer.classList.remove("hidden");
		count("all");
		checkCardContainer();
	}
}

function cardsContain(event) {
	if (event.target.closest(".fa-trash-can")) {
		const parentNode = event.target.closest(".cards");
		if (!parentNode) {
			return;
		}

		const companyName = parentNode.querySelector(".company-name").innerText;

		const newInterviewList = [];
		for (const item of interviewList) {
			if (item.companyName !== companyName) {
				newInterviewList.push(item);
			}
		}
		interviewList = newInterviewList;

		const newRejectedList = [];
		for (const item of rejectedList) {
			if (item.companyName !== companyName) {
				newRejectedList.push(item);
			}
		}
		rejectedList = newRejectedList;

		if (allBtn.classList.contains("btn-primary")) {
			parentNode.remove();
			count("all");
			checkCardContainer();
		} else {
			updateToggle();
		}

		return;
	}

	const parentNode = event.target.closest(".cards");
	if (!parentNode) {
		return;
	}

	const companyName = parentNode.querySelector(".company-name").innerText;
	const position = parentNode.querySelector(".position").innerText;
	const location = parentNode.querySelector(".location").innerText;
	const type = parentNode.querySelector(".type").innerText;
	const salary = parentNode.querySelector(".salary").innerText;
	const para = parentNode.querySelector(".description").innerText;

	const cardInfo = {
		companyName,
		position,
		location,
		type,
		salary,
		para,
	};

	let availableData = !Object.values(cardInfo).includes("");
	let isDuplicate = false;

	if (event.target.classList.contains("interview")) {
		let moveItem = null;
		const newRejectedList = [];
		for (const item of rejectedList) {
			if (item.companyName === cardInfo.companyName) {
				moveItem = item;
			} else {
				newRejectedList.push(item);
			}
		}
		rejectedList = newRejectedList;

		for (let item of interviewList) {
			if (item.companyName === cardInfo.companyName) {
				isDuplicate = true;
				break;
			}
		}

		if (moveItem) {
			moveItem.statusBtn = "interview";
			interviewList.push(moveItem);
		} else if (availableData && !isDuplicate) {
			cardInfo.statusBtn = "interview";
			interviewList.push(cardInfo);
		}
		parentNode.classList.remove("rejected-border");
		parentNode.classList.add("interview-border");
		parentNode.querySelector(".status-btn").className =
			"status-btn btn font-medium text-sm uppercase mb-2 btn-outline btn-success";
		parentNode.querySelector(".status-btn").innerText = "interview";

		updateToggle();
	} else if (event.target.classList.contains("rejected")) {
		let moveItem = null;
		const newInterviewList = [];
		for (const item of interviewList) {
			if (item.companyName === cardInfo.companyName) {
				moveItem = item;
			} else {
				newInterviewList.push(item);
			}
		}
		interviewList = newInterviewList;

		for (let item of rejectedList) {
			if (item.companyName === cardInfo.companyName) {
				isDuplicate = true;
				break;
			}
		}

		if (moveItem) {
			moveItem.statusBtn = "rejected";
			rejectedList.push(moveItem);
		} else if (availableData && !isDuplicate) {
			cardInfo.statusBtn = "rejected";
			rejectedList.push(cardInfo);
		}

		parentNode.classList.remove("interview-border");
		parentNode.classList.add("rejected-border");
		parentNode.querySelector(".status-btn").className =
			"status-btn btn font-medium text-sm uppercase mb-2 btn-outline btn-error";
		parentNode.querySelector(".status-btn").innerText = "rejected";

		updateToggle();
	}
}

cardContainer.addEventListener("click", cardsContain);
filterSection.addEventListener("click", cardsContain);


function renderFilter(list) {
	if (checkFilterEmpty(list)) {
		return;
	}
	filterSection.innerHTML = "";

	for (let item of list) {
		console.log(item);
		const div = document.createElement("div");

		div.className =
			"cards bg-white rounded-lg shadow p-6 flex justify-between mb-4";

		if (item.statusBtn === "interview") {
			div.classList.add("interview-border");
		} else if (item.statusBtn === "rejected") {
			div.classList.add("rejected-border");
		}

		div.innerHTML = `
			<div class="">
					<h2 class="company-name font-semibold text-lg text-[#002C5C] mb-1">
						${item.companyName}
					</h2>
					<p class="position font-normal text-base text-[#64748B] mb-5">
						${item.position}
					</p>
					<p class="font-normal text-sm text-[#64748B] mb-5">
						<span class="location">${item.location}</span> •
						<span class="type">${item.type}</span> •
						<span class="salary">${item.salary}</span>
					</p>
					<button class="status-btn btn font-medium text-sm uppercase mb-2 ${item.statusBtn === "interview" ? "btn-outline btn-success" : "btn-outline btn-error"}">
						 ${item.statusBtn}
					</button>

					<p class="description font-normal text-sm text-[#323B49]">
						${item.para}
					</p>
					<div class="flex gap-2 mt-5">
						<button
							class="interview btn btn-outline btn-success uppercase font-semibold text-sm"
						>
							interview
						</button>
						<button
							class="rejected btn btn-outline btn-error uppercase font-semibold text-sm"
						>
							Rejected
						</button>
					</div>
				</div>
				<div class="delete-btn">
					<a
						class="w-8 h-8 border border-[#F1F2F4] rounded-full inline-flex items-center justify-center text-[#64748B]"
						href="#"
					>
						<i class="fa-regular fa-trash-can"> </i>
					</a>
				</div> 
			
			`;
		filterSection.appendChild(div);
		console.log(div);
	}
}

