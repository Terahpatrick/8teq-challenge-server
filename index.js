const app = require("./app");

// import routes
const userRoute = require("./routes/user.route");
const customerRoute = require("./routes/customer.route");
const parcelRoute = require("./routes/parcel.route");
const { asyncErrors } = require("./middlewares/asyncHandler");

// use routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/parcels", parcelRoute);

// async errors middlewares
app.use(asyncErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
