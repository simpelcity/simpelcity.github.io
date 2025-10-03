// const { lang } = require("moment");
// const { render } = require("sass");

const username = "simpelcity";
const maxPages = 3;
const hideForks = true;
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const filterInput = document.querySelector(".filter-repos");

// get list of user's public repos
const getRepos = async () => {
	let repos = [];
	let res;
	for (let i = 1; i <= maxPages; i++) {
		res = await fetch(`https://api.github.com/users/${username}/repos?&sort=pushed&per_page=100&page=${i}`);
		let data = await res.json();
		repos = repos.concat(data);
	}
	repos.sort((a, b) => b.forks_count - a.forks_count);
	repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
	displayRepos(repos);
};
getRepos();

// display list of all user's public repos
const displayRepos = (repos) => {
	const userHome = `https://github.com/${username}`;
	filterInput.classList.remove("hide");

	const listItem = document.querySelector(".repo-list");

	if (!repos || repos.length === 0) {
		listItem.innerHTML = "<p>No repositories found :(</p>";
		return;
	} else if (repos.name === undefined) {
		listItem.innerHTML = "<p>Failed to fetch repositories :(</p>";
	}

	listItem.innerHTML = repos
		.map((repo) => {
			const langUrl = `${userHome}?tab=repositories&q=&language=${repo.language}`;

			function phpIconSize() {
				if (repo.language === "PHP") return "fs-3";
			}

			return `
        <div class="col-12 col-md-6 col-xl-4 py-2">
            <div class="card card-repo bg-gray-300 h-100">
                <div class="card-body d-flex flex-column">
                    <a href="${
						repo.html_url
					}" target="_blank" class='repo-name text-info fs-3 fw-500 text-decoration-none'>${repo.name}</a>
                    <span class='repo-description text-info'>${repo.description}</span>
                    <div class="d-flex justify-content-center gap-3 mt-auto">
                        ${
							repo.language
								? `<a href="${langUrl}" class="text-info text-decoration-none d-flex gap-1">
									<div class="${phpIconSize()} d-flex align-items-center">${langIcons[repo.language]}</div>
									<p class="my-auto language-name">${repo.language}</p></a>`
								: ""
						}
                        ${
							repo.homepage
								? `<a class="link-btn text-info text-decoration-none d-flex align-items-center gap-1" href=${repo.homepage}>
								<img class="chrome" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg" />
								<p class="my-auto site-name">Site</p></a>`
								: ""
						}
                    </div>
                </div>
            </div>
        </div>`;
		})
		.join("");
};

// dynamic search
filterInput.addEventListener("input", (e) => {
	const search = e.target.value;
	const repos = document.querySelectorAll(".card");
	const searchLowerText = search.toLowerCase();

	for (const repo of repos) {
		const lowerText = repo.innerText.toLowerCase();
		if (lowerText.includes(searchLowerText)) {
			repo.classList.remove("hide");
		} else {
			repo.classList.add("hide");
		}
	}
});

// for programming language icons
const langIcons = {
	Git: '<i class="devicon-git-plain colored"></i>',
	Github: '<i class="devicon-github-original"></i>',
	Chrome: '<i class="devicon-chrome-plain text-white"></i>',
	Assembly: '<i class="devicon-labview-plain colored"></i> Assembly',
	"C#": '<i class="devicon-csharp-plain colored"></i> C#',
	"C++": '<i class="devicon-cplusplus-plain colored"></i> C++',
	C: '<i class="devicon-c-plain colored"></i> C',
	Clojure: '<i class="devicon-clojure-plain colored"></i> C',
	CoffeeScript: '<i class="devicon-coffeescript-plain colored"></i> CoffeeScript',
	Crystal: '<i class="devicon-crystal-plain colored"></i> Crystal',
	CSS: '<i class="devicon-css3-plain colored"></i>',
	Dart: '<i class="devicon-dart-plain colored"></i> Dart',
	Dockerfile: '<i class="devicon-docker-plain"></i> Docker',
	Elixir: '<i class="devicon-elixir-plain colored"></i> Elixir',
	Elm: '<i class="devicon-elm-plain colored"></i> Elm',
	Erlang: '<i class="devicon-erlang-plain colored"></i> Erlang',
	"F#": '<i class="devicon-fsharp-plain colored"></i> F#',
	Go: '<i class="devicon-go-plain colored"></i> Go',
	Groovy: '<i class="devicon-groovy-plain colored"></i> Groovy',
	HTML: '<i class="devicon-html5-plain colored"></i>',
	Haskell: '<i class="devicon-haskell-plain colored"></i> Haskell',
	Java: '<i class="devicon-java-plain colored" style="color: #ffca2c"></i> Java',
	JavaScript: '<i class="devicon-javascript-plain colored"></i>',
	Julia: '<i class="devicon-julia-plain colored"></i> Julia',
	"Jupyter Notebook": '<i class="devicon-jupyter-plain colored"></i> Jupyter',
	Kotlin: '<i class="devicon-kotlin-plain colored" style="color: #796bdc"></i> Kotlin',
	Latex: '<i class="devicon-latex-plain colored"></i> Latex',
	Lua: '<i class="devicon-lua-plain-wordmark colored" style="color: #0000d0"></i> Lua',
	Matlab: '<i class="devicon-matlab-plain colored"></i> Matlab',
	Nim: '<i class="devicon-nixos-plain colored" style="color: #FFC200"></i> Nim',
	Nix: '<i class="devicon-nixos-plain colored"></i> Nix',
	ObjectiveC: '<i class="devicon-objectivec-plain colored"></i> ObjectiveC',
	OCaml: '<i class="devicon-ocaml-plain colored"></i> OCaml',
	Perl: '<i class="devicon-perl-plain colored"></i> Perl',
	PHP: '<i class="devicon-php-plain colored"></i>',
	PLSQL: '<i class="devicon-sqlite-plain colored"></i> PLSQL',
	MySQL: '<i class="devicon-mysql-original colored"></i>',
	Processing: '<i class="devicon-processing-plain colored" style="color: #0096D8"></i> Processing',
	Python: '<i class="devicon-python-plain colored" style="color: #3472a6"></i> Python',
	R: '<i class="devicon-r-plain colored"></i> R',
	Ruby: '<i class="devicon-ruby-plain colored"></i> Ruby',
	Rust: '<i class="devicon-rust-plain colored" style="color: #DEA584"></i> Rust',
	Sass: '<i class="devicon-sass-original colored"></i>',
	Scala: '<i class="devicon-scala-plain colored"></i> Scala',
	Shell: '<i class="devicon-bash-plain colored"></i>',
	Solidity: '<i class="devicon-solidity-plain colored"></i> Solidity',
	Stylus: '<i class="devicon-stylus-plain colored"></i> Stylus',
	Svelte: '<i class="devicon-svelte-plain colored"></i> Svelte',
	Swift: '<i class="devicon-swift-plain colored"></i> Swift',
	Terraform: '<i class="devicon-terraform-plain colored"></i> Terraform',
	TypeScript: '<i class="devicon-typescript-plain colored"></i> TypeScript',
	"Vim Script": '<i class="devicon-vim-plain colored"></i> Vim Script',
	Vue: '<i class="devicon-vuejs-plain colored"></i> Vue',
	Bootstrap: '<i class="devicon-bootstrap-plain colored"></i>',
	UML: '<i class="devicon-unifiedmodelinglanguage-plain colored"></i>',
};

const certificates = [
	{ name: "Command line", language: ["Shell"] },
	{ name: "PHP Beginner", language: ["PHP"] },
	{ name: "HTML/CSS Beginner", language: ["HTML", "CSS"] },
	{ name: "PHP Novice", language: ["PHP"] },
	{ name: "PHP Web", language: ["PHP", "HTML"] },
	{ name: "MySQL Beginner", language: ["MySQL"] },
	{ name: "Database PDO", language: ["MySQL", "PHP"] },
	{ name: "JavaScript Beginner", language: ["JavaScript"] },
	{ name: "Bootstrap", language: ["Bootstrap"] },
	{ name: "HTML/CSS Advanced", language: ["HTML", "CSS"] },
	{ name: "Git", language: ["Git"] },
	{ name: "Database Advanced", language: ["MySQL"] },
	{ name: "JavaScript Novice", language: ["JavaScript"] },
	{ name: "Regular Expressions", language: ["PHP"] },
	{ name: "Fullstack Webdeveloper", language: ["HTML", "CSS", "Sass", "JavaScript", "PHP", "MySQL"] },
	{ name: "Object Oriented Programming Advanced", language: ["PHP"] },
	{ name: "UML", language: ["UML"] },
	{ name: "Object Oriented Programming Intro", language: ["PHP"] },
	{ name: "Unit Testing with PHP", language: "PHP" },
];

function iconClass(lang) {
	if (lang === "PHP") return "fs-2";
	if (lang === "Shell") return "fs-3";
	if (lang === "JavaScript") return "rounded-3";
	return "";
}

const certificatesDiv = document.getElementById("certificates-div");
const certificatesPerPage = 8;
let currentPage = 1;

function renderCertificatesPage(page) {
	certificatesDiv.textContent = "";
	const start = (page - 1) * certificatesPerPage;
	const end = start + certificatesPerPage;
	const pageCertificates = certificates.slice(start, end);

	pageCertificates.forEach((certificate, index) => {
		const div = document.createElement("div");
		div.className = "col-12 col-md-6 mb-3";
		let iconsHtml = "";

		// if language property is array
		if (Array.isArray(certificate.language)) {
			// if language property is 4 or bigger
			if (certificate.language.length >= 4) {
				const half = Math.ceil(certificate.language.length / 2);
				const firstRow = certificate.language
					.slice(0, half)
					.map((lang) => `<span class="${iconClass(lang)}">${langIcons[lang] || ""}</span>`)
					.join("");
				const secondRow = certificate.language
					.slice(half)
					.map((lang) => `<span class="${iconClass(lang)}">${langIcons[lang] || ""}</span>`)
					.join("");

				iconsHtml = `
                <div class="d-grid gap-1 align-items-center">
                    <div class="d-flex gap-1">${firstRow}</div>
                    <div class="d-flex gap-1">${secondRow}</div>
                </div>
            `;
			} else {
				// if language property is smaller than 4
				iconsHtml = certificate.language
					.map(
						(lang) =>
							`<span class="gap-1 d-flex align-items-center ${iconClass(lang)}">${
								langIcons[lang] || ""
							}</span>`
					)
					.join("");
			}
		} else {
			// if language property is not an array
			iconsHtml = `<span class="gap-1">${langIcons[certificate.language] || ""}</span>`;
		}

		// insert icons into certificate card
		div.innerHTML = `
			<div class="d-flex align-items-center bg-light rounded shadow-sm p-2 gap-2 h-100">
				${iconsHtml}
				<span class="fw-medium text-secondary text-start">${certificate.name}</span>
			</div>
    	`;
		certificatesDiv.appendChild(div);

		if (currentPage === 3 && index === 3) {
			div.classList.add("unit-testing");
		}
	});

	renderPagination();
}

function renderPagination() {
	const totalPages = Math.ceil(certificates.length / certificatesPerPage);
	const pageNum = document.querySelector(".page-num");
	if (!pageNum) return;

	// Build the page numbers
	let pageNumbersHtml = "";
	for (let i = 1; i <= totalPages; i++) {
		pageNumbersHtml += `
            <div class="pagination-page ${i === currentPage ? " active" : ""}" data-page="${i}">${i}</div>
        `;
	}
	pageNum.innerHTML = pageNumbersHtml;

	// Page number click handlers
	document.querySelectorAll(".pagination-page").forEach((btn) => {
		btn.onclick = (e) => {
			currentPage = parseInt(e.target.dataset.page);
			renderCertificatesPage(currentPage);
		};
	});

	// Prev/Next arrow handlers
	const prevBtn = document.getElementById("prev-page");
	const nextBtn = document.getElementById("next-page");
	if (prevBtn) {
		prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1";
		prevBtn.style.pointerEvents = currentPage === 1 ? "none" : "auto";
		prevBtn.onclick = () => {
			if (currentPage > 1) {
				currentPage--;
				renderCertificatesPage(currentPage);
			}
		};
	}
	if (nextBtn) {
		nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1";
		nextBtn.style.pointerEvents = currentPage === totalPages ? "none" : "auto";
		nextBtn.onclick = () => {
			if (currentPage < totalPages) {
				currentPage++;
				renderCertificatesPage(currentPage);
			}
		};
	}
}

renderCertificatesPage(currentPage);

const languagesDiv = document.getElementById("languages-div");
const languages = [
	{ name: "HTML", progress: 90, color: "#e34c26" },
	{ name: "CSS", progress: 90, color: "#2965f1" },
	{ name: "JavaScript", progress: 65, color: "#f0db4f" },
	{ name: "PHP", progress: 80, color: "#787cb5" },
	{ name: "MySQL", progress: 70, color: "#f29111" },
];

function sizeIcons(lang) {
	if (lang.name === "PHP") return "fs-1";
	if (lang.name === "JavaScript") return "fs-2";
	if (lang.name === "MySQL") return "fs-3";
	return "fs-2";
}

function renderLanguages() {
	console.log(languages);
	let html = "";

	languages.forEach((lang) => {
		html += `
		<div class="${lang.name.toLowerCase()}">
			<div class="fs-4 fw-medium d-flex justify-content-center align-items-center gap-1">
				<span class="${sizeIcons(lang)}">${langIcons[lang.name]}</span>
				<p class="m-0">${lang.name}</p>
			</div>
			<div class="pb-3 mb-3 border-bottom border-2 border-info">
				<div class="progress" role="progressbar" aria-label="${lang.name} progressbar" aria-valuenow="${
			lang.progress
		}" aria-valuemin="0" aria-valuemax="100">
					<div class="progress-bar progress-bar-striped" style="width: ${lang.progress}%; background-color: ${lang.color};"></div>
				</div>
			</div>
		</div>
		`;
	});
	languagesDiv.innerHTML = html;
}

renderLanguages();
