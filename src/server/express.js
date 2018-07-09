import express from "express"
import path from "path"

/* this express.js file is required in server/main.js
and is compiled by babel-register */


/*---------------------------------------------------------------------*/

const server = express()

/*---------------------------------------------------------------------*/
/* pull webpack from node_modules */
const webpack = require("webpack")

/* */
const config = require("../../config/webpack.dev.js")

/* use compile rules from our webpack.dev.js file */
const compiler = webpack(config)

/*---------------------------------------------------------------------*/

/* webpack-dev-middleware package allows compile and config details above*/
const webpackDevMiddleware =
require("webpack-dev-middleware")(
  compiler,
  config.devServer
)

/* auto compile */
const webpackHotMiddleware =
require("webpack-hot-middleware")(compiler)

/* server looks at webpack's devServer config and compile rules */
server.use(webpackDevMiddleware)

/* hot, dev, static = order counts */
server.use(webpackHotMiddleware)

/* Direct express to our build dir that webpack created */
const staticMiddleware = express.static("dist")

/* Express server points to build dir */
server.use(staticMiddleware)


/*---------------------------------------------------------------------*/

server.listen(3000, () => {
  console.log("Server is listening on port 3000...")
})
