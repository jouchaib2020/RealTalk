import { Component, Input } from '@angular/core';
import { Word } from '../word';
import { NgxBottomSheetModalService } from 'ngx-bottom-sheet-modal';

@Component({
  selector: 'word-modal',
  standalone: true,
  template: `
    <div
      class=" inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-2xl border bg-background px-4 pb-6"
      style="pointer-events: auto; transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1); transform: translate3d(0px, 0px, 0px);"
    >
      <div
        (click)="closeModal()"
        (drag)="closeModal()"
        class="mx-auto mb-2 mt-4 h-2 w-[100px] rounded-full bg-muted"
      ></div>
      <div class="mx-auto w-min flex items-center gap-x-4 justify-between mb-2">
        <h2 class="mb-2 text-4xl font-bold text-primary">
          {{ word?.word }}
        </h2>
        <span class="material-symbols-outlined text-primary-depth">
          sync_alt
        </span>
        <h2 class="mb-2 text-4xl font-bold text-secondary">
          {{ word?.word }}
        </h2>
      </div>
      <div>
        <h3
          class="mb-2 pb-1 text-lg font-bold uppercase text-muted-foreground border-b-2"
        >
          Meaning
        </h3>
        <p class="mb-3 text-lg">this is an explication of the word</p>

        <h3
          class="mb-2 pb-1 text-lg font-bold uppercase text-muted-foreground border-b-2"
        >
          Examples
        </h3>
        <div class="mb-3">
          <p class="mb-1 text-lg">This is an example of the word</p>
          <p class="mb-1 text-lg">
            {{ 'This is another example of the word' }}
          </p>
          <p class="mb-1 text-lg">
            {{ 'This is another example of the word' }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class WordModalComponent {
  @Input() word!: Word | null;

  constructor(private bottomSheetService: NgxBottomSheetModalService) {}
  closeModal() {
    this.bottomSheetService.closeBottomSheet();
  }
}
