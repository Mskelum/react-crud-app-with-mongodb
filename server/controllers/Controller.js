const User = require("../model/Model");

const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.error(err);
        return next(err);
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
}

const addUser = async (req, res, next) => {
    
    const { name, email, age, address } = req.body;

    let user;

    try {
        user = new User({ name, email, age, address });
        await user.save();
    } catch (err) {
        console.error(err);
        return next(err);
    }

    if (!user) {
        return res.status(500).json({ message: "Unable to add user" });
    }

    return res.status(200).json({ user });
}

const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.error(err);
        return next(err);
    }

    if (!user) {
        return res.status(500).json({ message: "User not find" });
    }

    return res.status(200).json({ user });
}

const updateUser = async (req, res, next) => {

    const id = req.params.id;
    const { name, email, age, address } = req.body;
    let user;

    try {
        user = await User.findByIdAndUpdate(id,
            { name:name, email:email, age:age, address:address }
        );
        user = await user.save();
    } catch (err) {
        console.error(err);
        return next(err);
    }

    if (!user) {
        return res.status(500).json({ message: "User can not update" });
    }

    return res.status(200).json({ user });
}

const deleteUser = async (req, res, next) => {

    const id = req.params.id;
    let user;

    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        return next(err);
    }

    if (!user) {
        return res.status(500).json({ message: "User can not delete" });
    }

    return res.status(200).json({ user });

}

exports.getById = getById;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
