
window.onload = generateContent;

function getParameter(key) { 
    return new URLSearchParams(window.location.search).get(key); 
}

async function getArticle(id) {
    try {
        const response = await fetch("/assets/json/articles.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        if (!json.articles) {
            throw new Error("Error: no articles in response");
        }
        return json.articles[id];
        
    } catch (error) {
        console.error(error.message);
    }
}

async function generateContent() {
    const summaryHtml = document.getElementById("summary");
    const contentHtml = document.getElementById("main_content");

    const article = await getArticle(getParameter("article"));
    console.log(article)
    if (article==null) window.location.replace("/404");
    document.title = article.title;
    for (const section of article.sections) {
        let content;
        if (section.content instanceof Array) {
            content = "";
            for (const elem of section.content) content += elem;
        } else {
            content = section.content;
        }
        contentHtml.insertAdjacentHTML("beforeend", `<section class='article_section'><h2 class="section_title" id="${section.title}">${section.title}</h2>${content}</section>`);

        summaryHtml.insertAdjacentHTML("beforeend", `<li><a href="#${section.title}">${section.title}</a></li>\n`);
    }

    /*const summary = {};

    for (const section of contentHtml.getElementsByTagName("section")) {
        const section_title = section.getElementsByClassName("section_title")[0];
        summary[section_title.textContent] = {};
    }

    console.log(summary);
    for (const section of Object.keys(summary)) {
        summaryHtml.insertAdjacentHTML("beforeend", `<li><a href="#${section}">${section}</a></li>\n`);
    }*/
}
