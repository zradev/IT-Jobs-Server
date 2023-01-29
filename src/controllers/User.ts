import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const duplicateEmail = await User.findOne({ email: email });
    if (duplicateEmail) return res.status(409).send({ message: "User with given Email already exist!" });

    const duplicateUsername = await User.findOne({ username: username });
    if (duplicateUsername) return res.status(409).send({ message: "User with given Username already exist!" });

    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPwd = await bcrypt.hash(password, salt);
        const result = await User.create({
            ...req.body,
            password: hashedPwd
        });
        console.log(result);
        res.status(201).send({ message: "User created successfully" });
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: "User not Found" })))
        .catch((error) => res.status(500).json({ error }));
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => (users ? res.status(200).json({ users }) : res.status(404).json({ message: "Users not Found" })))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);
                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: "User not Found" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ message: "User Deleted Successfully" }) : res.status(404).json({ message: "User not Found" })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, getUser, getAllUsers, updateUser, deleteUser };
