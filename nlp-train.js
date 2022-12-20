const { NlpManager } = require("node-nlp");
const fs = require("fs");
let dataSet = [];

fs.readFile("./csvjson.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  dataSet = [...JSON.parse(jsonString)];
  const manager = new NlpManager({ languages: ["en"], forceNER: true });
  // Adds the utterances and intents for the NLP

  function runLearner() {
    dataSet.map((data, index) => {
      // console.log(data, typeof data.text, index, typeof data);
      manager.addDocument("en", data.comment + "", data.label);
    });
  }
  runLearner();

  // Train also the NLG
  manager.addAnswer("en", "sadness", "Not Satisfied!");
  manager.addAnswer("en", "anger", "Angry!");
  manager.addAnswer("en", "love", "Liked the work!");
  manager.addAnswer("en", "joy", "Happy!");
  manager.addAnswer("en", "fear", "Have doubt");
  // manager.load("model.nlp");
  // Train and save the model.
  return (async () => {
    await manager.train();
    manager.save("emotions.nlp");
    const response = await manager.process(
      "en",
      "i started feeling sentimental about dolls i had as a child and so began a collection of vintage barbie dolls from the sixties"
    );
    console.log(response);
    return response;
  })();
});
