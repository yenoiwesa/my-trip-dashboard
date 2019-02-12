import React from 'react';

import './Mode.scss';
import TrainLogo from '../assets/logo-train.svg';
import FerryLogo from '../assets/logo-ferry.svg';
import BusLogo from '../assets/logo-bus.svg';
import LightRailLogo from '../assets/logo-lightrail.svg';

function Mode(props) {
    const { mode, small, className } = props;

    let src;
    let alt;
    switch (mode) {
        case 'train':
            src = TrainLogo;
            alt = 'Train logo';
            break;
        case 'ferry':
            src = FerryLogo;
            alt = 'Ferry logo';
            break;
        case 'bus':
            src = BusLogo;
            alt = 'Bus logo';
            break;
        case 'light rail':
            src = LightRailLogo;
            alt = 'Light rail logo';
            break;

        default:
            break;
    }

    return <img className={`Mode ${className || ''} ${small ? 'Mode-small' : ''}`} src={src} alt={alt} />;
}

export default Mode;
