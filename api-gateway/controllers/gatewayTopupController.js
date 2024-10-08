// const catchAsync = require("../../common/utils/catchAsync");
// const AppError = require("../../common/utils/appError");


// function getUserId(req) {
//     return req.user._id;
// }

// async function checkAccountOwnership(userId, accountId) {
//     const req_body = {
//         userId,
//         accountId,
//     };

//     const response = await fetch(
//         `${process.env.USER_SERVICE_URL}api/v1/users/checkAccountOwnership`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req_body),
//         }
//     );

//     const data = await response.json();

//     console.log("data", data);
//     return data.result;
// }

// async function getAccountIdByNumber(accountNumber) {
//     try {
//         const response = await fetch(
//             `${process.env.USER_SERVICE_URL}api/v1/users/getAccountByAccountNumber`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ accountNumber }),
//             }
//         );

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();

//         // console.log("data", data);

//         return {
//             accountId: data.data.account._id,
//             userId: data.data.account.userId,
//         };
//     } catch (error) {
//         return error;
//     }
// }

// exports.topup = catchAsync(async (req, res, next) => {
//     const { accountNumber, code } = req.body;

//     const { accountId } = await getAccountIdByNumber(accountNumber);

//     // check if accountId belongs to the user
//     const isOwner = await checkAccountOwnership(getUserId(req), accountId);

//     if (!isOwner) {
//         return next(new AppError("You do not own the account", 400));
//     }

//     const response = await fetch(
//         `${process.env.TOPUP_SERVICE_URL}api/v1/topup`,
//         {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ accountId, code: code }),
//         }
//     );

//     const data = await response.json();

//     console.log(data);

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

// exports.createTopup = catchAsync(async (req, res, next) => {

//     let { code, amount } = req.body;

//     req.body.code = code; // replace the code with encrypted version
//     req.body.amount = parseFloat(amount);
    

//     const response = await fetch(
//         `${process.env.TOPUP_SERVICE_URL}api/v1/topup/createTopup`,
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
//                 topup: data.data.topup,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

// exports.getAllTopup = catchAsync(async (req, res, next) => {
//     const response = await fetch(
//         `${process.env.TOPUP_SERVICE_URL}api/v1/topup/topupAll`,
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
//             results: data.results,
//             data: {
//                 topups: data.data.topups,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });
