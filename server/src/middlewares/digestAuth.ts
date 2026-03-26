import auth from 'http-auth';
import authConnect from 'http-auth-connect';
import path from 'path';

// Configuration du realm et du chemin vers le fichier source
const digest = auth.digest({
    realm: "Zone securisee", 
    // On force le chemin vers la racine du projet où la commande a été lancée
    file: path.join(process.cwd(), "users.htdigest") 
});

// auth.connect() transforme la configuration en un middleware Express classique
export const digestAuth = authConnect(digest);