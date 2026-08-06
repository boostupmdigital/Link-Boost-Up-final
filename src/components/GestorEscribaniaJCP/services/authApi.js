const API_URL = process.env.REACT_APP_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error(
      "Falta configurar REACT_APP_API_URL en el archivo .env"
    );
  }

  return API_URL;
}

/**
 * Envía una solicitud al backend de Apps Script.
 */
async function postToApi(payload) {
  const response = await fetch(getApiUrl(), {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `No fue posible comunicarse con el servidor. Código: ${response.status}`
    );
  }

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "El servidor devolvió una respuesta que no tiene formato JSON."
    );
  }

  if (!data.ok) {
    throw new Error(
      data.message || "La operación no pudo completarse."
    );
  }

  return data;
}

/**
 * Envía a Apps Script el ID token que Google entrega al frontend.
 */
export async function loginWithGoogle(googleIdToken) {
  if (!googleIdToken) {
    throw new Error("No se recibió la credencial de Google.");
  }

  return postToApi({
    action: "login",
    idToken: googleIdToken,
  });
}

/**
 * Comprueba que el token de sesión interno todavía sea válido.
 */
export async function validateSession(sessionToken) {
  if (!sessionToken) {
    throw new Error("No se recibió el token de sesión.");
  }

  return postToApi({
    action: "validateSession",
    sessionToken,
  });
}

/**
 * Invalida la sesión en Apps Script.
 */
export async function logoutFromApi(sessionToken) {
  if (!sessionToken) {
    return {
      ok: true,
    };
  }

  return postToApi({
    action: "logout",
    sessionToken,
  });
}