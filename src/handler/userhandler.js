const userService = require('../service/userservice');

class UserHandler {
    async getUserByEmail(req, res) {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async updateUser(req, res) {
        const email = req.params.email;
        const updateData = req.body;
        const user = await userService.updateUser(email, updateData);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async deleteUser(req, res) {
        const email = req.params.email;
        const success = await userService.deleteUser(email);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async updateUserProfilePicture(req, res) {
        const email = req.params.email;
        const profilePicture = req.body.profilePicture;
        const user = await userService.updateUserProfilePicture(email, profilePicture);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}

module.exports = UserHandler;
