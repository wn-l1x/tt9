let loggedInUserId = null;

function setLoggedInUserId(userId) {
    loggedInUserId = userId;
}

function getLoggedInUserId() {
    return loggedInUserId;
}

module.exports = { setLoggedInUserId, getLoggedInUserId };