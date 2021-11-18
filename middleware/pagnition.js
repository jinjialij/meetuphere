function paginatedResults(model) {
  let searchOptions = {};
  let startIndex, totalResults;

  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (res.searchOptions) {
      searchOptions = res.searchOptions;
    }

    if (page && limit) {
      startIndex = (page - 1) * limit;
      // endIndex = page * limit;
    }

    if (page && limit) {
      //TO-DO: update totalpage for search results
      if (Object.entries(searchOptions).length === 0) {
        totalResults = await model.countDocuments().exec();
      } else {
        totalResults = await model.find(searchOptions).count().exec();
      }
      const totalpage = Math.ceil(totalResults / limit);

      if (startIndex < 0 || page > totalpage) {
        res.status(400).json({
          message: `page exceeds the total page: ${totalpage}`,
          status: res.statusCode,
        });
        return;
      }
      try {
        const data = await model
          .find(searchOptions)
          .limit(limit)
          .skip(startIndex)
          .exec();
        const results = {};
        results.results = data;
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
    } else {
      try {
        const result = await model.find(searchOptions).exec();
        res.paginatedResults = result;
        next();
      } catch (err) {
        res.status(500).json({
          message: err.message,
          statusCode: res.statusCode,
        });
        return;
      }
    }
  };
}

module.exports = paginatedResults;
