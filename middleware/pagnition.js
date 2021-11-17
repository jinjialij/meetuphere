function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    const totalPage = await model.countDocuments().exec();
    const totalpage = Math.ceil(totalPage / limit);

    if (startIndex < 0 || page > totalpage) {
      res.status(400).json({
        message: `page exceeds the total page: ${totalpage}`,
        status: res.statusCode,
      });
      return;
    }
    try {
      const countries = await model.find().limit(limit).skip(startIndex).exec();
      console.log(countries);
      const results = {};
      results.results = countries;
      results.totalpage = totalpage;

      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit,
        };
      }

      if (page < totalpage) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      res.paginatedResults = results;
      next();
    } catch (err) {
      console.log(error);
      res.status(500).json({
        message: err.message,
      });
    }
  };
}

module.exports = paginatedResults;
