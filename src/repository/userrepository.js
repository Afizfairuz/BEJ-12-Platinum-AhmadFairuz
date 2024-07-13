class UserRepository {
    constructor() {
        this.users = []; 
    }

    async getByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    async update(email, updateData) {
        const user = await this.getByEmail(email);
        if (user) {
            Object.assign(user, updateData);
            return user;
        }
        return null;
    }

    async delete(email) {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }

    async updateProfilePicture(email, profilePicture) {
        const user = await this.getByEmail(email);
        if (user) {
            user.profilePicture = profilePicture;
            return user;
        }
        return null;
    }
}

module.exports = UserRepository;
