// Récupération des éléments du DOM 
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const userCount = document.getElementById('userCount'); 
const userIdInput = document.getElementById('userId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const roleInput = document.getElementById('role');

// Fonction pour Récupérer et afficher les utilisateurs 
async function loadUser() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();

        // Vérification que les données reçus soient bien un tableau
        if (!Array.isArray(data)) {
            console.error("Le serveur n'a pas renvoyé un tableau :", data);
            userList.innerHTML = `<li class="list-group-item list-group-item-danger">Erreur serveur : ${data.message || 'Inconnue'}</li>`;
            return;
        }

        const users = data; // Si c'est un tableau, le code continue

        // MISE À JOUR DU COMPTEUR : On le met ici pour qu'il s'actualise après chaque action
        if (userCount) {
            userCount.innerText = `${users.length} Étudiant${users.length > 1 ? 's' : ''}`;
        }

        userList.innerHTML = '';

        if (users.length === 0) {
            userList.innerHTML = '<li class="list-group-item text-muted text-center">Aucun étudiant enregistré.</li>';
            return;
        }

        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item user-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-2';

            li.innerHTML = `
                <div>
                    <div class="fw-bold text-dark">
                    ${user.firstName} ${user.lastName.toUpperCase()}
                    <span class="badge bg-info ms-2" style="font-size: 0.7 em;">${user.role}</span>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="badge bg-light text-dark border me-3">#${user.id}</span>
                    
                    <button class="btn btn-outline-primary btn-sm me-2" onclick="editUser(${user.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>

                    <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            `;
            userList.appendChild(li);
        });
    } catch(error) {
        console.error("Erreur lors du chargement:", error);
    }
}

// Fonction pour remplir le formulaire en mode édition
async function editUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const user = await response.json();

        userIdInput.value = user.id; 
        firstNameInput.value = user.firstName;
        lastNameInput.value = user.lastName;
        roleInput.value = user.role;

        // UI : Mode Édition (Jaune)
        submitBtn.querySelector('span').innerText = "Enregistrer les modifications";
        submitBtn.classList.replace('btn-primary', 'btn-warning');
        cancelBtn.classList.remove('d-none');
        
        // Scroll fluide vers le formulaire pour l'utilisateur
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(error) {
        console.error("Erreur lors de la récupération:", error);
    }
}

// Réinitialisation du formulaire
function resetForm() {
    userIdInput.value = '';
    roleInput.value = 'Lecteur'; 
    userForm.reset();
    submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><span>Enregistrer</span>';
    submitBtn.classList.replace('btn-warning', 'btn-primary');
    cancelBtn.classList.add('d-none');
}

cancelBtn.addEventListener("click", resetForm);

// ÉCOUTEUR UNIQUE POUR LE SUBMIT (Gère POST et PUT)
userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = userIdInput.value;
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (!firstName || !lastName) {
        alert("Veuillez remplir les deux champs !");
        return;
    }

    const userData = { 
        firstName: firstNameInput.value.trim(), 
        lastName: lastNameInput.value.trim(),
        role: roleInput.value
    };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/users/${id}` : `/api/users`;

    try {
        // Désactivation du bouton pendant l'envoi
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerText = "Traitement...";

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            resetForm();
            await loadUser();
        } else {
            alert("Erreur lors de l'enregistrement");
        }
    } catch(error) {
        console.error("Erreur lors de l'envoi:", error);
    } finally {
        submitBtn.disabled = false;
        // On remet le texte initial du bouton (avec l'icône)
        if (!id) {
             submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><span>Enregistrer</span>';
        }
    }
});

// Fonction pour supprimer
async function deleteUser(id) {
    if (!confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;

    try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadUser();
        }
    } catch (error) {
        console.error("Erreur DELETE:", error);
    }
}

// Chargement initial
loadUser();