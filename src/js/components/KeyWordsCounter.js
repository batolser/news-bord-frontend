export default class KeyWordsCounter {
  constructor(keywords_all, keyword_1, keyword_2, keywords_others){
this.keywords_all = keywords_all;
this.keyword_1 = keyword_1;
this.keyword_2 = keyword_2;
this.keywords_others = keywords_others;
  }

  sortKeywords(keywords){
    const arr = [];
    for (let item in keywords) {
      arr.push([item])
    }

    arr.sort(function(a, b) {
      return a[1] - b[1];
    })
    return arr;
  }

  renderKeyWords(allArticles, sortedKeywords) {
    let keywords;
    if (0 < sortedKeywords.length && sortedKeywords.length <= 3) {
      keywords = sortedKeywords.slice(0, 3);
    } else if (sortedKeywords.length > 3) {
      keywords = [sortedKeywords[0], sortedKeywords[1], sortedKeywords.length - 2];
    }
    this.keywords_all.textContent = allArticles;
    
    if (keywords.length === 1) {
      this.keyword_1.textContent = keywords[0][0];
      this.keyword_2.textContent = '';
      this.keywords_others.textContent = '';
    } else if (keywords.length === 2) {
      this.keyword_1.textContent = keywords[0][0];
      this.keyword_2.textContent = ` и ${keywords[1][0]}`;
      this.keywords_others.textContent = '';
    } else if (keywords.length === 3 && keywords[2].length > 1) {
      this.keyword_1.textContent = keywords[0][0];
      this.keyword_2.textContent = `, ${keywords[1][0]}`;
      this.keywords_others.textContent = ` и ${keywords[2][0]}`;
    } else {
      this.keyword_1.textContent = keywords[0][0];
      this.keyword_2.textContent = `, ${keywords[1][0]}`;
      this.keywords_others.textContent = ` и ${keywords[2]} другим`;
    }
  }
}