import { compose, onlyUpdateForPropTypes, withContext } from 'recompose';
import React from 'react';
import PropTypes from 'prop-types';
import { inject, listen } from '@k-ramel/react';
import router from 'hoc-little-router';
import loaderHoc from 'hoc-react-loader/build/core';

function component (ref) {
    if ( ref === void 0 ) ref = {};
    var optimize = ref.optimize; if ( optimize === void 0 ) optimize = true;

    return function (Component) {
    var hocs = [];
    if (optimize && Component.propTypes) 
        { hocs.push(onlyUpdateForPropTypes); }
    return compose.apply(void 0, hocs)(Component);
};
}

var LoadingIndicator = function () { return React.createElement('div'); };
var LoadingIndicator$1 = component()(LoadingIndicator)

function container (ref) {
    if ( ref === void 0 ) ref = {};
    var screenName = ref.screenName;
    var name = ref.name;
    var listeners = ref.listeners;
    var form = ref.form;
    var mapStore = ref.mapStore;
    var loader = ref.loader;

    var hocs = [];
    if (screenName) 
        { hocs.push(router.absolute(screenName)); }
    if (listeners) 
        { hocs.push(listen(listeners, screenName || name)); }
    if (form) {
        hocs.push(withContext({
            form: PropTypes.string
        }, function (props) { return ({
            form: props.form || form
        }); }));
    }
    if (mapStore) 
        { hocs.push(inject(mapStore)); }
    if (loader) {
        var options = {
            LoadingIndicator: LoadingIndicator$1
        };
        if (typeof loader === 'string') {
            options.print = [loader];
        }
        hocs.push(loaderHoc(options));
    }
    return compose.apply(void 0, hocs);
}

export { container, component };
