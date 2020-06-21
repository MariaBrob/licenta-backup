const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.js");

const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");
require("@tensorflow/tfjs-node");

router.post("/addComment", (req, res) => {
  const { comment, volunteer_id, date } = req.body;

  const getMetaData = async () => {
    const metadata = await fetch(
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json"
    );
    return metadata.json();
  };

  const padSequences = (sequences, metadata) => {
    return sequences.map((seq) => {
      if (seq.length > metadata.max_len) {
        seq.splice(0, seq.length - metadata.max_len);
      }
      if (seq.length < metadata.max_len) {
        const pad = [];
        for (let i = 0; i < metadata.max_len - seq.length; ++i) {
          pad.push(0);
        }
        seq = pad.concat(seq);
      }
      return seq;
    });
  };

  const loadModel = async () => {
    const url = `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`;
    const model = await tf.loadLayersModel(url);
    return model;
  };

  const predict = (text, model, metadata) => {
    const trimmed = text
      .trim()
      .toLowerCase()
      .replace(/(\.|\,|\!)/g, "")
      .split(" ");
    const sequence = trimmed.map((word) => {
      const wordIndex = metadata.word_index[word];
      if (typeof wordIndex === "undefined") {
        return 2; //oov_index
      }
      return wordIndex + metadata.index_from;
    });
    const paddedSequence = padSequences([sequence], metadata);
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    return score;
  };

  const getSentiment = (score) => {
    if (score > 0.66) {
      return `positive`;
    } else if (score > 0.4) {
      return `neutral`;
    } else {
      return `negative`;
    }
  };

  const run = async (text) => {
    const model = await loadModel();
    const metadata = await getMetaData();
    result = predict(text, model, metadata);
    sentiment = getSentiment(result);

    const newComment = new Comment({
      volunteer_id: volunteer_id,
      comment_by: volunteerby_id,
      comment: text,
      date: date,
      points: result,
      result: sentiment,
    });

    newComment
      .save()
      .then((volunteer) => {
        res.json(volunteer);
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  };

  run(comment);
});

router.get("/getComments/:id", (req, res) => {
  const { id } = req.params;

  Comment.find({ volunteer_id: id })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

module.exports = router;
