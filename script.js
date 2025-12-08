// Versão do código - aumente este número quando fizer alterações
const CODE_VERSION = "2.0.0";

document.addEventListener("DOMContentLoaded", () => {
  const scheduleData = [
    // PRIMEIRA SEMANA
    { dia: "DOM 07/12", leitura: "MATEUS 26:36-39" },
    { dia: "SEG 08/12", leitura: "MATEUS 26:40-46" },
    { dia: "TER 09/12", leitura: "AGEU 1:4-8" },
    { dia: "QUA 10/12", leitura: "JOÃO 15:5-8" },
    { dia: "QUI 11/12", leitura: "JEREMIAS 17:5-10" },
    { dia: "SEX 12/12", leitura: "1 CORÍNTIOS 3:9-13" },
    { dia: "SÁB 13/12", leitura: "1 CORÍNTIOS 3:14-19" },

    // SEGUNDA SEMANA
    { dia: "DOM 14/12", leitura: "APOCALIPSE 2:2-5" },
    { dia: "SEG 15/12", leitura: "PROVÉRBIOS 4:23-27" },
    { dia: "TER 16/12", leitura: "2 TIMÓTEO 4:1-5" },
    { dia: "QUA 17/12", leitura: "ISAÍAS 29:13-16" },
    { dia: "QUI 18/12", leitura: "TIAGO 1:5-12" },
    { dia: "SEX 19/12", leitura: "SALMOS 51:5-13" },
    { dia: "SÁB 20/12", leitura: "ROMANOS 12:9-18" },

    // TERCEIRA SEMANA
    { dia: "DOM 21/12", leitura: "EZEQUIEL 36:25-31" },
    { dia: "SEG 22/12", leitura: "LUCAS 23:44-49" },
    { dia: "TER 23/12", leitura: "SALMOS 139:1-8" },
    { dia: "QUA 24/12", leitura: "GÁLATAS 5:16-23" },
    { dia: "QUI 25/12", leitura: "2 CRÔNICAS 15:1-7" },
    { dia: "SEX 26/12", leitura: "1 JOÃO 5:1-5" },
    { dia: "SÁB 27/12", leitura: "TIAGO 4:7-10" },

    // QUARTA SEMANA
    { dia: "DOM 28/12", leitura: "FILIPENSES 2:3-11" },
    { dia: "SEG 29/12", leitura: "SALMOS 119:9-16" },
    { dia: "TER 30/12", leitura: "COLOSSENSES 3:1-7" },
    { dia: "QUA 31/12", leitura: "ISAÍAS 5:16-20" },
    { dia: "QUI 01/01", leitura: "EFÉSIOS 4:10-14" },
    { dia: "SEX 02/01", leitura: "EFÉSIOS 4:15-24" },
    { dia: "SÁB 03/01", leitura: "EFÉSIOS 4:25-32" },
  ];

  const container = document.querySelector(".schedule-container");
  const resetButton = document.getElementById("resetButton");

  // Verificar versão e limpar dados antigos se necessário
  const storedVersion = localStorage.getItem("codeVersion");
  if (storedVersion !== CODE_VERSION) {
    console.log(
      "Nova versão detectada. Atualizando de",
      storedVersion,
      "para",
      CODE_VERSION
    );
    localStorage.setItem("codeVersion", CODE_VERSION);
    // Mantém as leituras marcadas mesmo com nova versão
  }

  // Carrega as leituras marcadas do localStorage
  let checkedReadings =
    JSON.parse(localStorage.getItem("checkedReadings")) || {};

  /**
   * Função para renderizar as semanas e dias
   */
  function renderSchedule() {
    container.innerHTML = "";
    const weeks = [
      { title: "1.ª SEMANA", start: 0 },
      { title: "2.ª SEMANA", start: 7 },
      { title: "3.ª SEMANA", start: 14 },
      { title: "4.ª SEMANA", start: 21 },
    ];

    weeks.forEach((week) => {
      const weekElement = document.createElement("div");
      weekElement.className = "week";

      const title = document.createElement("div");
      title.className = "week-title";
      title.textContent = week.title;
      weekElement.appendChild(title);

      const weekDays = scheduleData.slice(week.start, week.start + 7);

      weekDays.forEach((item, dayIndex) => {
        const globalIndex = week.start + dayIndex;
        const itemId = `day-${globalIndex}`;

        const dayItem = document.createElement("div");
        dayItem.className = "day-item";
        dayItem.dataset.id = itemId;

        const checkbox = document.createElement("div");
        checkbox.className = "checkbox";
        checkbox.dataset.id = itemId;

        const dayInfo = document.createElement("div");
        dayInfo.className = "day-info";

        const dayStrong = document.createElement("strong");
        dayStrong.textContent = item.dia;

        const readingSpan = document.createElement("span");
        readingSpan.textContent = item.leitura;

        const verButton = document.createElement("button");
        verButton.textContent = "VER";
        verButton.className = "ver-button";
        verButton.addEventListener("click", (e) => {
          e.stopPropagation();
          const url = generateBibleUrl(item.leitura);
          window.open(url, "_blank");
        });

        dayInfo.appendChild(dayStrong);
        dayInfo.appendChild(readingSpan);

        dayItem.appendChild(verButton);
        dayItem.appendChild(checkbox);
        dayItem.appendChild(dayInfo);
        weekElement.appendChild(dayItem);

        if (checkedReadings[itemId]) {
          checkbox.classList.add("checked");
        }

        dayItem.addEventListener("click", toggleCheck);
      });

      container.appendChild(weekElement);
    });
  }

  /**
   * Função para gerar a URL da Bíblia Online
   */
  function generateBibleUrl(versiculo) {
    const livrosMap = {
      CORÍNTIOS: "co",
      JEREMIAS: "jr",
      MARCOS: "mc",
      SALMOS: "sl",
      ROMANOS: "rm",
      ISAÍAS: "is",
      ATOS: "at",
      PROVÉRBIOS: "pv",
      TIMÓTEO: "tm",
      JOÃO: "jo",
      LUCAS: "lc",
      MATEUS: "mt",
      JONAS: "jn",
      CRÔNICAS: "cr",
      FILIPENSES: "fp",
      PEDRO: "pe",
      AGEU: "ag",
      APOCALIPSE: "ap",
      TIAGO: "tg",
      EZEQUIEL: "ez",
      GÁLATAS: "gl",
      COLOSSENSES: "cl",
      EFÉSIOS: "ef",
    };

    const partes = versiculo.split(" ");
    let numeroLivro = "";
    let livro = partes[0];
    let offset = 1;

    if (!isNaN(parseInt(livro))) {
      numeroLivro = livro;
      livro = partes[1];
      offset = 2;
    }

    let codigoLivro = "";
    for (const [nome, codigo] of Object.entries(livrosMap)) {
      if (livro.includes(nome)) {
        codigoLivro = numeroLivro + codigo;
        break;
      }
    }

    if (!codigoLivro) {
      codigoLivro = numeroLivro
        ? numeroLivro + livro.toLowerCase()
        : livro.toLowerCase();
    }

    const capituloVersiculo = partes.slice(offset).join("").toLowerCase();

    return `https://www.bibliaonline.com.br/nvi/${codigoLivro}/${capituloVersiculo}`;
  }

  /**
   * Função para marcar/desmarcar o item
   */
  function toggleCheck(event) {
    const item = event.currentTarget;
    const itemId = item.dataset.id;
    const checkbox = item.querySelector(".checkbox");

    checkbox.classList.toggle("checked");

    // Atualiza o estado
    if (checkbox.classList.contains("checked")) {
      checkedReadings[itemId] = true;
    } else {
      delete checkedReadings[itemId];
    }

    // Salva no localStorage
    localStorage.setItem("checkedReadings", JSON.stringify(checkedReadings));
    console.log("Salvando:", itemId, checkedReadings); // Debug
  }

  /**
   * Função para resetar todas as marcações
   */
  function resetReadings() {
    if (
      confirm(
        "Tem certeza que deseja limpar TODAS as marcações de leitura? Esta ação não pode ser desfeita."
      )
    ) {
      // Limpa o objeto e o localStorage
      for (const key in checkedReadings) {
        delete checkedReadings[key];
      }
      localStorage.removeItem("checkedReadings");

      document.querySelectorAll(".checkbox").forEach((box) => {
        box.classList.remove("checked");
      });

      alert("Marcações resetadas com sucesso!");
    }
  }

  renderSchedule();
  resetButton.addEventListener("click", resetReadings);
});
