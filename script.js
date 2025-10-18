document.addEventListener('DOMContentLoaded', () => {
    const scheduleData = [
        // 1ª SEMANA
        { dia: "DOMINGO 05/10", leitura: "SALMOS 19:7-11" },
        { dia: "SEGUNDA 06/10", leitura: "JOÃO 6:66-69" },
        { dia: "TERÇA 07/10", leitura: "JOSUÉ 1:7-9" },
        { dia: "QUARTA 08/10", leitura: "2 TIMÓTEO 3:14-17" },
        { dia: "QUINTA 09/10", leitura: "SALMOS 119:97-104" },
        { dia: "SEXTA 10/10", leitura: "SALMOS 119:105-112" },
        { dia: "SÁBADO 11/10", leitura: "MATEUS 7:24-27" },

        // 2ª SEMANA
        { dia: "DOMINGO 12/10", leitura: "HEBREUS 4:11-13" },
        { dia: "SEGUNDA 13/10", leitura: "SALMOS 1:1-3" },
        { dia: "TERÇA 14/10", leitura: "TIAGO 1:21-25" },
        { dia: "QUARTA 15/10", leitura: "ISAÍAS 55:8-11" },
        { dia: "QUINTA 16/10", leitura: "1 PEDRO 1:22-25" },
        { dia: "SEXTA 17/10", leitura: "SALMOS 33:4-6" },
        { dia: "SÁBADO 18/10", leitura: "JOÃO 14:23-27" },

        // 3ª SEMANA
        { dia: "DOMINGO 19/10", leitura: "DEUTERONÔMIO 8:1-3" },
        { dia: "SEGUNDA 20/10", leitura: "JOÃO 8:31-36" },
        { dia: "TERÇA 21/10", leitura: "SALMOS 12:6-7" },
        { dia: "QUARTA 22/10", leitura: "ATOS 17:10-12" },
        { dia: "QUINTA 23/10", leitura: "2 SAMUEL 22:29-33" },
        { dia: "SEXTA 24/10", leitura: "APOCALIPSE 1:1-3" },
        { dia: "SÁBADO 25/10", leitura: "SALMOS 34:4-8" },

        // 4ª SEMANA
        { dia: "DOMINGO 26/10", leitura: "PROVÉRBIOS 30:5-6" },
        { dia: "SEGUNDA 27/10", leitura: "1 TS 2:11-13" },
        { dia: "TERÇA 28/10", leitura: "SALMOS 37:3-6" },
        { dia: "QUARTA 29/10", leitura: "JOÃO 17:14-19" },
        { dia: "QUINTA 30/10", leitura: "ISAÍAS 40:6-8" },
        { dia: "SEXTA 31/10", leitura: "FILIPENSES 2:14-16" },
        { dia: "SÁBADO 01/11", leitura: "SALMOS 119:25-32" }
    ];

    const container = document.querySelector('.schedule-container');
    const resetButton = document.getElementById('resetButton');
    const checkedReadings = JSON.parse(localStorage.getItem('checkedReadings')) || {};

    /**
     * Função para renderizar as semanas e dias
     */
    function renderSchedule() {
        container.innerHTML = '';
        const weeks = [1, 2, 3, 4];

        weeks.forEach(weekIndex => {
            const weekElement = document.createElement('div');
            weekElement.className = 'week';

            const title = document.createElement('div');
            title.className = 'week-title';
            title.textContent = `${weekIndex}ª SEMANA`;
            weekElement.appendChild(title);

            // Calcula o índice inicial e final para esta semana (7 dias por semana)
            const startIndex = (weekIndex - 1) * 7;
            const weekDays = scheduleData.slice(startIndex, startIndex + 7);

            weekDays.forEach((item, dayIndex) => {
                const globalIndex = startIndex + dayIndex;
                const itemId = `day-${globalIndex}`; // ID único para cada item

                const dayItem = document.createElement('div');
                dayItem.className = 'day-item';
                dayItem.dataset.id = itemId;

                const checkbox = document.createElement('div');
                checkbox.className = 'checkbox';
                checkbox.dataset.id = itemId;

                const dayInfo = document.createElement('div');
                dayInfo.className = 'day-info';
                
                const dayStrong = document.createElement('strong');
                dayStrong.textContent = item.dia;
                
                const readingSpan = document.createElement('span');
                readingSpan.textContent = item.leitura;
                
                // Criando o botão "VER" para abrir o versículo
                const verButton = document.createElement('button');
                verButton.textContent = 'VER';
                verButton.className = 'ver-button';
                verButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evita que o evento de clique propague para o dayItem
                    const versiculo = item.leitura;
                    
                    // Mapeamento correto dos nomes dos livros
                    const livrosMap = {
                        'JOÃO': 'jo',
                        'JOSUÉ': 'js',
                        'TIMÓTEO': 'tm',
                        'DEUTERONÔMIO': 'dt',
                        'ISAÍAS': 'is',
                        'SALMOS': 'sl',
                        'MATEUS': 'mt',
                        'HEBREUS': 'hb',
                        'TIAGO': 'tg',
                        'PEDRO': 'pe',
                        'APOCALIPSE': 'ap',
                        'SAMUEL': 'sm',
                        'PROVÉRBIOS': 'pv',
                        'TS': 'ts',
                        'FILIPENSES': 'fp',
                        'ATOS': 'atos'
                    };
                    
                    // Extrair o livro e o capítulo/versículo
                    const partes = versiculo.split(' ');
                    let livro = partes[0];
                    
                    // Verificar se há número antes do livro (ex: 1 PEDRO, 2 TIMÓTEO)
                    let numeroLivro = '';
                    if (!isNaN(parseInt(livro))) {
                        numeroLivro = livro;
                        livro = partes[1];
                        
                        // Remover os dois primeiros elementos (número e nome do livro)
                        partes.splice(0, 2);
                    } else {
                        // Remover apenas o primeiro elemento (nome do livro)
                        partes.splice(0, 1);
                    }
                    
                    // Encontrar o código correto do livro
                    let codigoLivro = '';
                    for (const [nome, codigo] of Object.entries(livrosMap)) {
                        if (livro.includes(nome)) {
                            codigoLivro = numeroLivro + codigo;
                            break;
                        }
                    }
                    
                    // Se não encontrou o código, usar o nome original
                    if (!codigoLivro) {
                        codigoLivro = numeroLivro ? numeroLivro + livro.toLowerCase() : livro.toLowerCase();
                    }
                    
                    // Juntar o restante para formar o capítulo e versículo
                    const capituloVersiculo = partes.join('');
                    
                    // Construir a URL final
                    const url = `https://www.bibliaonline.com.br/acf/${codigoLivro}/${capituloVersiculo}`;
                    
                    // Abrir em nova aba
                    window.open(url, '_blank');
                });

                dayInfo.appendChild(dayStrong);
                dayInfo.appendChild(readingSpan);
                
                // Adicionando os elementos na ordem: botão VER, checkbox, dayInfo
                dayItem.appendChild(verButton);
                dayItem.appendChild(checkbox);
                dayItem.appendChild(dayInfo);
                weekElement.appendChild(dayItem);

                // Aplica a marcação se estiver salva
                if (checkedReadings[itemId]) {
                    checkbox.classList.add('checked');
                }

                // Adiciona o evento de clique
                dayItem.addEventListener('click', toggleCheck);
            });

            container.appendChild(weekElement);
        });
    }

    /**
     * Função para marcar/desmarcar o item
     * @param {Event} event 
     */
    function toggleCheck(event) {
        // Encontra o checkbox e o ID
        const item = event.currentTarget;
        const itemId = item.dataset.id;
        const checkbox = item.querySelector('.checkbox');

        // Alterna a classe e o estado no objeto
        checkbox.classList.toggle('checked');
        checkedReadings[itemId] = checkbox.classList.contains('checked');

        // Salva no localStorage
        localStorage.setItem('checkedReadings', JSON.stringify(checkedReadings));
    }

    /**
     * Função para resetar todas as marcações
     */
    function resetReadings() {
        if (confirm("Tem certeza que deseja limpar TODAS as marcações de leitura? Esta ação não pode ser desfeita.")) {
            // Limpa o objeto e o localStorage
            for (const key in checkedReadings) {
                delete checkedReadings[key];
            }
            localStorage.removeItem('checkedReadings');
            
            // Remove a classe de todos os checkboxes na tela
            document.querySelectorAll('.checkbox').forEach(box => {
                box.classList.remove('checked');
            });

            alert("Marcações resetadas com sucesso!");
        }
    }

    // Inicializa a renderização e o botão de reset
    renderSchedule();
    resetButton.addEventListener('click', resetReadings);
});