import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Word } from './word';
import { WordsService } from './words.service';
import { WordModalComponent } from './word-modal/word-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordModalComponent],
  template: `
    <div class="bg-white flex flex-col p-4 gap-y-2 rounded-lg shadow-lg">
      @for (word of words; track $index) {
      <button
        class="inline-flex items-center whitespace-nowrap rounded-xl text-base font-bold uppercase tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-transparent bg-secondary/15 text-secondary border-2 border-secondary/80 hover:bg-secondary/20 px-4 h-auto w-full justify-start py-2 sm:max-lg:w-auto sm:max-lg:px-2 border-b-2"
        (click)="openModal(word)"
      >
        {{ word.rank }}: {{ word.word }}
      </button>
      }
      <word-modal
        [word]="selectedWord!"
        [isOpen]="isModalOpen"
        (close)="closeModal()"
      ></word-modal>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'Real Talk Baby';
  words: Word[] = [];

  isModalOpen = false;
  selectedWord: Word | null = null;

  openModal(word: Word) {
    this.selectedWord = word;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedWord = null;
    this.isModalOpen = false;
  }

  wordsService: WordsService = inject(WordsService);

  ngOnInit() {
    this.wordsService.getWords().subscribe((words) => {
      this.words = words;
    });
  }
}
