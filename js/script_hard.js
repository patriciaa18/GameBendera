// deklarasi variable
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const logoElement = document.getElementById("logo");
const mainButton = document.getElementById("main-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const infoElement = document.getElementById("info");
const scoreElement = document.getElementById("score");
const backElement = document.getElementById("back");
const flagImage = document.getElementById("flag");
const rightElement = document.getElementById("right");

let shuffledQuestions, currentQuestionIndex;
let countRight = 0;

//menambah event listener pada button jika diklik
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
finishButton.addEventListener("click", finishPage);

//fungsi untuk memulai game dan menyembunyikan button start, dan logo
function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  logoElement.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  flagImage.classList.remove("hide");
  setNextQuestion();
  //test
  console.log(shuffledQuestions);
}
//fungsi untuk mengambil pertanyaan berikutnya
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
//fungsi untuk menampilkan pertanyaan
function showQuestion(question) {
  questionElement.innerText = question.question;
  flagImage.src = question.flag;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
//fungsi untuk reset pertanyaan
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  //test
  console.log("state is "+answerButtonsElement.firstChild);
}
//fungsi untuk memilih jawaban, dan jika panjang array pertanyaan kurang dari index sekarang maka akan muncul button restart
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    finishButton.classList.remove("hide");
  }
  if (correct){
    countRight++;
  }//fungsi untuk mengambil nilai dari total benar
  rightElement.innerHTML="Kamu benar "+countRight+" dari "+questions.length+" soal.";
  totalScore = (currentQuestionIndex+1)*100;
  scoreElement.innerHTML="Skor kamu adalah " + (countRight*100) + "/" + totalScore;

  //test
  console.log(selectedButton);
}
//set status class correct or wrong
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
//fungsi untuk menghapus status class
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

//fungsi untuk menampilkan halaman finish, menyembunyikan button-button dan elemen lainnya
function finishPage() {
  console.log("Finishing Page");
  backElement.classList.add("hide");
  nextButton.classList.add("hide");
  finishButton.classList.add("hide");
  logoElement.classList.remove("hide");
  scoreElement.classList.remove("hide");
  rightElement.classList.remove("hide");
  infoElement.classList.remove("hide");
  startButton.classList.add("hide");
  mainButton.classList.remove("hide");
  
  questionContainerElement.classList.add("hide");
  showInfo();
  //test
  console.log(rightElement);
  console.log(scoreElement);
}
//memunculkan random fakta menarik
function showInfo() {
  var shuffleInfo = infos[Math.floor(Math.random() * infos.length)];
  document.getElementById("info-content").innerText = shuffleInfo;
  //test
  console.log(shuffleInfo);
}

// untuk menyimpan pertanyaan
const questions = [
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/comoro.png",
    answers: [
      { text: "Kepulauan Solomon", correct: false },
      { text: "Ghana", correct: false },
      { text: "Komoro", correct: true },
      { text: "Niue", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/niue.png",
    answers: [
      { text: "Tuvalu", correct: false },
      { text: "Niue", correct: true },
      { text: "São Tomé dan Principe", correct: false },
      { text: "Mesir", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/samoa.png",
    answers: [
      { text: "Samoa", correct: true },
      { text: "Tuvalu", correct: false },
      { text: "Nepal", correct: false },
      { text: "Uruguay", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/tuvalu.png",
    answers: [
      { text: "Tuvalu", correct: true },
      { text: "Mozambik", correct: false },
      { text: "Papua Nugini", correct: false },
      { text: "Mongolia", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/solomon.png",
    answers: [
      { text: "Bahrain", correct: false },
      { text: "Maroko", correct: false },
      { text: "Niue", correct: false },
      { text: "Kepulauan Solomon", correct: true },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/latvia.png",
    answers: [
      { text: "Latvia", correct: true },
      { text: "Rusia", correct: false },
      { text: "Kazakhstan", correct: false },
      { text: "Turki", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/kazakhstan.png",
    answers: [
      { text: "Perancis", correct: false },
      { text: "Kazakhstan", correct: true },
      { text: "Inggris", correct: false },
      { text: "Uzbekistan", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/mauritius.png",
    answers: [
      { text: "Mauritius", correct: true },
      { text: "Argentina", correct: false },
      { text: "Nigeria", correct: false },
      { text: "Thailand", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/thailand.png",
    answers: [
      { text: "Jerman", correct: false },
      { text: "Meksiko", correct: false },
      { text: "Latvia", correct: false },
      { text: "Thailand", correct: true },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/venezuela.png",
    answers: [
      { text: "Vanuatu", correct: false },
      { text: "Jepang", correct: false },
      { text: "Venezuela", correct: true },
      { text: "Selandia Baru", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/vanuatu.png",
    answers: [
      { text: "Vanuatu", correct: true },
      { text: "Singapura", correct: false },
      { text: "Kazakhstan", correct: false },
      { text: "Rusia", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/ekuador.png",
    answers: [
      { text: "Argentina", correct: false },
      { text: "Ekuador", correct: true },
      { text: "Yunani", correct: false },
      { text: "Kanada", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/sao.png",
    answers: [
      { text: "São Tomé dan Principe", correct: true },
      { text: "Tuvalu", correct: false },
      { text: "Argentina", correct: false },
      { text: "Kepulauan Solomon", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/yunani.png",
    answers: [
      { text: "Venezuela", correct: false },
      { text: "Vanuatu", correct: false },
      { text: "Yunani", correct: true },
      { text: "Argentina", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/india.png",
    answers: [
      { text: "Pakistan", correct: false },
      { text: "India", correct: true },
      { text: "Jepang", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  }
];

//array berisi fakta unik dunia
var infos = [
  "Belanda adalah negara dengan rata-rata laki-laki tertinggi di dunia.",
  "Rasio kelahiran anak kembar tertinggi ada di Kota Igo Obra, Nigeria",
  "Skotlandia memiliki hewan nasional yaitu Unicorn",
  "Sebagian besar bola sepak diproduksi di Pakistan",
  "Islandia adalah negara yang tidak memiliki nyamuk",
  "Negara Peru adalah negara dengan memproduksi ribuan jenis kentang",
  "Di Korea Selatan, bayi baru lahir sudah terhitung 1 tahun",
  "Bahasa tubuh unik di Albania adalah menggelengkan kepala berarti setuju",
  "Jumlah emas yang dimiliki oleh ibu-ibu di India bisa melebih jumlah emas dari 3 negara berpengaruh(USA, Jerman, dan Swiss)",
  "Nama Negara Saudi Arabia diambil dari nama Raja Saud",
  "Kode telepon di Antartika adalah 672",
  "Ada lebih dari 450 jenis susu, Prancis mendominasi sebanyak 240 jenis.",
  "Hawaii memiliki jumlah alfabet yang sedikit, yaitu 12 huruf saja",
  "Suku Innuit di Kutub Utara menyimpan stok makanan di kulkas, karena suhu kulkas lebih tinggi dibanding suhu lingkungan sekitarnya",
  "Beberapa bagian di Cina, polisi menggunakan bebek sebagai hewan penjaga",
];
