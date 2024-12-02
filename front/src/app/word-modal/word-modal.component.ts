import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Word } from '../word';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'word-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Modal (Desktop) -->
    <div
      *ngIf="isOpen"
      class="fixed hidden lg:flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50"
      (click)="closeModal()"
    >
      <div
        (click)="$event.stopPropagation()"
        class="relative bg-white w-full max-w-lg rounded-lg shadow-lg transition-transform duration-300"
      >
        <!-- Modal Content -->
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-4">Modal Title</h2>
          <p class="mb-4">
            This is the modal content. You can put anything here!
          </p>

          <button
            (click)="closeModal()"
            class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Sheet (Mobile) -->
    <div
      *ngIf="isOpen"
      class="bg-white fixed inset-x-0 bottom-0 z-50"
      (click)="closeModal()"
    >
      <div
        (click)="$event.stopPropagation()"
        class="bg-secondary/80 w-full rounded-t-2xl shadow-lg transition-transform duration-300"
      >
        <!-- Bottom Sheet Content -->
        <div
          class="flex items-center justify-between p-5 border border-secondary rounded-xl"
        >
          <div class="space-y-1">
            <h3 class="text-2xl font-bold opacity-70">{{ word.word }}</h3>
            <p class="text-xl font-semibold">{{ word.rank }}</p>
          </div>
          <button
            (click)="closeModal()"
            class="ml-2 max-xl:px-4 bg-blue-500  p-2 rounded-md hover:bg-blue-600"
          >
            <span class="max-xl:hidden">close</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class WordModalComponent {
  @Input() word!: Word;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
