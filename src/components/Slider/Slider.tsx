import * as React from 'react';
import { useState, FC } from 'react';
import SliderContent from './components/SliderContent'
import SliderPages from './components/SliderPages/SliderPages';
import { ActiveSlide, Pixels } from './types';
import './Slider.css';
import useWindowSize from './hooks/useWindowSize';

interface SliderProps {
    children: any
    slideX: boolean
    infinity: boolean
}

interface IDisplay {
    activeSlide: ActiveSlide
    moveToPX: Pixels
}

const Slider: FC<SliderProps> = (p) => {
    const [display, setDisplay] = useState<IDisplay>({
        activeSlide: 0,
        moveToPX: 0
    });

    const { moveToPX, activeSlide } = display;

    const childCount = p.children.length;

    const [width] = useWindowSize();

    const moveToSlide = (s: ActiveSlide) => {
        setDisplay({
            ...display,
            activeSlide: s,
            moveToPX: s * width
        });
    }

    const nextSlide = () => {
        if (childCount - 1 === activeSlide && !p.infinity) return;
        if (activeSlide === childCount - 1) return moveToSlide(width - width);
        moveToSlide(activeSlide + 1);
    }

    const prevSlide = () => {
        if (0 === activeSlide && !p.infinity) return;
        if (activeSlide === 0) return moveToSlide(childCount - 1);
        moveToSlide(activeSlide - 1);
    }

    return (
        <div className={'slider'} >
            <SliderContent
                moveToPX={moveToPX}
                width={width * childCount}
                activeSlide={activeSlide}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                moveToActSlide={() => moveToSlide(activeSlide)}>
                {
                    React.Children.map(p.children,
                        child => {
                            return React.cloneElement(child,
                                {
                                    style: {
                                        width: width + 'px'
                                    },
                                    className: 'slide'
                                }
                            );
                        })
                }
            </SliderContent>

            {
                p.slideX && <SliderPages
                    slides={p.children}
                    activeSlide={activeSlide}
                    moveToSlide={moveToSlide} />
            }
        </div>
    );
}

export default Slider;