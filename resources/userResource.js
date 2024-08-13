const userResource = (user) => {
    return {
        username: user.username,
        email: user.email,
    }
}

module.exports = userResource