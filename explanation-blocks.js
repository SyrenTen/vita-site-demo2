const explainData = {
    logseq: {
        title: "Logseq",
        image: "images\\images-explanation\\logseqlogo.png",   // change path
        text: `
            <p>Logseq est un système de gestion des connaissances et de prise de notes basé sur des graphiques Markdown « local-first ».</p>
            <p>J'utilise Logseq pour mes expériences et notamment comme prototype visuel pour mon projet de bot Telegram.</p>
        `,
        site: "https://logseq.com/",
    },

    python: {
        title: "Python",
        image: "images\\images-explanation\\python_logo.jfif",   // change path
        text: `
            <p>Python est un langage de programmation qui permet de travailler rapidement et d'intégrer des systèmes plus efficacement.</p>
            <p>J'utilise beaucoup Python pour mes projets personnels et dans le cadre de mon apprentissage autonome, ainsi que pendant mes études.</p>
        `,
        site: "https://www.python.org/",
    },

    cplus: {
        title: "C++",
        image: "images\\images-explanation\\cplus_logo.png",   // change path
        text: `
            <p>Le C++ est un langage de programmation de haut niveau à usage général. Il a été conçu pour la programmation système, les logiciels embarqués soumis à des contraintes de ressources et les grands systèmes, en mettant l'accent sur les performances, l'efficacité et la flexibilité d'utilisation.</p>
            <p>J'utilise le C++ dans le cadre de mes études et de mes stages, mais rarement dans mes projets personnels, même si j'ai l'intention d'approfondir mes connaissances dans ce domaine.</p>
        `,
        site: "https://en.wikipedia.org/wiki/C%2B%2B",
    },

    qt: {
        title: "Qt",
        image: "images\\images-explanation\\qt_logo.png",   // change path
        text: `
            <p>Qt est un framework de développement d'applications multiplateforme permettant de créer des interfaces utilisateur graphiques ainsi que des applications multiplateformes fonctionnant sur diverses plateformes logicielles et matérielles.</p>
            <p>J'ai utilisé Qt avec C++ pour certains projets pendant mes études à l'Université de Kharkiv (KhPI).</p>
        `,
        site: "https://code.qt.io/cgit/qt/qtbase.git/",
    },

    arduino: {
        title: "Arduino",
        image: "images\\images-explanation\\Arduino_Logo_Registered.svg.png",   // change path
        text: `
            <p>Arduino est une entreprise spécialisée dans le matériel et les logiciels open source, ainsi qu'un projet et une communauté d'utilisateurs qui conçoivent et fabriquent des microcontrôleurs monocarte et des kits de microcontrôleurs destinés à la conception d'appareils numériques et autres.</p>
            <p>Le langage de programmation Arduino peut être divisé en trois parties principales : les fonctions, les valeurs (variables et constantes) et la structure. Arduino utilise une variante du langage de programmation C++. Le code est écrit en C++ avec l'ajout de méthodes et de fonctions spéciales.</p>
            <p>J'utilise des cartes Arduino pour mes projets personnels et dans le cadre de mes études à l'université, notamment dans le projet KAH et Robot SUMO. J'utilise l'IDE Arduino pour programmer les cartes.</p>
        `,
        site: "https://www.arduino.cc/",
        
    },

    blender: {
        title: "Blender",
        image: "images\\images-explanation\\blender_logo.png",   // change path
        text: `
            <p>Blender est un projet open source hébergé sur blender.org, sous licence GNU GPL, dont la propriété appartient à ses contributeurs.</p>
            <p>Blender est une suite logicielle gratuite de graphisme 3D, conçue pour fonctionner sous les systèmes d'exploitation Windows, Mac ou Linux, et utilisée pour créer des modèles 3D, des animations, des jeux vidéo et même des effets visuels pour l'industrie cinématographique.</p>
            <p>J'ai utilisé Blender pendant mes études à l'Khpi et je m'en sers pour l'impression 3D ainsi que lorsque j'ai besoin de modèles.</p>
        `,
        site: "https://www.blender.org/",
    },


    tiaportal: {
        title: "Tia Portal",
        image: "images\\images-explanation\\tiaportal.jfif",   // change path
        text: `
            <p>TIA Portal intègre les logiciels de base et offre de nouvelles fonctionnalités telles que l'ingénierie multi-utilisateurs, les solutions MTP (Module Type Package) et des fonctionnalités de sécurité étendues. TIA Portal vous offre tout ce dont vous avez besoin pour une ingénierie de bout en bout.</p>
            <p>Je l'ai utilisé pendant mes cours d'automatisme en GEII et pendant le SAE pour programmer le MUGOCHAUD.</p>
        `,
        site: "https://www.siemens.com/en-us/products/tia-portal/",
        project: "files\\projects-files\\geii-projects\\mujoco\\project-mujoco.html"
    },


    kicad: {
        title: "KiCad",
        image: "images\\images-explanation\\kicad.png",   // change path
        text: `
            <p>KiCad est une suite logicielle open source dédiée à la conception électronique. Elle permet la saisie de schémas et la conception de circuits imprimés, avec des formats de sortie Gerber et IPC-2581. La suite fonctionne sous Windows, Linux et macOS et est distribuée sous licence GNU GPL v3.</p>
            <p>Nous avons utilisé KiCad pour le projet Robot SUMO et je m'en sers pour mes projets DIY.</p>
        `,
        site: "https://www.kicad.org/",
        project: "files\\projects-files\\geii-projects\\SUMO\\project-sumo.html"
    },


    rviz: {
        title: "Rviz",
        image: "images\\images-explanation\\rviz.jfif",   // change path
        text: `
            <p>Outil de visualisation 3D pour Robot Operation System.</p>
            <p>Je l'ai utilisé pendant mon stage pour visualiser les mouvements du robot.</p>
        `,
        site: "https://wiki.ros.org/rviz",
        project: "about-me.html"
    },

    rqt: {
        title: "rqt",
        image: "images\\images-explanation\\rqt.webp",
        text: `
            <p>rqt est un framework basé sur Qt destiné au développement d'interfaces graphiques pour Robot Operation System (ROS). Il se compose de trois parties/métapackages</p>
            <p>Je l'Je l'ai utilisé pendant mon stage pour comprendre le fonctionnement de ROS, en particulier l'espace de travail que m'avait fourni l'équipe.</p>
        `,
        site: "http://wiki.ros.org/rqt"
    },

    qontrol: {
        title: "Qontrol",
        image: "images\\images-explanation\\qontrol.png",
        text: `
            <p>Qontrol est une bibliothèque flexible et efficace permettant de résoudre des problèmes de commande de robots à l'aide de la programmation quadratique. Elle prend en charge divers modes de commande (vitesse, accélération, couple) et offre un large éventail de tâches et de contraintes.</p>
            <p>Je l'ai utilisée pendant mon stage pour programmer le comportement du robot.</p>
        `,
        site: "https://auctus-team.gitlabpages.inria.fr/components/control/qontrol/index.html"
    },

    mujoco: {
        title: "MuJoCo",
        image: "images\\images-explanation\\mujoco.jpg",
        text: `
            <p>MuJoCo est un moteur physique libre et open source destiné à faciliter la recherche et le développement dans les domaines de la robotique, de la biomécanique, du graphisme et de l'animation.</p>
            <p>Au cours de mon stage, j'ai travaillé sur une simulation basée sur ce moteur, en vérifiant le bon fonctionnement de mon programme. La simulation est essentielle pour s'assurer que le code fonctionnera sans danger (chute du robot ou collision avec une personne) sur le bras robotique réel.</p>
        `,
        site: "https://mujoco.org/",
        project: "about-me.html"
    },

    ros2: {
        title: "Robot Operating System",
        image: "images\\images-explanation\\ros2.png",
        text: `
            <p>Le Robot Operating System (ROS) est un ensemble de bibliothèques logicielles et d'outils qui vous aident à développer des applications robotiques. Des pilotes aux algorithmes de pointe, en passant par de puissants outils de développement, ROS offre tout ce dont vous avez besoin pour votre prochain projet de robotique. Et tout cela est open source.</p>
            <p>Au cours de mon stage, j'ai programmé des robots à l'aide de ROS, en utilisant la version Humble, principalement en C++ et parfois en Python pour un prototypage rapide.</p>
        `,
        site: "https://www.ros.org/"
    },

    moveit: {
        title: "MoveIt",
        image: "images\\images-explanation\\moveit.png",
        text: `
            <p>Un cadre de travail dédié à la planification de mouvements, à la manipulation et à la cinématique pour ROS, idéal pour les étudiants et les chercheurs universitaires.</p>
            <p>Je l'ai utilisé pendant mon stage pour générer la trajectoire permettant au robot de se déplacer vers des points prédéfinis.</p>
        `,
        site: "https://moveit.ai/"
    },

    proteus: {
        title: "Proteus (ISIS et ARES)",
        image: "images\\images-explanation\\proteus.jpg",
        text: `
            <p>Proteus est une suite logicielle destinée à l'électronique. Développé par la société Labcenter Electronics, les logiciels incluent dans Proteus permettent la CAO dans le domaine électronique. Deux logiciels principaux composent cette suite logicielle: ISIS, ARES, PROSPICE et VSM.</p>
            <p>Je m'en suis servi pour concevoir le schéma de circuit imprimé de nos projets et pour réaliser des simulations des composants sur lesquels j'ai travaillé, afin de les vérifier avant la fabrication des cartes</p>
        `,
        site: "https://www.elektronique.fr/logiciels/proteus.php"
    },

    figma: {
        title: "Figma",
        image: "images\\images-explanation\\figma.svg",
        text: `
            <p>Figma Design est l'outil de référence pour créer, partager et tester des maquettes de sites web, d'applications mobiles et d'autres produits et expériences numériques.</p>
            <p>Je l'ai utilisé pour concevoir ce site web.</p>
        `,
        site: "https://www.figma.com/"
    },

    cloudflare: {
        title: "Cloudflare",
        image: "images\\images-explanation\\cloudflare.png",
        text: `
            <p>Cloudflare propose son service DNS qui garantit, selon ses propres termes, un temps de réponse (temps de réaction) optimal, une redondance inégalée et des mesures de sécurité avancées telles qu'un pare-feu DDoS intégré et le protocole DNSSEC.</p>
            <p>Utilisé pour héberger le bot et la page web de l'utilisateur, ainsi que le panneau de contrôle administrateur.</p>
        `,
        site: "https://www.cloudflare.com/"
    },

    pytorch: {
        title: "PyTorch",
        image: "images\\images-explanation\\pytorch.webp",
        text: `
            <p>PyTorch est un module Python qui offre deux fonctionnalités de haut niveau : le calcul tensoriel (à l'instar de NumPy) avec une forte accélération GPU, et les réseaux neuronaux profonds basés sur un système d'autograd à ruban.</p>
            <p>En général, PyTorch est utilisé soit :
en remplacement de NumPy pour exploiter la puissance des GPU, soit comme plateforme de recherche en apprentissage profond offrant un maximum de flexibilité et de rapidité.</p>
        `,
        site: "https://pytorch.org/"
    },

    xlmroberta: {
        title: "XLM-RoBERTa",
        image: "images\\images-explanation\\xlm-roberta.webp",
        text: `
            <p>XLM-RoBERTa est un modèle linguistique multilingue de grande envergure, formé à partir de 2,5 To de données CommonCrawl filtrées couvrant 100 langues. Il démontre que l'extension du modèle permet d'obtenir des gains de performance significatifs, tant pour les langues disposant de nombreuses ressources que pour celles qui en ont peu. Le modèle utilise les objectifs de pré-entraînement de RoBERTa sur le modèle XLM.</p>
        `,
        site: "https://huggingface.co/docs/transformers/en/model_doc/xlm-roberta"
    },

    scikitlearn: {
        title: "Scikit-learn",
        image: "images\\images-explanation\\scikit.png",
        text: `
            <p>- Des outils simples et efficaces pour l'analyse prédictive des données</p>
            <p>- Accessibles à tous et réutilisables dans divers contextes</p>
            <p>- Basés sur NumPy, SciPy et matplotlib</p>
            <p>- Open source, utilisables à des fins commerciales</p>
        `,
        site: "https://scikit-learn.org/stable/"
    },

    tkinter: {
        title: "Tkinter",
        image: "images\\images-explanation\\tkinter.png",
        text: `
            <p>Le module tkinter (« interface Tk ») est l'interface Python standard pour la boîte à outils d'interface graphique Tcl/Tk. Tk et tkinter sont tous deux disponibles sur la plupart des plateformes Unix, y compris macOS, ainsi que sur les systèmes Windows.</p>
        `,
        site: "https://docs.python.org/3/library/tkinter.html"
    },

    jupyter: {
        title: "Jupyter Notebook",
        image: "images\\images-explanation\\jupyter.png",
        text: `
            <p>Jupyter Notebook est l'application web de référence pour la création et le partage de documents de calcul. Elle offre une expérience simple, intuitive et centrée sur le document.</p>
        `,
        site: "https://jupyter.org/"
    },

    segmodels: {
        title: "Image Segmentation Models",
        image: "images\\images-explanation\\imgsegmod.png",
        text: `
            <p>Bibliothèque Python utilisant des réseaux neuronaux pour la segmentation d'images, basée sur Keras et TensorFlow.</p>
            <p>API de haut niveau (seulement deux lignes de code pour créer un modèle de segmentation)</p>
            <p>4 architectures de modèles pour la segmentation d'images binaire et multiclasses (y compris Unet)</p>
            <p>Mesures de performance utiles pour la segmentation et indicateurs</p>
        `,
        site: "https://github.com/qubvel/segmentation_models"
    },

    name: {
        title: "",
        image: "",
        text: `
            <p></p>
            <p></p>
        `,
        site: ""
    },

    // ADD MORE EXPLANATIONS HERE
    // project: "files/projects/blender-project.html"
};

document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".explain-trigger");
    if (!trigger) return;

    const key = trigger.dataset.explain;
    openExplain(key);
});

function openExplain(key) {
    const data = explainData[key];
    if (!data) return;

    const overlay = document.getElementById("explainOverlay");
    const title = document.getElementById("explainTitle");
    const image = document.getElementById("explainImage");
    const text = document.getElementById("explainText");
    const siteBtn = document.getElementById("explainSite");
    const projectBtn = document.getElementById("explainProject");

    title.innerText = data.title || "";
    image.src = data.image || "";
    text.innerHTML = data.text || "";

    if (data.site) {
        siteBtn.href = data.site;
        siteBtn.style.display = "inline-flex";
    } else {
        siteBtn.style.display = "none";
    }

    if (data.project) {
        projectBtn.href = data.project;
        projectBtn.style.display = "inline-flex";
    } else {
        projectBtn.style.display = "none";
    }

    overlay.style.display = "flex";
}

function closeExplain() {
    document.getElementById("explainOverlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("explainOverlay");
    const box = document.getElementById("explainBox");

    if (overlay) {
        overlay.addEventListener("click", closeExplain);
    }
    if (box) {
        box.addEventListener("click", (e) => e.stopPropagation());
    }
});


