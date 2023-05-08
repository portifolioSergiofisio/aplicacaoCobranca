import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import Login from './paginas/Login';
import { pegarItem } from './utilidades/localStorage';
import { PrincipalProvedor } from './contexto/contextoProvedor';
import SpinnerGeral from './componentes/basicos/SpinnerGeral';

const Home = lazy(() => import('./paginas/Home'));
const Cadastro = lazy(() => import('./paginas/Cadastro'));

function UsuarioLogado({ redirecionarPara }) {
  const estaAutenticado = pegarItem('token');

  return estaAutenticado ? <Navigate to={redirecionarPara} /> : <Outlet />;
}

function RotaProtegida({ redirecionarPara }) {
  let estaAutenticado = pegarItem('token');

  return estaAutenticado ? <Outlet /> : <Navigate to={redirecionarPara} />;
}

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={
            <h1
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}>
              {`(╯°□°）╯︵ ┻━┻ 
                     Essa página não existe!`}
            </h1>
          }></Route>
        <Route element={<UsuarioLogado redirecionarPara={'/home'} />}>
          <Route path="/">
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="/cadastro"
            element={
              <Suspense fallback={<SpinnerGeral />}>
                <Cadastro />
              </Suspense>
            }></Route>
        </Route>
        <Route element={<RotaProtegida redirecionarPara={'/'} />}>
          <Route
            path="/home"
            element={
              <Suspense fallback={<SpinnerGeral />}>
                <PrincipalProvedor>
                  <Home />
                </PrincipalProvedor>
              </Suspense>
            }></Route>
        </Route>
      </Routes>
    </div>
  );
}
