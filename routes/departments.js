const express = require("express");
const router = express.Router();
const Department = require("../models/departments.js");

const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");
// require("@tensorflow/tfjs-node");

router.get("/getDepartments/", (req, res) => {
  // const getMetaData = async () => {
  //   const metadata = await fetch(
  //     "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json"
  //   );
  //   return metadata.json();
  // };

  // const padSequences = (sequences, metadata) => {
  //   return sequences.map((seq) => {
  //     if (seq.length > metadata.max_len) {
  //       seq.splice(0, seq.length - metadata.max_len);
  //     }
  //     if (seq.length < metadata.max_len) {
  //       const pad = [];
  //       for (let i = 0; i < metadata.max_len - seq.length; ++i) {
  //         pad.push(0);
  //       }
  //       seq = pad.concat(seq);
  //     }
  //     return seq;
  //   });
  // };

  // const loadModel = async () => {
  //   const url = `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`;
  //   const model = await tf.loadLayersModel(url);
  //   return model;
  // };

  // const predict = (text, model, metadata) => {
  //   const trimmed = text
  //     .trim()
  //     .toLowerCase()
  //     .replace(/(\.|\,|\!)/g, "")
  //     .split(" ");
  //   const sequence = trimmed.map((word) => {
  //     const wordIndex = metadata.word_index[word];
  //     if (typeof wordIndex === "undefined") {
  //       return 2; //oov_index
  //     }
  //     return wordIndex + metadata.index_from;
  //   });
  //   const paddedSequence = padSequences([sequence], metadata);
  //   const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

  //   const predictOut = model.predict(input);
  //   const score = predictOut.dataSync()[0];
  //   predictOut.dispose();
  //   return score;
  // };

  // const getSentiment = (score) => {
  //   if (score > 0.66) {
  //     return `Score of ${score} is Positive`;
  //   } else if (score > 0.4) {
  //     return `Score of ${score} is Neutral`;
  //   } else {
  //     return `Score of ${score} is Negative`;
  //   }
  // };

  // const run = async (text) => {
  //   const model = await loadModel();
  //   const metadata = await getMetaData();
  //   console.log(text);
  //   text.forEach(function (prediction) {
  //     console.log(` ${prediction}`);
  //     perc = predict(prediction, model, metadata);
  //     console.log(getSentiment(perc));
  //   });
  // };

  // run(["They embarass us", "She talks when she shoudn’t"]);
  // // setup().then(function (result) {
  // //   run(result);
  // // });

  Department.find({})
    .then((dep) => {
      res.json(dep);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving departments.",
      });
    });
});

module.exports = router;
