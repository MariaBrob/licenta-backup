module.exports = {
  // mongoURL: "mongodb://localhost:27017/licenta",
  mongoURL:
    "mongodb+srv://mariabrob:alinaeremia11@licenta.rywqp.mongodb.net/licenta?retryWrites=true&w=majority",
  uristring:
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    "mongodb+srv://mariabrob:alinaeremia11@licenta.rywqp.mongodb.net/licenta?retryWrites=true&w=majority",
  secretOrKey: "secret",
};
