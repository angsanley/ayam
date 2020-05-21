const WebpackGtagPlugin = require('webpack-gtag-plugin');

const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "GA_TRACKING_ID";

module.exports = {
    configureWebpack: {
        plugins: [
            new WebpackGtagPlugin({ id: GA_TRACKING_ID })
        ]
    }
}
