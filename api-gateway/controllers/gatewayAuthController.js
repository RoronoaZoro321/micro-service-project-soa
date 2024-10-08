const catchAsync = require("../../common/src/utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.AUTH_SERVICE_URL}api/v1/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
            mode: "same-origin",
            redirect: "follow",
            credentials: "include",
        }
    );

    const data = await response.json();

    const { token, cookieOptions } = data;

    if (data.status === "success") {
        // Convert expires from string back to Date object
        cookieOptions.expires = new Date(cookieOptions.expires);

        // don't send pin back to client
        data.data.user.pin = undefined;

        res.cookie("sessionId", token, cookieOptions);

        res.status(response.status).json({
            status: "success",
            data: {
                detail: data.data,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data,
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.AUTH_SERVICE_URL}api/v1/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        }
    );

    const data = await response.json();

    const { token, cookieOptions } = data;

    if (data.status === "success") {
        // Convert expires from string back to Date object
        cookieOptions.expires = new Date(cookieOptions.expires);

        // don't send pin back to client
        data.data.user.pin = undefined;
        

        // set cookie to local storage
        res.cookie("sessionId", token, cookieOptions);
        // const userSession = res.cookie("user", "John Doe");

        // // set userSession to local storage
        // localStorage.setItem("userSession", JSON.stringify(user.Session));

        // console.log("userSession", userSession);

        res.status(response.status).json({
            status: "success",
            data: {
                detail: data.data,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});

exports.logout = catchAsync(async (req, res, next) => {
    await fetch(`${process.env.AUTH_SERVICE_URL}api/v1/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    res.cookie("sessionId", "loggedout", {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: false,
        // secure: process.env.NODE_ENV == "production",
    });

    res.status(200).json({
        status: "success",
    });
});
