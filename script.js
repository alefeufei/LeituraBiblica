// Versão do código - aumente este número quando fizer alterações
const CODE_VERSION = "1.0.3";

document.addEventListener("DOMContentLoaded", () => {
  const scheduleData = [
    // PRIMEIRA SEMANA
    { dia: "DOM 02/11", leitura: "1 CORÍNTIOS 9:16-22" },
    { dia: "SEG 03/11", leitura: "1 CORÍNTIOS 9:23-27" },
    { dia: "TER 04/11", leitura: "JEREMIAS 1:4-10" },
    { dia: "QUA 05/11", leitura: "MARCOS 16:15-18" },
    { dia: "QUI 06/11", leitura: "SALMOS 96:1-9" },
    { dia: "SEX 07/11", leitura: "ROMANOS 10:13-17" },
    { dia: "SÁB 08/11", leitura: "ISAÍAS 52:7-10" },

    // SEGUNDA SEMANA
    { dia: "DOM 09/11", leitura: "ATOS 1:6-9" },
    { dia: "SEG 10/11", leitura: "PROVÉRBIOS 11:30-31" },
    { dia: "TER 11/11", leitura: "2 TIMÓTEO 4:1-5" },
    { dia: "QUA 12/11", leitura: "ATOS 20:19-24" },
    { dia: "QUI 13/11", leitura: "JOÃO 3:27-36" },
    { dia: "SEX 14/11", leitura: "LUCAS 10:1-7" },
    { dia: "SÁB 15/11", leitura: "LUCAS 10:8-16" },

    // TERCEIRA SEMANA
    { dia: "DOM 16/11", leitura: "LUCAS 10:17-22" },
    { dia: "SEG 17/11", leitura: "MATEUS 9:35-38" },
    { dia: "TER 18/11", leitura: "ISAÍAS 61:1-4" },
    { dia: "QUA 19/11", leitura: "JONAS 3:1-5" },
    { dia: "QUI 20/11", leitura: "JEREMIAS 20:7-11" },
    { dia: "SEX 21/11", leitura: "ISAÍAS 6:6-8" },
    { dia: "SÁB 22/11", leitura: "SALMOS 40:9-17" },

    // QUARTA SEMANA :)
    { dia: "DOM 23/11", leitura: "ISAÍAS 55:10-13" },
    { dia: "SEG 24/11", leitura: "MATEUS 10:7-10" },
    { dia: "TER 25/11", leitura: "LUCAS 4:40-44" },
    { dia: "QUA 26/11", leitura: "2 CORÍNTIOS 12:10-15" },
    { dia: "QUI 27/11", leitura: "2 CRÔNICAS 15:7-9" },
    { dia: "SEX 28/11", leitura: "2 CORÍNTIOS 5:17-21" },
    { dia: "SÁB 29/11", leitura: "FILIPENSES 1:12-21" },

    // QUINTA SEMANA
    { dia: "DOM 30/11", leitura: "FILIPENSES 2:3-11" },
    { dia: "SEG 01/12", leitura: "FILIPENSES 2:12-17" },
    { dia: "TER 02/12", leitura: "MARCOS 1:17-27" },
    { dia: "QUA 03/12", leitura: "ATOS 8:4-8" },
    { dia: "QUI 04/12", leitura: "JOÃO 20:19-23" },
    { dia: "SEX 05/12", leitura: "MATEUS 28:16-20" },
    { dia: "SÁB 06/12", leitura: "1 PEDRO 3:11-17" },
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
      { title: "PRIMEIRA SEMANA", start: 0 },
      { title: "SEGUNDA SEMANA", start: 7 },
      { title: "TERCEIRA SEMANA", start: 14 },
      { title: "QUARTA SEMANA", start: 21 },
      { title: "QUINTA SEMANA", start: 28 },
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