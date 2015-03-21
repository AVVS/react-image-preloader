'use strict';

var React = require('react');
var resolveImageCache = {};

var ImagePreloader = React.createClass({

    displayName: 'ImagePreloader',

    getInitialState: function () {
        return {
            hasLoaded: false
        };
    },

    resolveImage: function (props) {
        var props = props || this.props;
        var src = props.src;

        if (typeof resolveImageCache[src] === 'boolean' && this.isMounted()) {
            return this.setState({ hasLoaded: resolveImageCache[src] });
        }

        var image = new Image();

        /**
         * If you need to do CORS requests and headers are not allowing you to
         */
        if (props.anonymous) {
            image.crossOrigin = 'Anonymous';
        }

        // images has loaded
        image.onload = this.onLoad;

        // image failed to load
        image.onabort = this.onError;
        image.onerror = this.onError;

        // set src
        image.src = props.src;

        this.setState({ image: image });
    },

    componentDidMount: function() {
        this.resolveImage();
    },

    onLoad: function() {
        if (this.isMounted()) {
            resolveImageCache[this.props.src] = true;
            this.setState({ hasLoaded: true });
        }
    },

    onError: function(err) {
        if (this.isMounted()) {
            resolveImageCache[this.props.src] = false;
            this.setState({ hasLoaded: false });
        }
    },

    componentWillReceiveProps: function (props) {
        var img = this.state.image;
        if (img) {
            img.onload = null;
            img.onerror = null;
            img.onabort = null;
        }
        this.resolveImage(props);
    },

    render: function () {
        return (<img
                    className={this.props.className || ''}
                    src={this.state.hasLoaded ? this.props.src : this.props.fallback}
                />);
    }

});

module.exports = ImagePreloader;
