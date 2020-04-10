const app = require("./app")
let PORT = process.env.PORT || 1234


app.listen(PORT, () => console.log(`server started on ${PORT} Port Number`))