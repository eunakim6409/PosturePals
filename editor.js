// Editor functionality for PostureGotchi
let editMode = false;
let currentEditType = null;
let currentEditId = null;

// Load saved data from localStorage
function loadSavedData() {
    const savedCharacters = localStorage.getItem('posturegotchi_characters');
    const savedExamples = localStorage.getItem('posturegotchi_examples');
    
    if (savedCharacters) {
        const characters = JSON.parse(savedCharacters);
        characters.forEach((char, index) => {
            updateCharacterDisplay(index, char);
        });
    }
    
    if (savedExamples) {
        const examples = JSON.parse(savedExamples);
        examples.forEach((example, index) => {
            updateExampleDisplay(index, example);
        });
    }
}

// Toggle edit mode
function toggleEditMode() {
    editMode = !editMode;
    const editButtons = document.querySelectorAll('.edit-btn');
    const toggleBtn = document.getElementById('editModeToggle');
    
    if (editMode) {
        editButtons.forEach(btn => btn.style.display = 'block');
        toggleBtn.textContent = '✅ Exit Edit Mode';
        toggleBtn.style.background = 'var(--primary-yellow)';
    } else {
        editButtons.forEach(btn => btn.style.display = 'none');
        toggleBtn.textContent = '✏️ Edit Mode';
        toggleBtn.style.background = '';
    }
}

// Edit Character
function editCharacter(id) {
    currentEditType = 'character';
    currentEditId = id;
    
    const card = document.querySelector(`[data-character-id="${id}"]`);
    const avatar = card.querySelector('.character-avatar').textContent;
    const name = card.querySelector('.character-name').textContent;
    const type = card.querySelector('.character-type-text').textContent;
    const description = card.querySelector('.character-description').textContent;
    const healthStat = card.querySelector('.health-stat').textContent;
    const happinessStat = card.querySelector('.happiness-stat').textContent;
    
    // Extract star counts
    const healthStars = (healthStat.match(/⭐/g) || []).length;
    const happinessStars = (happinessStat.match(/⭐/g) || []).length;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="edit-form">
            <div class="form-group">
                <label>Character Emoji/Avatar:</label>
                <input type="text" id="editAvatar" value="${avatar}" maxlength="2" placeholder="Enter emoji or text">
                <small>Enter an emoji or short text (max 2 characters)</small>
            </div>
            <div class="form-group">
                <label>Or Upload Image:</label>
                <input type="file" id="editAvatarFile" accept="image/*">
                <small>Upload a custom image for your character</small>
            </div>
            <div class="form-group">
                <label>Character Name:</label>
                <input type="text" id="editName" value="${name}" maxlength="30">
            </div>
            <div class="form-group">
                <label>Character Type/Title:</label>
                <input type="text" id="editType" value="${type}" maxlength="50">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <textarea id="editDescription" rows="4" maxlength="200">${description}</textarea>
            </div>
            <div class="form-group">
                <label>Health Stars (1-5):</label>
                <input type="number" id="editHealth" value="${healthStars}" min="1" max="5">
            </div>
            <div class="form-group">
                <label>Happiness Stars (1-5):</label>
                <input type="number" id="editHappiness" value="${happinessStars}" min="1" max="5">
            </div>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'Edit Character';
    document.getElementById('editModal').style.display = 'block';
    
    // Handle image upload preview
    document.getElementById('editAvatarFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Store image data for saving
                document.getElementById('editAvatar').dataset.imageData = event.target.result;
                document.getElementById('editAvatar').value = '📷';
            };
            reader.readAsDataURL(file);
        }
    });
}

// Edit Example
function editExample(id) {
    currentEditType = 'example';
    currentEditId = id;
    
    const card = document.querySelector(`[data-example-id="${id}"]`);
    const img = card.querySelector('.example-img');
    const title = card.querySelector('.example-title').textContent;
    const wrongText = card.querySelector('.wrong-text').textContent;
    const whyText = card.querySelector('.why-text').textContent;
    const fixText = card.querySelector('.fix-text').textContent;
    const badge = card.querySelector('.badge');
    const isGood = badge.classList.contains('good');
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="edit-form">
            <div class="form-group">
                <label>Current Image:</label>
                <img src="${img.src}" alt="Current" style="max-width: 200px; border-radius: 10px; margin: 10px 0;">
            </div>
            <div class="form-group">
                <label>Upload New Image:</label>
                <input type="file" id="editExampleImage" accept="image/*">
                <small>Upload your own posture example image</small>
            </div>
            <div class="form-group">
                <label>Or Enter Image URL:</label>
                <input type="url" id="editExampleUrl" placeholder="https://example.com/image.jpg">
            </div>
            <div class="form-group">
                <label>Title:</label>
                <input type="text" id="editExampleTitle" value="${title}" maxlength="50">
            </div>
            <div class="form-group">
                <label>What's Wrong/Right:</label>
                <textarea id="editWrong" rows="2" maxlength="150">${wrongText}</textarea>
            </div>
            <div class="form-group">
                <label>Why It's Bad/Great:</label>
                <textarea id="editWhy" rows="2" maxlength="150">${whyText}</textarea>
            </div>
            <div class="form-group">
                <label>Fix It/Keep It Up:</label>
                <textarea id="editFix" rows="2" maxlength="150">${fixText}</textarea>
            </div>
            <div class="form-group">
                <label>Type:</label>
                <select id="editExampleType">
                    <option value="bad" ${!isGood ? 'selected' : ''}>❌ Bad Posture</option>
                    <option value="good" ${isGood ? 'selected' : ''}>✅ Good Posture</option>
                </select>
            </div>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'Edit Posture Example';
    document.getElementById('editModal').style.display = 'block';
    
    // Handle image upload preview
    document.getElementById('editExampleImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('editExampleUrl').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Save edit
function saveEdit() {
    if (currentEditType === 'character') {
        saveCharacter();
    } else if (currentEditType === 'example') {
        saveExample();
    }
}

function saveCharacter() {
    const avatar = document.getElementById('editAvatar').value;
    const avatarImageData = document.getElementById('editAvatar').dataset.imageData;
    const name = document.getElementById('editName').value;
    const type = document.getElementById('editType').value;
    const description = document.getElementById('editDescription').value;
    const health = parseInt(document.getElementById('editHealth').value);
    const happiness = parseInt(document.getElementById('editHappiness').value);
    
    const characterData = {
        avatar: avatar,
        avatarImage: avatarImageData || null,
        name: name,
        type: type,
        description: description,
        health: health,
        happiness: happiness
    };
    
    // Update display
    updateCharacterDisplay(currentEditId, characterData);
    
    // Save to localStorage
    let characters = JSON.parse(localStorage.getItem('posturegotchi_characters') || '[]');
    characters[currentEditId] = characterData;
    localStorage.setItem('posturegotchi_characters', JSON.stringify(characters));
    
    closeEditModal();
    showNotification('Character saved! ✨', 'success');
}

function saveExample() {
    const imageUrl = document.getElementById('editExampleUrl').value;
    const title = document.getElementById('editExampleTitle').value;
    const wrong = document.getElementById('editWrong').value;
    const why = document.getElementById('editWhy').value;
    const fix = document.getElementById('editFix').value;
    const type = document.getElementById('editExampleType').value;
    
    const exampleData = {
        imageUrl: imageUrl,
        title: title,
        wrong: wrong,
        why: why,
        fix: fix,
        type: type
    };
    
    // Update display
    updateExampleDisplay(currentEditId, exampleData);
    
    // Save to localStorage
    let examples = JSON.parse(localStorage.getItem('posturegotchi_examples') || '[]');
    examples[currentEditId] = exampleData;
    localStorage.setItem('posturegotchi_examples', JSON.stringify(examples));
    
    closeEditModal();
    showNotification('Posture example saved! ✨', 'success');
}

function updateCharacterDisplay(id, data) {
    const card = document.querySelector(`[data-character-id="${id}"]`);
    const avatarEl = card.querySelector('.character-avatar');
    
    if (data.avatarImage) {
        avatarEl.innerHTML = `<img src="${data.avatarImage}" alt="${data.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px;">`;
    } else {
        avatarEl.textContent = data.avatar || '🐾';
    }
    
    card.querySelector('.character-name').textContent = data.name;
    card.querySelector('.character-type-text').textContent = data.type;
    card.querySelector('.character-description').textContent = data.description;
    
    const healthStars = '⭐'.repeat(data.health);
    const happinessStars = '⭐'.repeat(data.happiness);
    card.querySelector('.health-stat').textContent = `Health: ${healthStars}`;
    card.querySelector('.happiness-stat').textContent = `Happiness: ${happinessStars}`;
}

function updateExampleDisplay(id, data) {
    const card = document.querySelector(`[data-example-id="${id}"]`);
    const img = card.querySelector('.example-img');
    const badge = card.querySelector('.badge');
    
    img.src = data.imageUrl;
    img.alt = data.title;
    
    card.querySelector('.example-title').textContent = data.title;
    card.querySelector('.wrong-text').textContent = data.wrong;
    card.querySelector('.why-text').textContent = data.why;
    card.querySelector('.fix-text').textContent = data.fix;
    
    // Update badge
    badge.className = 'badge ' + data.type;
    badge.textContent = data.type === 'good' ? '✅ Good' : '❌ Bad';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditType = null;
    currentEditId = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
});

