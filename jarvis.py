import openai

def open_file(filepath):
  with open(filepath, 'r', encoding='utf-8') as infile:
    return infile.read()

openai.api_key = open_file('openai_API_KEY.txt')

def gpt3_completion(prompt, engine='text-davinci-002', temp=0.7, top_p=1.0, tokens=400, freq_pen=0.0, press_pen=0.0, stop=['JAX:', 'USER:']):
  # if temp is increased, sometimes GPT3 will produce USER Prompt and we don't want that.
  # stop tells GPT3 to stop when it happens.
  prompt = prompt.encode(encoding='ASCII', errors='ignore').decode()
  response = openai.Completion.create(engine=engine,
                                      prompt=prompt,
                                      temperature=temp,
                                      max_tokens=tokens,
                                      top_p=top_p,
                                      frequency_penalty=freq_pen,
                                      presence_penalty=press_pen,
                                      stop=stop)
  text = response['choices'][0]['text'].strip()
  return text

if __name__ == '__main__':
  conversation = list()

  while True:
    user_input = input('USER: ')
    conversation.append('USER: %s' % user_input)

    text_block = '\n'.join(conversation)
    prompt = open_file('conversation.txt').replace('<<BLOCK>>', text_block)
    
    prompt = prompt + '\JARVIS:'
    jarvis_response = gpt3_completion(prompt)
    print('JARVIS:', jarvis_response)
    conversation.append('JARVIS: %s' % jarvis_response)
