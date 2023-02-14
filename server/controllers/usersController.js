const { User } = require('..//models');

//setting up number of items to be fetched per page
const getPagination = (_page, _limit) => {
  const limit = _limit ? +_limit : 20;
  const offset = _page ? _page * limit : 0;

  return { limit, offset };
};

//get paginated data and organise it into totalItems, items, totalPages, currentPage
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

const getAllUsers = async (req, res) => {
    //get _page and _limit params from url
    const { _page, _limit } = req.query;

    //setting up number of items to be fetched
    const { limit, offset } = getPagination(_page, _limit);

    try {
        const users = await User.findAndCountAll({
            limit,
            offset
        });
        const response = getPagingData(users, _page, limit);
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllUsers
}