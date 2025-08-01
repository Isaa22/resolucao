document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const searchBtn = document.getElementById('search-btn');
    const topicInput = document.getElementById('topic-input');
    const subjectSelect = document.getElementById('subject-select');
    const resultsSection = document.getElementById('results');
    const loader = document.querySelector('.loader');
    const lessonContent = document.querySelector('.lesson-content');
    const lessonTitle = document.getElementById('lesson-title');
    const lessonMaterials = document.getElementById('lesson-materials');
    const saveBtn = document.getElementById('save-btn');
    const printBtn = document.getElementById('print-btn');
    const newSearchBtn = document.getElementById('new-search-btn');
    
    // Dados de exemplo melhorados
    const sampleLessons = {
        "matematica": {
            "equações do 2º grau": {
                "title": "Aula sobre Equações do 2º Grau",
                "content": `
                    <h4>O que são equações do 2º grau?</h4>
                    <p>Uma equação do segundo grau é toda equação na forma ax² + bx + c = 0, com a, b e c números reais e a ≠ 0.</p>
                    
                    <h4>Fórmula de Bhaskara</h4>
                    <p>A solução de uma equação do segundo grau é dada pela fórmula:</p>
                    <p>x = [-b ± √(b² - 4ac)] / 2a</p>
                    
                    <h4>Exemplo resolvido</h4>
                    <p>Resolva a equação x² - 5x + 6 = 0</p>
                    <p>Solução:</p>
                    <ol>
                        <li>Identifique os coeficientes: a=1, b=-5, c=6</li>
                        <li>Calcule o discriminante: Δ = b² - 4ac = 25 - 24 = 1</li>
                        <li>Aplique na fórmula: x = [5 ± √1]/2</li>
                        <li>As raízes são: x₁ = (5+1)/2 = 3 e x₂ = (5-1)/2 = 2</li>
                    </ol>
                    
                    <h4>Exercícios</h4>
                    <ol>
                        <li>Resolva a equação x² - 7x + 10 = 0</li>
                        <li>Determine as raízes de 2x² + 3x - 2 = 0</li>
                        <li>Para qual valor de k a equação x² - 4x + k = 0 tem apenas uma raiz real?</li>
                    </ol>
                `
            },
            "teorema de pitágoras": {
                "title": "Aula sobre Teorema de Pitágoras",
                "content": `
                    <h4>O que é o Teorema de Pitágoras?</h4>
                    <p>Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.</p>
                    <p>Fórmula: a² = b² + c², onde a é a hipotenusa e b, c são os catetos.</p>
                    
                    <h4>Aplicações</h4>
                    <ul>
                        <li>Cálculo de distâncias</li>
                        <li>Construção civil</li>
                        <li>Navegação</li>
                    </ul>
                    
                    <h4>Exemplo resolvido</h4>
                    <p>Um triângulo retângulo tem catetos de 3cm e 4cm. Qual é o comprimento da hipotenusa?</p>
                    <p>Solução:</p>
                    <p>a² = 3² + 4² = 9 + 16 = 25 → a = √25 = 5cm</p>
                    
                    <h4>Exercícios</h4>
                    <ol>
                        <li>Calcule a hipotenusa de um triângulo com catetos 6cm e 8cm.</li>
                        <li>Se a hipotenusa mede 13cm e um cateto mede 5cm, qual o comprimento do outro cateto?</li>
                        <li>Verifique se um triângulo com lados 7cm, 24cm e 25cm é retângulo.</li>
                    </ol>
                `
            }
        },
        "historia": {
            "segunda guerra mundial": {
                "title": "Aula sobre Segunda Guerra Mundial",
                "content": `
                    <h4>Contexto histórico</h4>
                    <p>A Segunda Guerra Mundial (1939-1945) foi um conflito global entre as Potências do Eixo (Alemanha, Itália, Japão) e os Aliados (EUA, URSS, Reino Unido, França).</p>
                    
                    <h4>Causas principais</h4>
                    <ul>
                        <li>Tratado de Versalhes (1919)</li>
                        <li>Ascensão do nazismo na Alemanha</li>
                        <li>Expansionismo japonês e italiano</li>
                        <li>Fracasso da Liga das Nações</li>
                    </ul>
                    
                    <h4>Principais eventos</h4>
                    <ol>
                        <li>Invasão da Polônia (1939)</li>
                        <li>Batalha da Inglaterra (1940)</li>
                        <li>Ataque a Pearl Harbor (1941)</li>
                        <li>Batalha de Stalingrado (1942-1943)</li>
                        <li>Dia D (1944)</li>
                        <li>Bombardeios de Hiroshima e Nagasaki (1945)</li>
                    </ol>
                    
                    <h4>Consequências</h4>
                    <ul>
                        <li>Criação da ONU</li>
                        <li>Guerra Fria</li>
                        <li>Descolonização da Ásia e África</li>
                        <li>Divisão da Alemanha</li>
                    </ul>
                    
                    <h4>Atividades</h4>
                    <ol>
                        <li>Compare as causas da 1ª e 2ª Guerras Mundiais.</li>
                        <li>Pesquise sobre o papel do Brasil na Segunda Guerra.</li>
                        <li>Debata: O uso de bombas atômicas foi justificado?</li>
                    </ol>
                `
            }
        }
    };
    
    // Função para gerar aula - CORRIGIDA
    function generateLesson(topic, subject) {
        // Simular tempo de carregamento
        setTimeout(() => {
            loader.classList.add('hidden');
            
            // Normalizar o tópico para minúsculas para comparação
            const normalizedTopic = topic.toLowerCase();
            
            // Verificar se temos dados para o tópico e matéria
            if (subject && sampleLessons[subject] && sampleLessons[subject][normalizedTopic]) {
                // Caso tenha conteúdo específico
                const lesson = sampleLessons[subject][normalizedTopic];
                lessonTitle.textContent = lesson.title;
                lessonMaterials.innerHTML = lesson.content;
            } else if (subject && sampleLessons[subject]) {
                // Caso tenha a matéria mas não o tópico específico
                const firstLessonKey = Object.keys(sampleLessons[subject])[0];
                const lesson = sampleLessons[subject][firstLessonKey];
                lessonTitle.textContent = `Aula sobre ${topic} (${getSubjectName(subject)})`;
                lessonMaterials.innerHTML = `
                    <p>Não temos uma aula específica sobre "${topic}" em ${getSubjectName(subject)}, mas aqui está um material relacionado:</p>
                    ${lesson.content}
                    <h4>Atividades sobre ${topic}</h4>
                    <ol>
                        <li>Pesquise em seu livro didático sobre ${topic}.</li>
                        <li>Faça um resumo com os principais conceitos.</li>
                        <li>Discuta com colegas como ${topic} se relaciona com ${lesson.title}.</li>
                    </ol>
                `;
            } else {
                // Caso genérico (sem matéria específica ou tópico desconhecido)
                lessonTitle.textContent = `Aula sobre ${topic}`;
                lessonMaterials.innerHTML = `
                    <h4>Introdução</h4>
                    <p>Este é um material gerado automaticamente sobre o tema "${topic}".</p>
                    
                    <h4>Conceitos Básicos</h4>
                    <p>${topic} é um tópico importante que aborda...</p>
                    
                    <h4>Exemplos</h4>
                    <ul>
                        <li>Exemplo 1 relacionado a ${topic}</li>
                        <li>Exemplo 2 relacionado a ${topic}</li>
                        <li>Exemplo 3 relacionado a ${topic}</li>
                    </ul>
                    
                    <h4>Exercícios</h4>
                    <ol>
                        <li>Pesquise mais sobre ${topic} e faça um resumo.</li>
                        <li>Resolva problemas práticos envolvendo ${topic}.</li>
                        <li>Discuta com colegas as aplicações de ${topic} no cotidiano.</li>
                    </ol>
                    
                    <p><em>Observação: Este conteúdo foi gerado automaticamente. Para materiais mais completos, consulte seu livro didático ou outras fontes confiáveis.</em></p>
                `;
            }
            
            lessonContent.classList.remove('hidden');
        }, 1500);
    }
    
    // Função auxiliar para obter nome completo da matéria
    function getSubjectName(subject) {
        const subjects = {
            "matematica": "Matemática",
            "portugues": "Português",
            "historia": "História",
            "geografia": "Geografia",
            "ciencias": "Ciências",
            "fisica": "Física",
            "quimica": "Química",
            "biologia": "Biologia",
            "ingles": "Inglês",
            "filosofia": "Filosofia",
            "sociologia": "Sociologia"
        };
        return subjects[subject] || "esta matéria";
    }
    
    // Event Listeners
    searchBtn.addEventListener('click', function() {
        const topic = topicInput.value.trim();
        const subject = subjectSelect.value;
        
        if (topic === '') {
            alert('Por favor, digite um tópico para pesquisar.');
            return;
        }
        
        // Mostrar seção de resultados e loader
        resultsSection.classList.remove('hidden');
        loader.classList.remove('hidden');
        lessonContent.classList.add('hidden');
        
        // Rolagem suave para os resultados
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Gerar a aula
        generateLesson(topic, subject);
    });
    
    saveBtn.addEventListener('click', function() {
        alert('Aula salva com sucesso! (Em uma implementação real, isso salvaria no localStorage ou em um banco de dados)');
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    newSearchBtn.addEventListener('click', function() {
        lessonContent.classList.add('hidden');
        topicInput.value = '';
        subjectSelect.value = '';
        topicInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Permitir pesquisa com Enter
    topicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});
