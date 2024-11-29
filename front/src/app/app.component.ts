import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Word } from './word';
import { WordsService } from './words.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="bg-white flex flex-col p-4 rounded-lg shadow-lg">
      @for (word of words; track $index) {
      <button class="bg-zinc-200 p-2 rounded m-2 text-lg">
        {{ word.word }}
      </button>
      }
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Real Talk Baby';
  words: Word[] = [];

  wordsService: WordsService = inject(WordsService);

  ngOnInit() {
    this.wordsService.getWords().subscribe((words) => {
      this.words = words;
    });
  }
}
