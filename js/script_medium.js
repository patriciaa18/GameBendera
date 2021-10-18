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
    flag: "asset/indonesia.png",
    answers: [
      { text: "Amerika Serikat", correct: false },
      { text: "Papua Nugini", correct: false },
      { text: "Indonesia", correct: true },
      { text: "Australia", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/jepang.png",
    answers: [
      { text: "Korea Selatan", correct: false },
      { text: "Jepang", correct: true },
      { text: "Rusia", correct: false },
      { text: "Thailand", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/korea.png",
    answers: [
      { text: "Korea Selatan", correct: true },
      { text: "Inggris", correct: false },
      { text: "Jepang", correct: false },
      { text: "Mongolia", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/amerika.png",
    answers: [
      { text: "Amerika Serikat", correct: true },
      { text: "Australia", correct: false },
      { text: "Selandia Baru", correct: false },
      { text: "Jerman", correct: false },
    ],
  },
  {
    question: "Bendera negara manakah ini?",
    flag: "asset/rusia.png",
    answers: [
      { text: "Perancis", correct: false },
      { text: "Brazil", correct: false },
      { text: "Malaysia", correct: false },
      { text: "Rusia", correct: true },
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
    flag: "asset/singapura.png",
    answers: [
      { text: "Singapura", correct: true },
      { text: "Malaysia", correct: false },
      { text: "Indonesia", correct: false },
      { text: "Yunani", correct: false },
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
  "Arab Saudi adalah negara yang tidak memiliki sungai. Negara di semenanjung Arab ini tidak memiliki sungai permanen.",
  "Sebelum tahun 2011, Rusia menganggap kadar alcohol yang kurang dari 10% termasuk dari bahan makanan.",
  "Kini penerbangan komersial terpanjang dimiliki oleh Singapore Airlines. Rutenya dari Singapura ke New York dengan rata-rata waktu perjalanan selama 17 jam 50 menit.",
  "Transportasi kereta api India digunakan sekitar 23 juta penumpang setiap hari. Jumlah itu sama dengan seluruh populasi Australia.",
  "Jika direntangkan dalam satu jalur, jaringan kereta api India dapat mengelilingi dunia satu setengah kali.",
  "Biaya taksi di Bandara Narita Tokyo termasuk paling mahal di dunia, dikenakan sekitar 3,8 juta untuk sekali jalan.",
  "Di Jepang, Paris, dan Jerman, jika operator kereta terlambat lebih dari lima menit, maka akan diberikan sertifikat keterlambatan.",
  "Pisang adalah topping pizza terpopuler di Swedia. Ya, buah itu akan dipotong tipis dan dipasangkan dengan bubuk kari.",
  "25 pasang saudara kembar yang terdata, Desa Kodinhi di India, di Kerala, tercatat enam kali lebih banyak terjadi kelahiran kembar daripada rata-rata di seluruh dunia.",
  "Indonesia adalah Tempat ditemukannya ular terpanjang di dunia yaitu, Python Reticulates sepanjang 10 meter di Sulawesi.",
  "Jembatan suramadu (surabaya-madura) adalah jembatan terpanjang di Asia Tenggara (5438 m).",
  "Pada abad pertengahan di Eropa, garam sangat mahal harganya, sehingga disebut sebagai “emas putih”.",
  "Negara Nepala satu-satunya yang desain benderanya tidak segiempat.",
  "Jembatan SuraMadu(Surabaya-Madura) menjadi jembatan terpanjang di Asia Tenggara."
];
