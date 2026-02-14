const tools = [
    {
        name: "Visual Studio",
        icon: "Images/visualStudio.png",
        level: 90,
        color: "#5c5c5c",
        category: "Web Development"
    },
    {
        name: "Visual Studio Code",
        icon: "Images/visualStudioCode.png",
        level: 90,
        color: "#007acc",
        category: "Web Development"
    },
    {
        name: "Unity",
        icon: "Images/unity.png",
        level: 85,
        color: "#5c5c5c",
        category: "Gaming"
    },
    {
        name: "HTML5",
        icon: "Images/html5.png",
        level: 95,
        color: "#e44d26",
        category: "Web Design"
    },
    {
        name: "CSS",
        icon: "Images/CSS.png",
        level: 95,
        color: "#1572b6",
        category: "Web Design"
    },
    {
        name: "Bootstrap",
        icon: "Images/bootstrap.png",
        level: 70,
        color: "#563d7c",
        category: "Web Development"
    },
    {
        name: "JavaScript",
        icon: "Images/javaScript.png",
        level: 85,
        color: "#f7df1e",
        category: "Web Development"
    },
    {
        name: "D3.js",
        icon: "Images/D3js.png",
        level: 70,
        color: "#f9a828",
        category: "Web Development"
    },
    {
        name: "Wix",
        icon: "Images/wix.png",
        level: 90,
        color: "#00d1b2",
        category: "Web Design"
    },
    {
        name: "Squarespace",
        icon: "Images/squarespace.png",
        level: 80,
        color: "#000000",
        category: "Web Design"
    },
    {
        name: "Adobe XD",
        icon: "Images/adobe-xd.png",
        level: 80,
        color: "#ff26a3",
        category: "Media Production"
    },
    {
        name: "Premiere Pro",
        icon: "Images/Premiere-pro.png",
        level: 90,
        color: "#cc5c2f",
        category: "Media Production"
    },
    {
        name: "Vuforia",
        icon: "Images/vuforia.jfif",
        level: 50,
        color: "#3d4b5c",
        category: "AR/VR"
    },
    {
        name: "Oculus",
        icon: "Images/Oculus.png",
        level: 70,
        color: "#0085c3",
        category: "AR/VR"
    },
    {
        name: "Illustrator",
        icon: "Images/adobe-illustrator.png",
        level: 80,
        color: "#ff9c00",
        category: "Media Production"
    },
    {
        name: "Animate",
        icon: "Images/adobe-animate.png",
        level: 80,
        color: "#ff8a00",
        category: "Media Production"
    },
    {
        name: "After Effects",
        icon: "Images/after-effects.png",
        level: 70,
        color: "#9c2d98",
        category: "Media Production"
    },
    {
        name: "Maya",
        icon: "Images/Maya.png",
        level: 70,
        color: "#6c9f91",
        category: "Media Production"
    },
    {
        name: "Substance Painter",
        icon: "Images/SubstancePainter.png",
        level: 70,
        color: "#f78d3f",
        category: "Media Production"
    },
    {
        name: "Swift",
        icon: "Images/swift.png",
        level: 65,
        color: "#ff4f5a",
        category: "Other"
    },
    {
        name: "Unreal",
        icon: "Images/unreal.jpg",
        level: 70,
        color: "#313131",
        category: "Gaming"
    }
];

// Select elements from the DOM
const categorySelect = document.getElementById("category-select");
const wheelContainer = document.querySelector(".wheel-container");

// Create a tool widget to display on the page
function createToolWidget(tool) {
    const widget = document.createElement("div");
    widget.className = "tool-widget";

    const img = document.createElement("img");
    img.className = "tool-icon";
    img.src = tool.icon;
    img.alt = tool.name;

    const info = document.createElement("div");
    info.className = "tool-info";

    const name = document.createElement("h4");
    name.className = "tool-name";
    name.textContent = tool.name;

    const levelText = document.createElement("div");
    levelText.className = "skill-level";
    levelText.textContent = `Skill Level: ${tool.level}%`;

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressFill.style.backgroundColor = tool.color;
    progressFill.style.width = `${tool.level}%`;

    progressContainer.appendChild(progressFill);
    info.appendChild(name);
    info.appendChild(levelText);
    info.appendChild(progressContainer);

    widget.appendChild(img);
    widget.appendChild(info);

    wheelContainer.appendChild(widget);
}

// Filter tools based on selected category
function filterTools() {
    // Clear previous widgets before rendering new ones
    wheelContainer.innerHTML = "";

    // Get the selected category
    const selectedCategory = categorySelect.value;

    if (selectedCategory === "") {
        // If "Pick a Category" is selected, do not display any skills
        return;
    }

    // Filter tools based on the selected category
    const filteredTools = tools.filter(tool => tool.category === selectedCategory);

    // Create and display widgets for each filtered tool
    filteredTools.forEach(createToolWidget);
}
// Initialize page without showing any skills
document.addEventListener('DOMContentLoaded', () => {
    // Clear out any skills initially
    wheelContainer.innerHTML = "";
});