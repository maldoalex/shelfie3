module.exports = {
  //endpoint function
  getAll: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      //sql function
      .get_products()
      .then(products => res.status(200).send(products))
      .catch(error => {
        res.status(500).send({ errorMessage: "something went wrong" });
        console.log(error);
      });
  },

  getOne: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    //params is slash, query is ?

    dbInstance
      .get_product(id)
      .then(product => res.status(200).send(product))
      .catch(error => {
        console.log(error);
        res.status(500).send({ errorMessage: "something went wrong" });
      });
  },

  addOne: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { product_url, product, price } = req.body;

    dbInstance
      .add_product([product_url, product, price])
      .then(() => res.sendStatus(200))
      .catch(error => {
        console.log(error);
        res.status(500).send({ errorMessage: "something went wrong" });
      });
  },

  delete: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    dbInstance
      .delete_product(id)
      .then(() => res.sendStatus(200))
      .catch(error => {
        console.log(error);
        res.status(500).send({ errorMessage: "something went wrong" });
      });
  },

  edit: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, query, body } = req;
    console.log(req.body);
    console.log(req.query);
    dbInstance
      .edit_product([params.id, body.product])
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "something went wrong" });
        console.log(error);
      });
  }
};
