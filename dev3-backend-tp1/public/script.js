// Récupération des éléments du DOM 
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

// Fonction pour Récupérer et afficher les utilisateurs 
async function loadUser() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        // On vide la liste actuelle 
        userList.innerHTML = '';

        if (users.length === 0) {
            userList.innerHTML = '<li class="list-group-item text-muted text-center">Aucun utilisateur.</li>';
            return;
        }

        // Ajout de chaque utilisateur dans le <ul>
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            li.innerHTML = `
                <span>${user.firstName} <strong>${user.lastName.toUpperCase()}</strong></span>
                <div>
                    <span class="badge bg-secondary me-2">ID: ${user.id}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">X</button>
                </div>
            `;
            userList.appendChild(li);
        });
    } catch(error) {
        console.error("Erreur lors du chargement:", error);
    }
}

async function deleteUser(id) {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return ;

    try {
        const response = await fetch(`/api/users/${id}` , {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Utilisateur ${id} supprimé`);
            // Actualisation de la liste 
            loadUser();
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

    // 1. Récupération des valeurs
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    // 2. VERIFICATION : Si l'un des deux est vide, on arrête tout
    if (!firstName || !lastName) {
        alert("Veuillez remplir les deux champs avant d'ajouter !");
        return; 
    }

    const userData = { firstName, lastName };

    try {
        // On désactive le bouton pour éviter les doubles clics
        const btn = userForm.querySelector('button');
        btn.disabled = true;
        btn.innerText = "Ajout en cours...";

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

        // On réactive le bouton
        btn.disabled = false;
        btn.innerText = "Ajouter";

    } catch (error) {
        console.error("Erreur:", error);
    }
});

// Chargement des données au démarrage
loadUser();