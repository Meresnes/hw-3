import * as React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime';

import styles from "./styles.module.scss";
import Loader from '@components/Loader/index';

render(<div className={styles.title}>
    adasdasdasdas
    <Loader /> </div>, document.getElementById('root'));

