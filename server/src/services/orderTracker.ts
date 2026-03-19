// 1. L'interface (Le contrat)
export interface IOrderObserver {
  update(status: string): void;
}

// --- Les services (Observateurs)
export class PushNotificationService implements IOrderObserver {
  public update(status: string): void {
    console.log(`[PUSH] Votre commande est desormais : ${status}`);
  }
}

export class CRMService implements IOrderObserver {
  public update(status: string): void {
    console.log(`[CRM] Historique mis a jour avec le statut : ${status}`);
  }
}

export class EmailService implements IOrderObserver {
  public update(status: string): void {
    console.log(`[EMAIL] Email envoye : Statut de commande = ${status}`);
  }
}

// --- Le Suivi de Commande (Le Sujet découplé)
export class OrderTracker {
  private status: string = "EN_ATTENTE";
  private observers: IOrderObserver[] = [];

  public attach(observer: IOrderObserver): void {
    this.observers.push(observer);
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.status);
    }
  }

  public setStatus(newStatus: string): void {
    this.status = newStatus;
    console.log(`\n--- Le statut de la commande passe a : ${this.status} ---`);
    this.notifyObservers();
  }
}

// --- Execution propre et modulaire --- 
const tracker = new OrderTracker();

const pushService = new PushNotificationService();
const crmService = new CRMService();
const emailService = new EmailService();

tracker.attach(pushService);
tracker.attach(crmService);
tracker.attach(emailService);

tracker.setStatus("EXPEDIEE");