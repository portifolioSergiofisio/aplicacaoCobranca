import Spinner from '../spinner';
import './styles.css';

export default function Botao({ classe, tipo, texto, carregando, ...botaoProps }) {
  return (
    <button className={classe} type={tipo} disabled={carregando} {...botaoProps}>
      {carregando ? <Spinner /> : texto}
    </button>
  );
}

export function BotaoTransparente({ children, ...props }) {
  return (
    <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} {...props}>
      {children}
    </button>
  );
}
