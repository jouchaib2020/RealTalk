import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Word } from './word';
import { WordsService } from './words.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="bg-white flex flex-col p-4 gap-y-2 rounded-lg shadow-lg">
      @for (word of words; track $index) {
      <button
        class="inline-flex items-center whitespace-nowrap rounded-xl text-base font-bold uppercase tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-transparent bg-secondary/15 text-secondary border-2 border-secondary/80 hover:bg-secondary/20 px-4 h-auto w-full justify-start py-2 sm:max-lg:w-auto sm:max-lg:px-2 border-b-2"
      >
        {{ word.rank }}: {{ word.word }}
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
