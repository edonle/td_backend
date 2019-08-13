const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res) {

        /* Busca o id do usuário logado */
        const { user } = req.headers;

        /* Busca todas as informações do usuário no banco */
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({

            $and: [
                { _id: { $ne: user } }, /* Busca devs que não sejam igual a user */
                { _id: { $nin: loggedDev.likes } }, /* Busca devs que não estejam no array de likes */
                { _id: { $nin: loggedDev.dislikes } }, /* Busca devs que não estejam no array de dislikes */
            ],
        })

        return res.json(users);

    },

    async store(req, res) {        

        const { username } = req.body;

        /* Verifica se o usuário já existe... */
        const userExists = await Dev.findOne({ user: username });

        if(userExists) {

            return res.json(userExists);
        }

        const response = await axios.get(`http://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar  } = response.data;

        const dev = await Dev.create ({

            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
};