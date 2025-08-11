const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request
            if(req.user.userType !== "admin") {
                return res.status(403).json({ message: "Access denied" });
            }else{
                next();
            }
      
          // Proceed to the next middleware or route handler
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }

}

module.exports = authMiddleware;