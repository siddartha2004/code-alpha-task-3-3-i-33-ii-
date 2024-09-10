document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
    const updateList = document.getElementById('update-list');

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const goal = document.getElementById('goal').value;

        fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, goal })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response
            alert('Project created successfully!');
            loadProjects();
        });
    });

    function loadProjects() {
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => {
                projectList.innerHTML = '';
                data.projects.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.className = 'project-item';
                    projectItem.innerHTML = `<strong>${project.title}</strong><p>${project.description}</p><p>Goal: $${project.goal}</p><button data-id="${project._id}">Contribute</button>`;
                    projectList.appendChild(projectItem);
                });
            });
    }

    function loadUpdates() {
        fetch('/api/updates')
            .then(response => response.json())
            .then(data => {
                updateList.innerHTML = '';
                data.updates.forEach(update => {
                    const updateItem = document.createElement('div');
                    updateItem.className = 'update-item';
                    updateItem.innerHTML = `<strong>${update.projectTitle}</strong><p>${update.text}</p>`;
                    updateList.appendChild(updateItem);
                });
            });
    }

    loadProjects();
    loadUpdates();
});
