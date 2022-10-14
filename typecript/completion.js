function gpt3_completion(prompt, 
                         model='text-davinci-002', 
                         temp=0.7, 
                         top_p=1.0, 
                         tokens=400, 
                         freq_pen=0.0, 
                         press_pen=0.0, 
                         stop=['JARVIS:', 'USER:']){
  (async () => {
    const gptResponse = await openai.createCompletion( {model: model,
                                                        prompt: prompt,
                                                        max_tokens: tokens,
                                                        temperature: temp,
                                                        top_p: top_p,
                                                        presence_penalty: press_pen,
                                                        frequency_penalty: freq_pen,
                                                        stop: stop} );
  })();
  const text = response.data.choices[0].text;
  return text;
}

function open_file(file_path){
  const fs = require('fs');
  fs.readdir(file_path, (_, files) => {
    files.forEach(file => {
      return file;
    });
  });
}

const { Configuration, OpenAIApi } = require("openai");

// get apikey
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// openai.api_key
const openai = new OpenAIApi(configuration);

// conversation.txt path
conv_path = "C:/Users/ariel/OneDrive/Documents/GitHub/GPT3-TPC/conversation.txt"

// conversation
var conversation = new Array();

while(true){
  var userInput = prompt('USER: ');
  conversation.push('USER: ' + userInput);

  var textBlock = '\n'.join(conversation);
  var prompt = open_file(conv_path).replace('<<BLOCK>>', textBlock);

  prompt = prompt + 'JARVIS:';
  jarvisResponse = gpt3_completion(prompt);
  print('JARVIS:', jarvisResponse);
  conversation.append('JARVIS: '+ jarvisResponse);
}

