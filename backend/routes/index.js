// Khai báo các routes ở đây
const ExampleRouter = require('./example')

function route(app) {
    //khai báo các api sẽ sử dụng tương ứng với routes tại đây
    app.use("/api/example",ExampleRouter)
}

module.exports = route;