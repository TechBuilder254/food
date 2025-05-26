exports.verifyAdmin = (req, res, next) => {
    if (!req.session.adminId) {
        return res.status(401).json({ message: 'Access denied' });
    }
    next();
};