
import React__default from 'react';
import Home from './dist/Home';

const Icon = (props: any) => {
        if (props.name === 'Home') { 
            return /*#__PURE__*/ React__default.createElement(Home, props);
        }
    };

const PropTypes: string[] = ['Home'];

export { Icon, PropTypes };
