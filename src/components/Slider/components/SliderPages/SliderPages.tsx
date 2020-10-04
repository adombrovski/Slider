import * as React from 'react';
import { FC } from 'react';
import { ActiveSlide } from '../../types';
import './SliderPages.css';

interface ISliderPages {
    slides: React.ReactNode[]
    activeSlide: ActiveSlide
    moveToSlide: (i: number) => void
}

const SliderPages: FC<ISliderPages> = (p) => (
    <div
        className={'sliderPages'}>
        {
            p.slides.map((slide, i) => (
                <span
                    key={i}
                    className={(p.activeSlide === i) ? 'activePage' : 'notActivePage'}
                    onClick={() => p.moveToSlide(i)} />
            ))
        }
    </div>
);

export default SliderPages;