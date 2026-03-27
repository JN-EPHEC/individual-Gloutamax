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

  // -- NOUVEAUX ETATS POUR L'AUTH ---
  // On vérifie au démarrage si on a déjà un token dans le LocalStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [loginUsername, setLoginUsername] = useState('student');
  const [loginPassword, setLoginPassword] = useState('password123');

  // --- 2. LES FONCTIONS (Anciennement dans script.js) ---

  // Remplacer "loadUser"
  const fetchUsers = async () => {
    if (!isAuthenticated) return; // Inutile de charger si pas connecté

    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/data`, {
        // On ajoute l'en-tête ici
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        // Le token a expiré !
        console.log("Token expiré, veuillez vous reconnecter.");
        handleLogout(); // On déconnecte l'utilisateur pour qu'il se relogue
        return;
      }

      // On sécurise le frontend pour éviter l'écran blanc
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data: []);
      } else {
        setUsers([]);
      }

    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    // On charge les utiliseurs que si on est connecté
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]); // Le useEffect se relance quand isAutheticated change
  

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchUsers(); // On recharge la liste
      }
    } catch (error) {
      console.error("Erreur DELETE:", error);
    }
  };

  // --- NOUVELLE FONCTION DE LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      if (response.ok) {
        const data = await response.json();
        // Sauvegarde de l'Access Token (comme demandé dans le TP)
        localStorage.setItem('accessToken', data.accessToken);
        setIsAuthenticated(true);
      } else {
        alert("Identifiants incorrects");
      }
    } catch(error) {
      console.error("Erreur de connexion:", error);
    }
  };

  // Petite fonction de logout bonus
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  }

  // --- 3. L'AFFICHAGE (Le rendu JSX) ---
  // SI NON CONNECTÉ : On affiche l'écran de Login
  if (!isAuthenticated) {
    return (
      <div style={{ background: '#f0f2f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif" }}>
        <div className="card shadow p-4 border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
          <h3 className="text-center mb-4 text-primary"><i className="bi bi-box-arrow-in-right me-2"></i>Connexion</h3>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="loginUsername"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                required
              />
              <label htmlFor="loginUsername">Nom d'utilisateur</label>
            </div>
            <div className="form-floating mb-4">
              <input 
                type="password" 
                className="form-control" 
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Mot de passe"
                required
              />
              <label htmlFor="loginPassword">Mot de passe</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-3 fw-bold">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // SI CONNECTÉ : On affiche l'application normale
  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      
      <nav className="navbar navbar-dark shadow" style={{ background: '#2c3e50', marginBottom: '40px' }}>
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-database-fill-gear me-2"></i> Gestion des étudiants (Sécurisée)
          </span>
          {/* NOUVEAU : Le bouton de déconnexion */}
          <button className="btn btn-outline-light btn-sm fw-bold" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-2"></i>Déconnexion
          </button>
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
                    onChange={(e) => setFirstName(e.target.value)}
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
                  users.map(user => (
                    <li 
                      key={user.id} 
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