const Activity = require('../models/Activity');
const User = require('../models/Users');


exports.createActivity = async (req, res) => {
  if (req.user.profile !== 'expert') {
    return res.status(401).json({ message: 'Unauthorized user (user needs to be an expert' });
  }
  if (!req.user.profile ) {
    return res.status(401).json({ message: 'Unauthorized user ' });
  }

  const { skill, title, description, startdate, enddate, participants } = req.body;

  if (!skill || !title || !description || !startdate || !enddate || !participants || !Array.isArray(participants)) {
    return res.status(422).json({ message: 'Data cannot be processed' });
  }


  const users = await User.find({ _id: { $in: participants } });
  const invalid = users.some(user => user.skill !== skill);
  if (invalid) {
    return res.status(422).json({ message: 'Participants must have the same skill' });
  }

  try {
    const activity = new Activity({
      skill,
      title,
      description,
      startdate,
      enddate,
      participants
    });

    await activity.save();

    return res.status(200).json({ message: 'create success' });
  } catch (err) {
    return res.status(422).json({ message: 'Data cannot be processed' });
  }
};


//update activity
exports.updateActivity = async (req, res) => {
if (req.user.profile !== 'expert') {
    return res.status(401).json({ message: 'Unauthorized user (user needs to be an expert' });
  }

  const { skill, title, description, startdate, enddate, participants } = req.body;
  if (!skill || !title || !description || !startdate || !enddate || !participants || !Array.isArray(participants)) {
    return res.status(422).json({ message: 'Data cannot be processed ' });
  }

  const users = await User.find({ _id: { $in: participants } });
  const invalid = users.some(user => user.skill !== skill);
  if (invalid) {
    return res.status(422).json({ message: 'Participants must have the same skill' });
  }

  try {

    await Activity.findByIdAndUpdate(req.params.id?.trim(), {
      skill, title, description, startdate, enddate, participants
    });

    return res.status(200).json({ message: 'update success' });
  } catch (err) {
    return res.status(422).json({ message: 'Some error, Data cannot be processed ' });
  }
};

//delete activity
exports.deleteActivity = async (req, res) => {
 if (req.user.profile !== 'expert') {
    return res.status(401).json({ message: 'Unauthorized user (user needs to be an expert' });
  }
  try {
    await Activity.findByIdAndDelete(req.params.id?.trim());
    return res.status(200).json({ message: ' delete success' });
  } catch (err) {
    return res.status(422).json({ message: 'Data cannot be processed' });
  }
};

exports.listActivities = async (req, res) => {
const skillN = req.query.skill?.trim();

  try {
    console.log(skillN); 
const activities = await Activity.find({ skill: { $regex: `^${skillN}$`, $options: 'i' } })
      .sort({ startdate: 1 })
      .populate('participants', 'id name profile skill');
    console.log(activities);
    return res.status(200).json(activities);
  } catch (err) {
    return res.status(422).json({ message: 'Data cannot be processed' });
  }
};
