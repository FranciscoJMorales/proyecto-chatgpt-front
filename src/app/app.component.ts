import { Component } from '@angular/core';
import { ChatGptService } from './chatgpt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Message {
  class: string;
  user: boolean;
  sender: string;
  photo: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-chatgpt-front';

  promptForm: FormGroup;

  chat: Array<Message> = [];

  constructor(private chatGptService: ChatGptService, private fb: FormBuilder) {
    this.promptForm = fb.group({
      prompt: ['', Validators.required]
    });
  }

  async sendMessage() {
    if(this.promptForm.valid) {
      const value = this.promptForm.getRawValue();
      this.promptForm.reset();
      this.chat.push({
        class: "reverse",
        user: true,
        sender: "Usuario",
        photo: "./assets/images/users/5.jpg",
        message: value.prompt.trim(),
        time: this.getCurrentTime()
      });
      const response = {
        class: "",
        user: false,
        sender: "ChatGPT",
        photo: "./assets/images/users/1.jpg",
        message: '[wait]',
        time: ""
      };
      this.chat.push(response);
      const result : any = await this.chatGptService.chat(value.prompt.trim());
      console.log(result);
      response.message = result.message;
      response.time = this.getCurrentTime();
    }
  }

  keyDownFunction(event : KeyboardEvent) {
    if (event.code === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  }

  getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes : any = now.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
  
    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be displayed as 12
  
    // Ensure minutes are displayed with leading zeros (e.g., 05 instead of 5)
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }
}
