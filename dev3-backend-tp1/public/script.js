// Récupération des éléments du DOM 
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const userCount = document.getElementById('userCount'); // On récupère le badge du compteur

// Fonction pour Récupérer et afficher les utilisateurs 
async function loadUser() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        // MISE À JOUR DU COMPTEUR : On le fait ici car on a accès à la liste 'users'
        if (userCount) {
            userCount.innerText = `${users.length} Étudiant${users.length > 1 ? 's' : ''}`;
        }

        // On vide la liste actuelle 
        userList.innerHTML = '';

        if (users.length === 0) {
            userList.innerHTML = '<li class="list-group-item text-muted text-center">Aucun utilisateur.</li>';
            return;
        }

        // Ajout de chaque utilisateur dans le <ul>
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item user-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-2';

            li.innerHTML = `
                <div>
                    <div class="fw-bold text-dark">${user.firstName} ${user.lastName.toUpperCase()}</div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="badge bg-light text-dark border me-3">#${user.id}</span>
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

// Fonction pour supprimer un utilisateur
async function deleteUser(id) {
    if (!confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return ;

    try {
        const response = await fetch(`/api/users/${id}` , {
            method: 'DELETE'
        });

        if (response.ok) {
            loadUser(); // Actualisation automatique
        } else {
            alert("Erreur lors de la suppression"); 
        }
    } catch (error) {
        console.error("Erreur DELETE:", error);
    }
}

// Soumission du formulaire
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (!firstName || !lastName) {
        alert("Veuillez remplir les deux champs !");
        return; 
    }

    const userData = { firstName, lastName };

    try {
        const btn = userForm.querySelector('button');
        btn.disabled = true;
        btn.innerText = "Ajout...";

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            firstNameInput.value = '';
            lastNameInput.value = '';
            loadUser(); 
        }

        btn.disabled = false;
        btn.innerText = "Enregistrer";

    } catch (error) {
        console.error("Erreur:", error);
    }
});

// Chargement initial
loadUser();