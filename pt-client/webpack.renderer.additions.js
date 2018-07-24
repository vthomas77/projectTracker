/* webpack.renderer.additions.js */
var fs = require("fs");
var webpack = require("webpack");
var path = require("path");

var getApiServer = function() {
    var apiServer;
    try {
        fs.accessSync("./settings.json");
        var settings = require("./settings.json");
        apiServer = settings.apiServer;
    } catch(e) {
        console.warn("settings.json does not exist");
    }
    console.warn("Using api server %s", apiServer);
    return apiServer;
};

var definePluginInstance = new webpack.DefinePlugin({
    'process.env.API_URL': JSON.stringify(getApiServer())
});

module.exports = {
    plugins: [
        definePluginInstance
    ],
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: 'html-loader'
            }
        ]
    }
}