import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import styles from './styles.module.scss';

const Toast: React.FC = () => {
  return <ToastContainer toastClassName={styles['container'] as string} />;
};

export { Toast };
