import { users } from "@/data/users";

export interface User {
  id: string;
  email: string;
  name: string;
  cognome: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// TODO: SOSTITUIRE CON UN VERO JWT
const MOCK_JWT_SECRET = "super-secret-key-123"; // In a real app, this is on the server

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate network delay
    // TODO: DA RIMUOVERE IN PRODUZIONE
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Credenziali non valide");
    }

    // Calcola la scadenza a fine giornata (23:59:59.999)
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const expiration = endOfDay.getTime();

    // Create a fake JWT token: userId:expiration:secret
    const token = btoa(`${user.id}:${expiration}:${MOCK_JWT_SECRET}`);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  async logout(): Promise<void> {
    // Simulate network delay
    // TODO: DA RIMUOVERE IN PRODUZIONE
    await new Promise((resolve) => setTimeout(resolve, 200));
    return;
  },

  async getUser(token: string): Promise<User | null> {
      // Simulate validating token
      // TODO: DA RIMUOVERE IN PRODUZIONE
       await new Promise((resolve) => setTimeout(resolve, 200));
       
       if (!token) return null;

       // Basic mock validation
       try {
           const decoded = atob(token);
           const [userId, expirationStr, secret] = decoded.split(':');
           
           // Validazione segreto (molto basic)
           if (secret !== MOCK_JWT_SECRET) return null;

           // Validazione scadenza
           const expiration = parseInt(expirationStr);
           if (Date.now() > expiration) {
             return null; // Token scaduto
           }

           const user = users.find(u => u.id === userId);
           if (user) {
               const { password: _, ...userWithoutPassword } = user;
               return userWithoutPassword;
           }
       } catch (e) {
           return null;
       }
       return null;
  }
};
