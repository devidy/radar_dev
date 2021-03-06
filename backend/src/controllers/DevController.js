const axios              = require('axios');
const Dev                = require('../models/Dev');
const { index }          = require('../models/utils/PointSchema');
const parseStringAsArray = require('../utils/utils');
const { update } = require('../models/Dev');

module.exports = {
    async store(request, response)  {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio} = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
            console.log(techsArray);
            const location   = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        
        }
        return response.json(dev);
    },

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },
    
    async delete(request, response) {
        const { id } = request.params;
        
        const dev = await Dev.deleteOne({"_id": ObjectId(id)} );
        
        return response.json(dev);
    }
};
