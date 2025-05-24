const Activity = require('../models/Activity');

exports.getSkills = async (req, res) => {
  try {
   
    const skills = await Activity.aggregate([
      { $group: { _id: "$skill" } },
      { $project: { skill_name: "$_id", _id: 0 } }
    ]);

    return res.status(200).json(skills);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
};
