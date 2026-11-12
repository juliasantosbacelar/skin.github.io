// Busca o botão que abre e fecha o menu em telas menores.
const menuToggle = document.querySelector(".menu-toggle");
// Busca a navegação principal do site.
const primaryNavigation = document.querySelector("#primary-navigation");
// Busca o botão que abre e fecha o campo de busca.
const searchButton = document.querySelector(".search-button");
// Busca o formulário de busca para controlar sua aparência.
const searchForm = document.querySelector(".search-form");
// Busca o campo onde a pessoa digita os termos de pesquisa.
const searchInput = document.querySelector("#site-search");
// Busca o botão que alterna entre os temas claro e escuro.
const themeToggle = document.querySelector(".theme-toggle");
// Busca o carrossel que contém os cards de produtos.
const productCarousel = document.querySelector(".product-carousel");
// Busca o botão que move o carrossel para os produtos anteriores.
const previousButton = document.querySelector(".carousel-previous");
// Busca o botão que move o carrossel para os próximos produtos.
const nextButton = document.querySelector(".carousel-next");

// Só configura o menu se o botão e a navegação existirem na página.
if (menuToggle && primaryNavigation) {
    // Executa esta função quando a pessoa clica no botão do menu.
    menuToggle.addEventListener("click", () => {
        // Verifica se o menu está marcado como aberto.
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        // Atualiza o estado acessível do botão para o estado oposto.
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        // Atualiza o texto acessível para indicar a ação disponível.
        menuToggle.querySelector(".visually-hidden").textContent = isExpanded
            // Mostra esta instrução quando o menu acabou de ser fechado.
            ? "Abrir menu"
            // Mostra esta instrução quando o menu acabou de ser aberto.
            : "Fechar menu";
        // Adiciona ou remove a classe que exibe o menu.
        primaryNavigation.classList.toggle("is-open", !isExpanded);
    });

    // Executa esta função quando um link da navegação é clicado.
    primaryNavigation.addEventListener("click", (event) => {
        // Confirma que o elemento clicado é um link HTML.
        if (event.target instanceof HTMLAnchorElement) {
            // Marca o botão como fechado para tecnologias assistivas.
            menuToggle.setAttribute("aria-expanded", "false");
            // Atualiza o texto acessível do botão para indicar que pode abrir o menu.
            menuToggle.querySelector(".visually-hidden").textContent = "Abrir menu";
            // Fecha visualmente a navegação removendo sua classe de abertura.
            primaryNavigation.classList.remove("is-open");
        }
    });

    // Observa pressionamentos de tecla na página para permitir fechar o menu com Escape.
    document.addEventListener("keydown", (event) => {
        // Só fecha o menu se Escape for pressionado enquanto ele estiver aberto.
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            // Marca o botão como fechado para tecnologias assistivas.
            menuToggle.setAttribute("aria-expanded", "false");
            // Atualiza o texto acessível do botão para indicar que pode abrir o menu.
            menuToggle.querySelector(".visually-hidden").textContent = "Abrir menu";
            // Esconde o menu removendo a classe que o mantém aberto.
            primaryNavigation.classList.remove("is-open");
            // Devolve o foco ao botão do menu para facilitar a navegação por teclado.
            menuToggle.focus();
        }
    });
}

// Só configura a busca quando botão, formulário e campo estão presentes.
if (searchButton && searchForm && searchInput) {
    // Executa esta função quando a pessoa clica no botão de busca.
    searchButton.addEventListener("click", () => {
        // Verifica se o formulário de busca está aberto.
        const isExpanded = searchButton.getAttribute("aria-expanded") === "true";
        // Atualiza o estado acessível do botão para o estado oposto.
        searchButton.setAttribute("aria-expanded", String(!isExpanded));
        // Atualiza o nome acessível conforme a ação que o botão fará.
        searchButton.setAttribute("aria-label", isExpanded ? "Abrir busca" : "Fechar busca");
        // Abre ou fecha visualmente o campo de busca.
        searchForm.classList.toggle("is-open", !isExpanded);

        // Verifica se a busca acabou de ser aberta.
        if (!isExpanded) {
            // Coloca o cursor no campo para permitir digitar imediatamente.
            searchInput.focus();
        // Executa este bloco quando a busca acabou de ser fechada.
        } else {
            // Apaga o texto da busca ao fechar o formulário.
            searchInput.value = "";
        }
    });

    // Observa Escape para permitir fechar a busca pelo teclado.
    document.addEventListener("keydown", (event) => {
        // Só fecha a busca se Escape for pressionado enquanto ela estiver aberta.
        if (event.key === "Escape" && searchButton.getAttribute("aria-expanded") === "true") {
            // Marca o botão como fechado para tecnologias assistivas.
            searchButton.setAttribute("aria-expanded", "false");
            // Atualiza o nome acessível do botão para indicar que abre a busca.
            searchButton.setAttribute("aria-label", "Abrir busca");
            // Fecha visualmente o formulário removendo sua classe de abertura.
            searchForm.classList.remove("is-open");
            // Apaga qualquer texto digitado no campo.
            searchInput.value = "";
            // Devolve o foco ao botão que abre a busca.
            searchButton.focus();
        }
    });
}

// Só configura a troca de tema se o botão correspondente existir.
if (themeToggle) {
    // Executa esta função quando a pessoa clica no botão de tema.
    themeToggle.addEventListener("click", () => {
        // Verifica se o tema escuro está ativo.
        const isDark = themeToggle.getAttribute("aria-pressed") === "true";
        // Atualiza o estado acessível do botão para indicar o novo tema.
        themeToggle.setAttribute("aria-pressed", String(!isDark));
        // Atualiza o nome acessível para indicar qual tema pode ser ativado.
        themeToggle.setAttribute("aria-label", isDark ? "Ativar tema escuro" : "Ativar tema claro");
        // Adiciona ou remove a classe responsável pelos estilos do tema escuro.
        document.body.classList.toggle("dark-theme", !isDark);
    });
}

// Só configura o carrossel se seus elementos e os dois controles existirem.
if (productCarousel && previousButton && nextButton) {
    // Define uma função para atualizar o estado dos botões do carrossel.
    const updateCarouselControls = () => {
        // Calcula o quanto o carrossel pode rolar horizontalmente.
        const maxScroll = productCarousel.scrollWidth - productCarousel.clientWidth;
        // Desativa o botão anterior quando o carrossel está no início.
        previousButton.disabled = productCarousel.scrollLeft <= 1;
        // Desativa o botão seguinte quando o carrossel está no final.
        nextButton.disabled = maxScroll - productCarousel.scrollLeft <= 1;
    };

    // Define uma função que desloca o carrossel em uma direção.
    const scrollCarousel = (direction) => {
        // Busca o primeiro card para saber quanto deve avançar o carrossel.
        const firstCard = productCarousel.querySelector(".product-card");
        // Interrompe a função se não houver cards no carrossel.
        if (!firstCard) {
            return;
        }

        // Lê os estilos atuais do carrossel calculados pelo navegador.
        const styles = getComputedStyle(productCarousel);
        // Converte o espaço entre cards em número; usa zero se não houver valor válido.
        const gap = Number.parseFloat(styles.columnGap) || 0;
        // Desloca o carrossel pela largura de um card mais o espaço entre cards.
        productCarousel.scrollBy({
            // Multiplica o deslocamento pela direção: -1 volta e 1 avança.
            left: direction * (firstCard.getBoundingClientRect().width + gap),
            // Faz o deslocamento com animação suave.
            behavior: "smooth",
        });
    };

    // Move o carrossel para a esquerda ao clicar no botão de produtos anteriores.
    previousButton.addEventListener("click", () => scrollCarousel(-1));
    // Move o carrossel para a direita ao clicar no botão de próximos produtos.
    nextButton.addEventListener("click", () => scrollCarousel(1));
    // Atualiza os controles durante a rolagem sem bloquear a interação.
    productCarousel.addEventListener("scroll", updateCarouselControls, { passive: true });
    // Recalcula os controles quando o tamanho da janela muda.
    window.addEventListener("resize", updateCarouselControls);
    // Define o estado inicial dos botões assim que o script é carregado.
    updateCarouselControls();
}
