// Directory structure
const fileStructure = {
    "Camera Import": {
        "README": "/var/www/html/scripts_code/camera_dump/README.md",
        "photodump.sh": "/var/www/html/scripts_code/camera_dump/photodump.sh",
        ".env": "/var/www/html/scripts_code/camera_dump/.env"
    },
    "Convert Film Scans": {
        "README": "/var/www/html/scripts_code/invert_scans/README.md",
        "invert_tifs.sh": "/var/www/html/scripts_code/invert_scans/invert_tifs.sh",
        ".env": "/var/www/html/scripts_code/invert_scans/.env"
    }
};

// Populate the sidebar with folders and files
const sidebar = document.getElementById('sidebar');

function createTree(structure, parent) {
    const ul = document.createElement('ul');
    for (let key in structure) {
        const li = document.createElement('li');
        if (typeof structure[key] === 'object') {
            li.className = 'folder';
            li.textContent = key;
            li.onclick = () => li.classList.toggle('open');
            li.appendChild(createTree(structure[key], li));
        } else {
            li.className = 'file';
            li.textContent = key;
            li.onclick = (e) => {
                e.stopPropagation();
                loadFileContent(structure[key]);
            };
        }
        ul.appendChild(li);
    }
    return ul;
}

sidebar.appendChild(createTree(fileStructure));

// Load file content
async function loadFileContent(filePath) {
    try {
        const response = await fetch(filePath);
        const content = await response.text();
        document.getElementById('file-content').textContent = content;
    } catch (error) {
        document.getElementById('file-content').textContent = "Failed to load file content.";
        console.error('Error loading file:', error);
    }
}
