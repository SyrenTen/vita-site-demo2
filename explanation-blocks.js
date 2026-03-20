const explainData = {
    logseq: {
        title: "Logseq",
        image: "img/logseq-preview.png",   // change path
        text: `
            <p>Logseq is a knowledge management and note-taking system based on local-first markdown graphs.</p>
            <p>I use Logseq as my second brain for research, AI experiments, learning notes, and project architecture tracking.</p>
        `,
        site: "https://logseq.com",
        project: "https://github.com/yourproject"
    },

    // ADD MORE EXPLANATIONS HERE
};

document.querySelectorAll(".explain-trigger").forEach(el => {
    el.addEventListener("click", () => {
        const key = el.dataset.explain;
        openExplain(key);
    });
});

function openExplain(key) {
    const data = explainData[key];
    if (!data) return;

    document.getElementById("explainTitle").innerText = data.title;
    document.getElementById("explainImage").src = data.image;
    document.getElementById("explainText").innerHTML = data.text;
    document.getElementById("explainSite").href = data.site;
    document.getElementById("explainProject").href = data.project;

    document.getElementById("explainOverlay").style.display = "flex";
}

function closeExplain() {
    document.getElementById("explainOverlay").style.display = "none";
}


