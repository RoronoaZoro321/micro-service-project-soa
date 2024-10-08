// const catchAsync = require("../../common/utils/catchAsync");

// function getUserId(req) {
//     return req.user._id;
// }

// exports.getProfile = catchAsync(async (req, res, next) => {
//     if (!req.user) {
//         return next(
//             new AppError(
//                 "You are not logged in! Please log in to get access.",
//                 401
//             )
//         );
//     }

//     res.status(200).json({
//         status: "success",
//         data: {
//             user: req.user,
//         },
//     });
// });

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users`,
//         {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 users: data.data.users,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.updateMe = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/updateMe`,
//         {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "User-ID": req.user._id,
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 detail: data,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.createAccount = catchAsync(async (req, res, next) => {
//     req.body.userId = getUserId(req);

//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/createAccount`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(201).json({
//             status: "success",
//             data: {
//                 detail: data,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.getAccountsByUserId = catchAsync(async (req, res, next) => {
//     req.body.userId = getUserId(req);

//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/getAccountsByUserId`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 accounts: data.data.accounts,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.getAccountById = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/getAccountById`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 account: data.data.account,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.getAccountByAccountNumber = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/getAccountByAccountNumber`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 account: data.data.account,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.deleteAccountById = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/deleteAccountById`,
//         {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     let data;
//     try {
//         const text = await response.text(); // Read response as text
//         data = text ? JSON.parse(text) : {}; // Parse JSON if it's not empty
//     } catch (error) {
//         return next(new AppError("Failed to parse JSON response", 500));
//     }

//     if (response.ok && data.status === "success") {
//         res.status(204).json({
//             status: "success",
//             data: "success delete account",
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message || "Failed to delete account",
//         });
//     }
// });

// exports.getUserById = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/getUserById`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req.body),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 user: data.data.user,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });
