import * as tf from "@tensorflow/tfjs";

async function loadModel() {
  var model = await tf.loadLayersModel(
    "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json"
  );
}
