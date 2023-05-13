import { Configuration, OpenAIApi } from "openai";
import React from "react";
import { OpenAIApiKEY } from '../connection';
    const TexttoImageAiComponent = async(prompt) =>{
    const configuration = new Configuration({
        apiKey: OpenAIApiKEY,
      });
      const openai = new OpenAIApi(configuration);
        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: prompt,
        //     max_tokens:2048,
        //     temperature:1
        //   });
        
          const imageResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1920x1080",
          });
          image_url = imageResponse.data.data[0].url;
        //   console.log(image_url);
          return image_url;
        //   console.log(response.data.choices[0].text)
}

export default TexttoImageAiComponent;