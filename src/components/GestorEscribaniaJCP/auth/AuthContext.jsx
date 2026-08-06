import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginWithGoogle,
  logoutFromApi,
  validateSession,
} from "../services/authApi";

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = "jcp_session_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [sessionToken, setSessionToken] = useState(() => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY);
  });

  const [isLoading, setIsLoading] = useState(true);

  /**
   * Elimina del navegador toda la información de sesión.
   */
  const clearLocalSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);

    setSessionToken(null);
    setUser(null);
  }, []);

  /**
   * Recibe el ID token entregado por GoogleLogin.
   *
   * No autoriza al usuario directamente.
   * Envía la credencial a Apps Script para que:
   *
   * 1. Valide la identidad con Google.
   * 2. Busque el email en la hoja USUARIOS.
   * 3. Compruebe el estado y los permisos.
   * 4. Devuelva una sesión interna.
   */
  const login = useCallback(async (googleIdToken) => {
    const result = await loginWithGoogle(googleIdToken);

    if (!result.sessionToken) {
      throw new Error(
        "El servidor no devolvió un token de sesión."
      );
    }

    if (!result.user) {
      throw new Error(
        "El servidor no devolvió los datos del usuario."
      );
    }

    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      result.sessionToken
    );

    setSessionToken(result.sessionToken);
    setUser(result.user);

    return result.user;
  }, []);

  /**
   * Cierra la sesión tanto en Apps Script como en el navegador.
   */
  const logout = useCallback(async () => {
    try {
      if (sessionToken) {
        await logoutFromApi(sessionToken);
      }
    } catch (error) {
      console.error(
        "No fue posible cerrar la sesión en el servidor:",
        error
      );
    } finally {
      clearLocalSession();
    }
  }, [sessionToken, clearLocalSession]);

  /**
   * Al abrir o recargar la aplicación:
   *
   * - Busca un token previamente almacenado.
   * - Consulta Apps Script.
   * - Recupera los datos del usuario.
   * - Elimina la sesión si ya no es válida.
   */
  useEffect(() => {
    let componentIsMounted = true;

    async function restoreSession() {
      if (!sessionToken) {
        if (componentIsMounted) {
          setIsLoading(false);
        }

        return;
      }

      try {
        const result = await validateSession(sessionToken);

        if (!result.user) {
          throw new Error(
            "La sesión no contiene un usuario válido."
          );
        }

        if (componentIsMounted) {
          setUser(result.user);
        }
      } catch (error) {
        console.warn(
          "La sesión guardada ya no es válida:",
          error
        );

        if (componentIsMounted) {
          clearLocalSession();
        }
      } finally {
        if (componentIsMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      componentIsMounted = false;
    };
  }, [sessionToken, clearLocalSession]);

  const isAuthenticated = Boolean(
    user && sessionToken
  );

  /**
   * useMemo evita crear innecesariamente un objeto nuevo
   * en cada render.
   */
  const contextValue = useMemo(
    () => ({
      user,
      sessionToken,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [
      user,
      sessionToken,
      isAuthenticated,
      isLoading,
      login,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider."
    );
  }

  return context;
};