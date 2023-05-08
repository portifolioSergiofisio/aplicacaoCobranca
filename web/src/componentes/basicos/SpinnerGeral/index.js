import { FadeLoader } from 'react-spinners';
import style from './styles.module.css';

export default function SpinnerGeral() {
  return (
    <div className={style.spinnerGeral}>
      <FadeLoader color="#da0175" height={30} margin={15} radius={10} width={4} />
    </div>
  );
}
