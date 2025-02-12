const tools = [
    { name: "Visual Studio", image: "Images/visualStudio.png", level: 90, category: "Web Development" },
    { name: "Visual Studio Code", image: "Images/visualStudioCode.png", level: 90, category: "Web Development" },
    { name: "Unity", image: "Images/unity.png", level: 85, category: "Gaming" },
    { name: "HTML5", image: "Images/html5.png", level: 95, category: "Web Design" },
    { name: "CSS", image: "Images/CSS.png", level: 95, category: "Web Design" },
    { name: "Bootstrap", image: "Images/bootstrap.png", level: 70, category: "Web Development" },
    { name: "JavaScript", image: "Images/javaScript.png", level: 85, category: "Web Development" },
    { name: "D3.js", image: "Images/D3js.png", level: 70, category: "Web Development" },
    { name: "Wix", image: "Images/wix.png", level: 90, category: "Web Design" },
    { name: "Squarespace", image: "Images/squarespace.png", level: 80, category: "Web Design" },
    { name: "Adobe XD", image: "Images/adobe-xd.png", level: 80, category: "Media Production" },
    { name: "Premiere Pro", image: "Images/Premiere-pro.png", level: 90, category: "Media Production" },
    { name: "Vuforia", image: "Images/vuforia.jfif", level: 50, category: "AR/VR" },
    { name: "Oculus", image: "Images/Oculus.png", level: 70, category: "AR/VR" },
    { name: "Illustrator", image: "Images/adobe-illustrator.png", level: 80, category: "Media Production" },
    { name: "Animate", image: "Images/adobe-animate.png", level: 80, category: "Media Production" },
    { name: "After Effects", image: "Images/after-effects.png", level: 70, category: "Media Production" },
    { name: "Maya", image: "Images/Maya.png", level: 70, category: "Media Production" },
    { name: "Substance Painter", image: "Images/SubstancePainter.png", level: 70, category: "Media Production" },
    { name: "Swift", image: "Images/swift.png", level: 65, category: "Other" },
    { name: "Unreal", image: "Images/unreal.jpg", level: 70, category: "Gaming" }
];

let index = 0;
let currentCategory = "All";

const toolImage = document.getElementById("toolImage");
const toolName = document.getElementById("toolName");
const skillLevel = document.getElementById("skillLevel");
const progressBar = document.getElementById("progress-bar");

const filterTools = () => {
    currentCategory = document.getElementById("category-select").value;
    index = 0; // Reset to first tool in the filtered list
    updateTool();
};

const updateTool = () => {
    // Filter the tools based on the selected category
    const filteredTools = tools.filter(tool => currentCategory === "All" || tool.category === currentCategory);
    const tool = filteredTools[index];

    toolImage.src = tool.image;
    toolName.textContent = tool.name;
    skillLevel.textContent = `Skill Level: ${tool.level}%`;

    // Update the progress bar
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    // Set the width of the progress bar
    progressBar.style.width = `${tool.level}%`;

    // Set the color of the progress bar based on the level
    let color;
    if (tool.level >= 90) {
        color = 'green';  // Excellent skill
    } else if (tool.level >= 70) {
        color = 'orange'; // Intermediate skill
    } else {
        color = 'red'; // Needs improvement
    }
    progressBar.style.backgroundColor = color;

    // Update the progress text to show the percentage
    progressText.textContent = `${tool.level}%`;
};



// Auto switch tool every 2 seconds
setInterval(() => {
    const filteredTools = tools.filter(tool => currentCategory === "All" || tool.category === currentCategory);
    index = (index + 1) % filteredTools.length;
    updateTool();
}, 2000);

// document.getElementById("prevButton").addEventListener("click", () => {
//     index = (index - 1 + tools.length) % tools.length;
//     updateTool();
// });

// document.getElementById("nextButton").addEventListener("click", () => {
//     index = (index + 1) % tools.length;
//     updateTool();
// });

updateTool();
