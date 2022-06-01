import styles from './counter.module.scss';

import {increase, decrease} from '../../counterSlice';
import {useDispatch, useSelector} from 'react-redux';

function Counter() {
    const dispatch = useDispatch();
    const result = useSelector(state => state.counter.value);

    const handleIncrementClick = () => {
        dispatch(increase())
    }
    
    const handleDecrementClick = () => {
        dispatch(decrease())
    }

    return (
        <div className={`${styles.examStyle}`}>
            This is Counter Component with SCSS
            <h1>{`Result: ${result}`}</h1>
            <button onClick={handleDecrementClick}>decrease</button>
            <button onClick={handleIncrementClick}>increase</button>
        </div>
    )
}

export default Counter