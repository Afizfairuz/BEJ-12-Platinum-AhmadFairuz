class Common {
    static responseToFE(isSuccess, statusCode, data, errorMessage) {
        if (isSuccess) {
            return {
                statusCode: statusCode,
                payload: {
                    status: "Success",
                    data: data
                }
            };
        } else {
            return {
                statusCode: statusCode,
                payload: {
                    status: "Failed",
                    error: {
                        message: errorMessage
                    }
                }
            };
        }
    }
}

module.exports = Common;