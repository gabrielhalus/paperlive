const Team = require('../models/teamModel');
const Contribution = require('../models/contributionModel');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get a list of all contributions belongs to the connected team
 * @route GET /api/contributions
 * @group Contributions
 * @access Private
 */
module.exports.listContributions = async (req, res) => {
  try {
    const contributions = await Team.findOne({ _id: req.teamId })
      .select('-_id contributions')
      .populate('contributions');
    return res.status(200).json(contributions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get a contribution by ID
 * @route GET /api/contributions/:contributionId
 * @group Contributions
 * @access Private
 */
module.exports.readContribution = async (req, res) => {
  try {
    const { contributionId } = req.params;
    if (!ObjectId.isValid(contributionId))
      return res.status(500).json({ error: `Invalid ID: ${contributionId}` });

    const team = await Team.findOne({ _id: req.teamId }).populate('contributions');

    if (!team) return res.status(404).json({ error: 'Team not found' });

    const contribution = team.contributions.find(
      (c) => c._id.toString() === contributionId.toString()
    );

    if (!contribution) return res.status(404).json({ error: 'Contribution not found' });

    return res.status(200).json(contribution);
  } catch (error) {}
};

/**
 * Create a new contribution and add it to the connected team
 * @route POST /api/contributions/new
 * @group Contributions
 * @access Private
 */
module.exports.createContribution = async (req, res) => {
  try {
    const contribution = await new Contribution(req.body).save();

    const result = await Team.updateOne(
      { _id: req.teamId },
      { $push: { contributions: contribution._id } }
    );

    if (result.matchedCount > 0) {
      return res.status(201).json({ message: 'Successfully created' });
    }

    return res.status(404).json({ error: 'Team not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Update a contribution by ID
 * @route PUT /api/contributions/update/:contributionId
 * @group Contributions
 * @access Private
 */
module.exports.updateContribution = async (req, res) => {
  try {
    const { contributionId } = req.params;
    if (!ObjectId.isValid(contributionId))
      return res.status(500).json({ error: `Invalid ID: ${contributionId}` });

    // Check if the contribution belongs to the team
    const team = await Team.findOne({ _id: req.teamId, contributions: { $in: [contributionId] } });
    if (!team) return res.status(404).json({ error: 'Contribution not found' });

    const result = await Contribution.updateOne({ _id: contributionId }, { $set: req.body });
    if (result.matchedCount > 0) {
      return res.status(200).json({ message: 'Successfully updated' });
    }

    return res.status(400).json({ error: 'No changes applied' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a contribution by ID
 * @route DELETE /api/contributions/delete/:contributionId
 * @group Contributions
 * @access Private
 */
module.exports.deleteContribution = async (req, res) => {
  try {
    const { contributionId } = req.params;
    if (!ObjectId.isValid(contributionId))
      return res.status(500).json({ error: `Invalid ID: ${contributionId}` });

    // Check if the contribution belongs to the team
    const team = await Team.findOne({ _id: req.teamId, contributions: { $in: [contributionId] } });
    if (!team) return res.status(404).json({ error: 'Contribution not found' });

    const result = await Contribution.deleteOne({ _id: contributionId });
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'Successfully deleted' });
    }

    return res.status(400).json({ error: 'Deletion failed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
