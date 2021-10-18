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
  }
];

//array berisi fakta unik dunia
var infos = [
  "Hewan purba Komodo hanya bisa ditemukan di Indonesia, tepatnya di pulau Komodo, Nusa Tenggara Timur.",
  "Planet bumi berotasi selama 24 jam dan berevolusi selama 365 hari.",
  "Hewan Kangguru adalah hewan asli benua Australlia.",
  "Negara Jepang memiliki salah satu kereta api paling tepat waktu di dunia.",
  "San Marino, negara yang terletak di tengah Italia itu ternyata jumlah penduduknya lebih sedikit dibanding jumlah mobil.",
  "Kentang goreng atau yang lebih dikenal French Fries ternyata bukan berasal dari Prancis, melainkan dari Belgia.",
  "Permainan ular tangga berasal dari India.",
  "Pulau Kirimati terletak di Republik Kiribati ternyata kepulauan yang mengawali pergantian hari.",
  "Menara di Taj Mahal sedikit condong ke arah luar. Pembangunannya memang sengaja demikian supaya tak menimpa makam jika runtuh.",
  "Di Pulau Yap, Mikronesia, batu digunakan sebagai mata uang. Nilai setiap batu didasarkan pada ukuran dan sejarahnya (dari mana asalnya).",
  "Jika kepadatan penduduk seperti Kota New York, seluruh populasi di dunia ini dapat ditampung negara bagian Texas, AS.",
  "Saat ini ada 320.000 orang yang belajar 'Klingon' (bahasa fiksi Star Trek) di aplikasi bahasa Duolingo.",
  "Alaska adalah negara bagian paling barat dan paling timur di Amerika Serikat.",
  "Di Finlandia, sekolah tidak memiliki rangking dan PR",
  "Sebagian biaya pembuatan Menara Eiffel ditanggung oleh pendirinya sendiri, yaitu Alexander Eiffel."
];
