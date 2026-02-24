import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

/**
 * Verifica se un token JWT è presente e non è scaduto.
 * param token Il token stringa da verificare.
 * returns boolean true se il token è valido, false altrimenti.
 */

export const verifyToken = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    // Verifica se il tempo di scadenza è maggiore del tempo attuale
    return decoded.exp > currentTime;
  } catch (error) {
    // Se il decoding fallisce, il token non è valido
    return false;
  }
};
