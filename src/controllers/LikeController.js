const Dev = require('../models/Dev');

module.exports = {

    async store(req, res) {

        console.log(req.params.devId);
        console.log(req.headers.user);

        const { devId } = req.params;
        const { user } = req.headers;

        /* Usuário logado */
        const loggedDev = await Dev.findById(user);
        
        /* Usuário alvo - vai receber o like */
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json({ error: 'Dev not exists..'});
        }        

        if(targetDev.likes.includes(loggedDev._id)) {
            console.log("Deu match!");
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};