document.addEventListener("DOMContentLoaded", function() {
    showSection('inicio');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('visible');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('visible');
    }
}

function toggleInfo(infoId) {
    const infoElement = document.getElementById(infoId);
    if (infoElement) {
        infoElement.classList.toggle('hidden');
    }
}