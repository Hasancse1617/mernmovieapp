const Interview = require('../../models/Interview');
const { getVideoDurationInSeconds } = require('get-video-duration')

module.exports.fetchInterview = async(req,res) =>{
    const id = req.params.id;
    try {
        const response = await Interview.findOne({_id:id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(400).json({errors:[{msg: error.message}]});
    }
}

module.exports.fetchNew = async(req,res) =>{
    const id = req.params.id;
    try {
        const response = await Interview.find({_id: {$ne: id}}).sort({updatedAt: 'desc'}).limit(4);
        for (let index = 0; index < response.length; index++) {
            const du = await getVideoDurationInSeconds(`public/videos/interview/${response[index].video}`);
            var date = new Date(du * 1000);
            var hh = date.getUTCHours();
            var mm = date.getUTCMinutes();
            var ss = date.getSeconds();
            if(hh === 0 && mm === 0){
                response[index].video = '0:'+ss;
            }
            else if(hh === 0){
                response[index].video = mm+':'+ss;
            }
            else{
                response[index].video = hh+':'+mm+':'+ss;
            }
        }
        return res.status(200).json({response});
    } catch (error) {
        return res.status(400).json({errors:[{msg: error.message}]});
    }
}