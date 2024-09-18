document.addEventListener("DOMContentLoaded", function() {
    const options = document.querySelectorAll(".option");
    const submitButton = document.getElementById("submit");
    const resultContainer = document.getElementById("result");
    const questionContainers = document.querySelectorAll(".question-container");
    const answers = {};

    options.forEach(option => {
        option.addEventListener("click", function() {
            const questionContainer = this.closest(".question-container");
            const questionIndex = Array.from(document.querySelectorAll(".question-container")).indexOf(questionContainer);

            // tira do selecionado a questão anterior
            const previouslySelected = questionContainer.querySelector(".selected");
            if (previouslySelected) {
                previouslySelected.classList.remove("selected");
            }

            // Seleciona a opção clicada
            this.classList.add("selected");

            // salva a resposta
            answers[questionIndex] = this.getAttribute("data-correspondência");

            // verifica se todas as questões foram respondidas
            if (questionIndex < questionContainers.length - 1) {
                questionContainers[questionIndex + 1].scrollIntoView({ behavior: "smooth" });
            } else {
                submitButton.style.display = "block"; // Show submit button on the last question
                submitButton.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    submitButton.addEventListener("click", function() {
        let result = calculateResult(answers);
        displayResult(result);
        resultContainer.scrollIntoView({ behavior: "smooth" });
    });

    function calculateResult(answers) {
        const count = {};

        // conta a frequencia de cada resposta
        for (let key in answers) {
            const answer = answers[key];
            if (count[answer]) {
                count[answer]++;
            } else {
                count[answer] = 1;
            }
        }

        // procura a mais respondida
        let mostFrequent = null;
        let maxCount = 0;
        for (let key in count) {
            if (count[key] > maxCount) {
                mostFrequent = key;
                maxCount = count[key];
            }
        }

        return mostFrequent;
    }

    function displayResult(result) {
        const imagens = {
            "a": [
                "imagens/poemas/1.png", "imagens/poemas/2.png"
            ],
            "b": [
                "imagens/poemas/3.png", "imagens/poemas/4.png"
            ],
            "c": [
                "iimagens/poemas/5.png", "imagens/poemas/6.png"
            ],
            "d": [
                "imagens/poemas/7.png"
            ],
            "e": [
                "imagens/poemas/8.png"
            ],
            "f": [
                "imagens/poemas/9.png"
            ]
        };

        // Selecionar uma imagem aleatória do array correspondente ao resultado
        const randomImage = imagens[result][Math.floor(Math.random() * imagens[result].length)];
        
        // Mostrar a imagem selecionada e o botão para conhecer o site
        resultContainer.innerHTML = `
            <img src="${randomImage}" alt="Resultado" class="fixed-size-image mb-3">
            <br>
            <a id="visit-site" href="http://movimentoliterariodigital.atspace.cc/" target="_blank" class="btn w-100 mt-3" style="background-color: #D32F2F; color: white; border: none;">Conheça nosso site</a>
        `;
    }
});