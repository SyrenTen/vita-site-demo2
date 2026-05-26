const explainData = {
    logseq: {
        title: "Logseq",
        image: "images\\images-explanation\\logseqlogo.png",   // change path
        text: `
            <p>Logseq is a knowledge management and note-taking system based on local-first markdown graphs.</p>
            <p>I use Logseq as my second brain for research, AI experiments, learning notes, and project architecture tracking.</p>
        `,
        site: "https://logseq.com/",
    },

    python: {
        title: "Python",
        image: "images\\images-explanation\\python_logo.jfif",   // change path
        text: `
            <p>Python is a programming language that lets you work quickly and integrate systems more effectively</p>
            <p>I use Python a lot for my personal projects and during self-learning, as well as during my studies.</p>
        `,
        site: "https://www.python.org/",
    },

    cplus: {
        title: "C++",
        image: "images\\images-explanation\\cplus_logo.png",   // change path
        text: `
            <p>C++ is a high-level, general-purpose programming language. C++ was designed with systems programming and embedded, resource-constrained software and large systems in mind, with performance, efficiency, and flexibility of use as its design highlights.</p>
            <p>I use C++ during my studies and intership, and rarely in the personal projects, although im planning to expend my knowledge of it.</p>
        `,
        site: "https://en.wikipedia.org/wiki/C%2B%2B",
    },

    qt: {
        title: "Qt",
        image: "images\\images-explanation\\qt_logo.png",   // change path
        text: `
            <p>Qt is a cross-platform application development framework for creating graphical user interfaces as well as cross-platform applications that run on various software and hardware platforms.</p>
            <p>I used Qt with C++ for some projects during my studies in the Khpi (Kharkiv Univerisy)</p>
        `,
        site: "https://code.qt.io/cgit/qt/qtbase.git/",
    },

    arduino: {
        title: "Arduino",
        image: "images\\images-explanation\\Arduino_Logo_Registered.svg.png",   // change path
        text: `
            <p>Arduino is an open-source hardware and software company, as well as a project and user community that designs and manufactures single-board microcontrollers and microcontroller kits for building digital and other kinds of devices. </p>
            <p>Arduino programming language can be divided in three main parts: functions, values (variables and constants), and structure. ? Arduino uses a variant of the C++ programming language. The code is written in C++ with an addition of special methods and functions.</p>
            <p>I use Arduino boards for my personal projects and during studies in universities, using in in KAH project and Robot SUMO for example. Using Arduino IDE for programming the boards.</p>
        `,
        site: "https://www.arduino.cc/",
    },

    blender: {
        title: "Blender",
        image: "images\\images-explanation\\blender_logo.png",   // change path
        text: `
            <p>Blender is a public project hosted on blender.org, licensed as GNU GPL, owned by its contributors. </p>
            <p>Blender is a free 3D graphics suite, designed to run on Windows, Mac, or Linux operating systems, and used for creating 3D models, animation, video games, and even visual effects for the movie industry.</p>
            <p>I used Blender during my studies in Khpi and using it for 3D printing and other times when I need models.</p>
        `,
        site: "https://www.blender.org/",
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

    document.getElementById("explainOverlay").style.display = "flex";
}

function closeExplain() {
    document.getElementById("explainOverlay").style.display = "none";
}


