const authUserRole = (authoriedRole) => {
    return (req, res, next) => {
        const { name, email, password, role } = req.body
       
        try {
            console.log("role",role);
            if (!role) {
                return res.status(400).send(`user role not found for  auth`);
            }
            if (authoriedRole.includes(role)) {
                next();
            } else {
                return res.status(400).send(`user  not authorizrd for this action!`);
            }
        } catch (error) {
            return res.status(500).send(`user role not found for user role auth`);
        }
    }
}


module.exports = authUserRole;