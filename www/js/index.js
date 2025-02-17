

window.onload = generateSummary;

function generateSummary() {
    const summaryHtml = document.getElementById("summary");
    const contentHtml = document.getElementById("main_content");

    const summary = {};

    for (const section of contentHtml.getElementsByTagName("section")) {
        const section_title = section.getElementsByClassName("section_title")[0];
        summary[section_title.textContent] = {};
    }

    console.log(summary);
    for (const section of Object.keys(summary)) {
        summaryHtml.insertAdjacentHTML("beforeend", `<li><a href="#${section}">${section}</a></li>\n`);
    }
}
