import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import { Pixels, ActiveSlide } from '../types';

interface SliderContentProps {
    children: React.ReactNode[]
    width: Pixels
    moveToPX: Pixels
    activeSlide: ActiveSlide
    nextSlide: () => void
    prevSlide: () => void
    moveToActSlide: () => void
}

const SliderContent: FC<SliderContentProps> = (p) => {
    const [moveStart, setMoveStart] = useState<Pixels>(0);
    const [moveEnd, setMoveEnd] = useState<Pixels>(0);
    const [moveTo, setMoveTo] = useState<Pixels>(0);
    const [lastMove, setLastMove] = useState<Pixels>(0);

    const [move, setMove] = useState<Pixels>(0);

    const moveToSlide = () => {
        setMoveTo(p.moveToPX);
        setLastMove(p.moveToPX);
    }

    useEffect(() => moveToSlide(), [p.moveToPX]);

    useEffect(() => {
        moveTo !== 0 && p.moveToActSlide()
    }, [p.width])

    const startMove = (v: Pixels) => {
        setMoveStart(v);
        setMoveEnd(0);
    }

    const falseSwipe = () => {
        moveToSlide();
        setMoveStart(0);
    }

    const endMove = (v: Pixels) => {
        setMoveStart(0);
        setMoveEnd(v);
        setLastMove(moveTo);

        moveDirection(v) === 'left' ? p.prevSlide() :
            moveDirection(v) === 'right' ? p.nextSlide() : falseSwipe();
    }

    const checkSliderLimit = (v: Pixels) => {
        const limit = (p.width / p.children.length) * (p.children.length - 1);
        limit > v && setMoveTo(v);
    }

    const moveContent = (v: Pixels) =>
        (lastMove <= 0) ? setMoveTo(moveStart - v) :
            (lastMove > 0) && checkSliderLimit(lastMove + (moveStart - v));

    const firstMove = (v: Pixels) => (moveStart > 0 && moveEnd === 0) && moveContent(v);

    const moveDirection = (v: Pixels) =>
        (moveStart - v > 200) ? 'right' : (moveStart - v < -200) && 'left';

    return (
        <div
            style={{
                transform: `translateX(-${moveTo}px)`,
                transition: `transform ease-out ${(moveStart > 0) ? 0 : 0.3}s`,
                width: `${p.width}px`,
                display: 'flex'
            }}
            onMouseMove={e => firstMove(e.clientX)}
            onMouseDown={e => {
                e.preventDefault();
                startMove(e.clientX);
            }}
            onMouseUp={e => endMove(e.clientX)}
            onMouseLeave={e => moveStart && endMove(e.clientX)}

            onTouchStart={e => startMove(e.targetTouches[0].clientX)}
            onTouchMove={e => {
                firstMove(e.targetTouches[0].clientX);
                setMove(e.targetTouches[0].clientX);
            }}
            onTouchEnd={() => endMove(move)}
        >
            {
                p.children
            }
        </div >
    );
}

export default SliderContent;