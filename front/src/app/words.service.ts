import { Injectable } from '@angular/core';
import { Word } from './word';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  private wordsUrl = '/words.json';
  private words: Word[] = [];

  constructor() {}

  loadWords(): Observable<{ words: string[] }> {
    return new Observable<{ words: string[] }>((observer) => {
      fetch(this.wordsUrl).then((response) => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const pump = () => {
          reader?.read().then(({ done, value }) => {
            if (done) {
              try {
                observer.next(JSON.parse(buffer));
                observer.complete();
                return;
              } catch (e: any) {
                observer.error('error while parsing json' + e.message);
              }
            } else {
              buffer += decoder.decode(value, { stream: true });
              try {
                observer.next(JSON.parse(buffer));
                buffer = '';
              } catch (error) {}
            }
          });
        };
        pump();
      });
    });
  }

  getWords(): Observable<Word[]> {
    return this.loadWords().pipe(
      map((words) => {
        return words.words.map((word, index) => {
          return {
            rank: index + 1,
            word: word,
            phrases: [],
            translation: '',
          };
        });
      })
    );
  }
}
