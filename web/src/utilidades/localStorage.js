export const localConfig = {};

localConfig.adicionarPaginaAtual = function (pagina) {
  adicionarItem('pagina', pagina);
};

localConfig.pegarToken = function () {
  const token = pegarItem('token');
  return token || null;
};

localConfig.pegarAutorizacao = function () {
  const jwt = localConfig.checarToken();
  if (jwt.error) return;

  return {
    headers: { Authorization: `Bearer ${jwt.token}` },
  };
};

localConfig.checarToken = function () {
  const token = localConfig.pegarToken();
  if (!token) return { error: true };

  const [header, payload, signature] = token.split(/\./g);

  if (!header || !payload || !signature) {
    return {
      error: true,
    };
  }

  return { token, error: false };
};

localConfig.pegarNomeUsuario = function () {
  return pegarItem('usuario').split(' ');
};

localConfig.pegarIdUsuario = function () {
  return pegarItem('id');
};

localConfig.pegarPaginaAtual = function () {
  return pegarItem('pagina') || 'home';
};

localConfig.pegarClienteAtivo = function () {
  return pegarItem('clienteAtivo');
};

export function pegarItem(key) {
  return localStorage.getItem(key);
}

export function adicionarItem(key, value) {
  localStorage.setItem(key, value);
}

export function removerItem(key) {
  localStorage.removeItem(key);
}

export function limparLocalStorage() {
  localStorage.clear();
}
