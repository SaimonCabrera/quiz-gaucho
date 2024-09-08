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
            "tempo": [
                "imagens/motus3/Ama.jpg", "imagens/motus3/Ama!2.jpg", "imagens/motus3/Ama! (3).jpg"
            ],
            "amor": [
                "imagens/motus2/Ama.jpg", "imagens/motus2/Amorhereditário.jpg", "imagens/motus2/AmorProprio.jpg", "imagens/motus2/AmorProprio2.jpg"
            ],
            "olhar": [
                "imagens/motus4/Acapadolivro.jpg", "imagens/motus4/Aintrusa.jpg", "imagens/motus4/Amulherpreta.jpg"
            ],
            "resiliencia": [
                "imagens/motus5/Brincando.jpg", "imagens/motus5/DuasBarras.jpg", "imagens/motus5/edai.jpg", "imagens/motus5/Entreunseoutros.jpg"
            ],
            "natureza": [
                "imagens/motus6/Aevolução.jpg", "imagens/motus6/Asnovas.jpg", "imagens/motus6/Benedicta.jpg", "imagens/motus6/Corina.jpg"
            ],
            "motus": [
                "imagens/motus?/.jpg", "imagens/motus?/.jpg"
                //motus 1 ou 7 ou 8 preciso das imagens
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