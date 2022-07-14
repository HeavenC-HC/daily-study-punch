import { Tracker } from '@/which';
import { useEffect, useReducer, useRef } from 'react';



export function useObserver(view){
    const [, forceUpdate] = useReducer(x => x + 1, 1)
    const tarckerRef = useRef(null);

    if(!tarckerRef.current){
        tarckerRef.current = new Tracker(()=>{
            forceUpdate();
        })
    }

    useEffect(()=>{
        return () => {
            if(tarckerRef.current){
                tarckerRef.current.dispose();
                tarckerRef.current = null;
            }
        }
    }, [])

    return  tarckerRef.current.track(view);
}