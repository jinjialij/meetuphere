function searchOptions() {
  return async (req, res, next) => {
    let searchOptions = {};

    if (req.query.title) {
      // console.log(req.query.title);
      searchOptions.title = new RegExp(req.query.title, "i");
      console.log(searchOptions);
    }

    //countries
    if (req.query.name) {
      searchOptions.name = new RegExp(req.query.name, "i");
    }
    if (req.query.iso2) {
      searchOptions.iso2 = new RegExp(req.query.iso2, "i");
    }

    if (req.query.fav) {
      searchOptions.fav = req.query.fav;
    }
    res.searchOptions = searchOptions;
    next();
  };
}

module.exports = searchOptions;
