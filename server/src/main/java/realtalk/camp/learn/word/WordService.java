package realtalk.camp.learn.word;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {

    @Autowired
    private WordRepository wordRepository;

    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    public Word getWordById(Long id) {
        return wordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Word not found"));
    }

    public Word createWord(Word word) {
        return wordRepository.save(word);
    }

    public Word updateWord(Long id, Word wordDetails) {
        Word word = getWordById(id);
        word.setRank(wordDetails.getRank());
        word.setWord(wordDetails.getWord());
        word.setTranslation(wordDetails.getTranslation());
        word.setMeaning(wordDetails.getMeaning());
        word.setExamples(wordDetails.getExamples());
        return wordRepository.save(word);
    }

    public void deleteWord(Long id) {
        Word word = getWordById(id);
        wordRepository.delete(word);
    }
}
