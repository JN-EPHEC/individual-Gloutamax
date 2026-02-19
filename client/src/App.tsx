import { useState, useEffect } from 'react';

// Si vous utilisez TypeScript, c'est une bonne pratique de typer l'étudiant
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export default function App() {
  // --- 1. LES ÉTATS (STATES) ---
  // Remplace toutes vos variables DOM (userList, userCount, etc.)
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. LES FONCTIONS (Anciennement dans script.js) ---

  // Remplacer "loadUser"
  const fetchUsers = async () => {
    try {
      // Attention: Assurez-vous que Vite est configuré pour faire un proxy vers le port 3000 de votre API,
      // sinon il faut mettre l'URL complète 'http://localhost:3000/api/users'
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    }
  };

  // Le Hook useEffect permet de lancer fetchUsers au démarrage de l'app (équivalent du loadUser() final)
  useEffect(() => {
    fetchUsers();
  }, []);

  // Remplacer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName })
      });

      if (response.ok) {
        setFirstName('');
        setLastName('');
        fetchUsers(); // On recharge la liste
      }
    } catch (error) {
      console.error("Erreur POST:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remplacer "deleteUser"
  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchUsers(); // On recharge la liste
      }
    } catch (error) {
      console.error("Erreur DELETE:", error);
    }
  };

  // --- 3. L'AFFICHAGE (Le rendu JSX, anciennement dans le fichier HTML) ---
  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      
      <nav className="navbar navbar-dark shadow" style={{ background: '#2c3e50', marginBottom: '40px' }}>
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-database-fill-gear me-2"></i> Gestion des étudiants (React)
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row g-4">
          
          {/* Colonne Formulaire */}
          <div className="col-md-4">
            <div className="card shadow p-4 border-0" style={{ borderRadius: '12px' }}>
              <h4 className="mb-4 text-primary"><i className="bi bi-person-plus-fill"></i> Nouvel Étudiant</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="firstName" 
                    placeholder="Prénom" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} // React met à jour la variable à chaque frappe
                    required 
                  />
                  <label htmlFor="firstName">Prénom</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="lastName" 
                    placeholder="Nom" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                  />
                  <label htmlFor="lastName">Nom de famille</label>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold" disabled={isLoading}>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {isLoading ? 'Ajout...' : 'Enregistrer'}
                </button>
              </form>
            </div>
          </div>

          {/* Colonne Liste des étudiants */}
          <div className="col-md-8">
            <div className="card shadow p-4 border-0" style={{ borderRadius: '12px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-secondary mb-0"><i className="bi bi-people-fill me-2"></i>Liste des étudiants</h4>
                <span className="badge bg-info">
                  {users.length} Étudiant{users.length > 1 ? 's' : ''}
                </span>
              </div>
              
              <ul className="list-group list-group-flush">
                {users.length === 0 ? (
                  <li className="list-group-item text-muted text-center border-0">Aucun utilisateur.</li>
                ) : (
                  // Dans React, on utilise .map() pour boucler sur un tableau et créer des éléments HTML
                  users.map(user => (
                    <li 
                      key={user.id} // React a besoin d'une clé unique pour chaque élément de liste
                      className="list-group-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-2"
                      style={{ borderLeft: '5px solid #3498db', borderRadius: '8px' }}
                    >
                      <div>
                        <div className="fw-bold text-dark">{user.firstName} {user.lastName.toUpperCase()}</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-light text-dark border me-3">#{user.id}</span>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(user.id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}