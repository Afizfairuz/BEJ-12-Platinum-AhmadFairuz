const userRepository = require('../repository/userrepository');

class UserService {
    async getUserByEmail(email) {
        return userRepository.getByEmail(email);
    }

    async updateUser(email, updateData) {
        return userRepository.update(email, updateData);
    }

    async deleteUser(email) {
        return userRepository.delete(email);
    }

    async updateUserProfilePicture(email, profilePicture) {
        return userRepository.updateProfilePicture(email, profilePicture);
    }
}

module.exports = UserService;
