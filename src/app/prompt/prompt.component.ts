import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { openAiVersions } from './prompt.defs';
import { FormsModule } from '@angular/forms';

import OpenAI from 'openai';

@Component({
  selector: 'app-prompt',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss'
})
export class PromptComponent {
  readonly versions: string[] = openAiVersions;

  readonly $gptVersion = signal<string>(openAiVersions[4]);
  readonly $apiKey = signal<string>('');
  readonly $prompt = signal<string>('');
  readonly $question = signal<string>('');
  readonly $response = signal<string>('');

  updateGptVersion(version: string): void {
    this.$gptVersion.set(version);
  }

  updateAPIKey(version: string): void {
    this.$apiKey.set(version);
  }

  updatePrompt(text: string): void {
    this.$prompt.set(text);
  }

  updateQuestion(text: string): void {
    this.$question.set(text);
  }

  updateResponse(response: string): void {
    this.$response.set(response);
  }

  async execPrompt(): Promise<void> {
    try {
      const openAi = new OpenAI({ apiKey: this.$apiKey(), dangerouslyAllowBrowser });
      const completition = await openAi.chat.completions.create({
        model: this.$gptVersion(),
        messages: [
          { role: 'system', content: this.$prompt() }, 
          { role: 'user', content: this.$question() }
        ],
        temperature: 0
      })
      
      const content = completition.choices[0].message.content?.trim() ?? '';
      if(content && content !== '') {
        this.updateResponse(content);
      } else {
        this.updateResponse('Error');
      }
    } catch (error) {
      this.updateResponse('Error');
      console.error('Error while processing prompt:', error);
    }
  }
}

const dangerouslyAllowBrowser: boolean = true;
