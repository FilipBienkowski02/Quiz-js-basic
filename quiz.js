var quiz = {
 
  data: [
  {
    q : "Kiedy była Bitwa pod Warszawa?",
    o : [
      "1940r",
      "1944r",
      "1939r",
      "1945r"
    ],
    a : 1
  },
  {
    q : "Kto walczył w bitwie nad Bzurą?",
    o : [
      "ZSRR -- III Rzesza",
      "Rumunia -- Polska",
      "Polska -- ZSRR",
      "Polska -- III Rzesza"
    ],
    a : 3
  },
  {
    q : "Która z wymienionych bitw była największa?",
    o : [
      "Bitwa pod Warszawą",
      "Bitwa pod Studziankami",
      "Operacja brzesko-lubelska",
      "Bitwa nad Bzurą"
    ],
    a : 2
  },
  {
    q : "Ile faz miała Bitwa nad Bzurą?",
    o : [
      "3",
      "2",
      "4",
      "5"
    ],
    a : 0
  },
  {
    q : "Jaki jest temat strony?",
    o : [
      "Bitwy pancerne",
      "Bitwy pancerne na terenach ZSRR w czasie IIWŚ",
      "Bitwy pancerne w czasie IIWŚ",
      "Bitwy pancerne na terenach polski w czasie IIWŚ"
    ],
    a : 3
  }
  ],

  hWrap: null, 
  hQn: null, 
  hAns: null, 


  now: 0,
  score: 0,


  init: function(){

    quiz.hWrap = document.getElementById("quizWrap");


    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);


    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);


    quiz.draw();
  },


  draw: function(){

    quiz.hQn.innerHTML = quiz.data[quiz.now].q;


    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },


  select: function(){

    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }

 
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `Masz ${quiz.score} na ${quiz.data.length} poprawnych odpowiedzi.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  reset : function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);

