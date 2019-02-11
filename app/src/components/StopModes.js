import React from 'react';

import './StopModes.scss';
import TrainLogo from '../assets/logo-train.svg';
import FerryLogo from '../assets/logo-ferry.svg';
import BusLogo from '../assets/logo-bus.svg';
import LightRailLogo from '../assets/logo-lightrail.svg';

function StopModes(props) {
    const { modes } = props;

    return (
        <ul className={`StopModes ${props.small ? 'StopModes-small' : ''}`}>
            {modes.map(mode => {
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

                return (
                    <li key={mode}>
                        <img src={src} alt={alt} />
                    </li>
                );
            })}
        </ul>
    );
}

export default StopModes;
