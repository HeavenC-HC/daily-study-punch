import { memo } from 'react';
import { useObserver } from './hooks';

function observer(component) {
    console.info('111')
    const WrappedComponent = props => {
        return useObserver(() => component({...props}))
    }

    const memoComponent = memo(WrappedComponent);

    return memoComponent;
}

export default observer;