function uploadFiles() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileData = event.target.result;
            const fileType = file.type.split('/')[0]; // Get general file type

            const card = document.createElement('div');
            card.className = 'card';

            if (fileType === 'image') {
                const img = document.createElement('img');
                img.src = fileData;
                card.appendChild(img);
            } else if (fileType === 'video') {
                const video = document.createElement('video');
                video.src = fileData;
                video.controls = true;
                card.appendChild(video);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-file'; // You can use FontAwesome or similar for icons
                card.appendChild(icon);
            }

            const fileName = document.createElement('h3');
            fileName.textContent = file.name;
            card.appendChild(fileName);

            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.onclick = function() {
                downloadFile(fileData, file.name);
            };
            card.appendChild(downloadButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                fileList.removeChild(card);
                // Here you can add logic to delete the file from server or perform other actions
            };
            card.appendChild(deleteButton);

            fileList.appendChild(card);
        };

        reader.readAsDataURL(file); // Read file as Data URL
    }
}

function downloadFile(data, fileName) {
    const a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
