class Tokenizer {
  /**
   * A tokenizer
   * @param {string} message - the message to tokenize
   * @param {string} commandChar - the command character to ignore when tokenizing message. Will just skip if it is the first character in message
   */
  constructor(message, commandChar) {
    this.message = message;
    this.commandChar = commandChar;
    this.position = 0;
    this.result = [];
    this.state = -1;
  }

  tokenize() {
    this.state = 1;
    
    this._skipCommandChar();

    while (this._hasNext()) {
      if (this._isAlphaNumeric()) {
        this._consumeAlphaNumeric();
      } else if (this._isQuotation()) {
        this._consumeQuoted();
      } else if (this._isWhiteSpace()) {
        this._consumeWhiteSpace();
      } else {
        // processing some unrecognizable char
        this._move();
      }
    }

    this.state = -1;

    return this.result;
  }

  _consumeAlphaNumeric() {
    let begin = this.position;
    let end = this.position;
    while (this._hasNext() && this._isAlphaNumeric()) {
      end = this._move();
    }

    this.result.push(this.message.substring(begin, end));
  }

  _consumeQuoted() {
    let quote = this._getCurrentChar();
    this._move(); // skip the current token
    let quoteEnd = this._search(quote);

    
    if (quoteEnd === null) {
      // quote has no ending, just ignore it
      return;
    }

    this.result.push(this.message.substring(this.position, quoteEnd));
    this._moveTo(quoteEnd);
  }

  _consumeWhiteSpace() {
    // just throw away the whitespace
    while(this._hasNext() && this._isWhiteSpace()) {
      this._move();
    }
  }

  _search(searchChar) {
    for (let i = this.position; i < this.message.length; i++) {
      if (this.message[i] === searchChar) {
        return i;
      }
    }
    
    return null;
  }

  _move() {
    return ++this.position;
  }

  _moveTo(position) {
    this.position = position;
  }

  /** Skip the given command char as we probably don't need to process it */
  _skipCommandChar() {
    if (this.commandChar === undefined) {
      return;
    }
    
    if (this._hasNext() && (this._getCurrentChar() === this.commandChar)) {
      this.position++;
    }
  }

  _isWhiteSpace() {
    return this._getCurrentChar().match('\s');
  }

  _isAlphaNumeric() {
    return this._getCurrentChar().match('[0-9a-zA-Z]');
  }

  _isQuotation() {
    return this._getCurrentChar() === "'" || this._getCurrentChar() === '"';
  }

  _getCurrentChar() {
    return this.message[this.position];
  }

  _hasNext() {
    return this.position < this.message.length;
  }
}

module.exports = Tokenizer;