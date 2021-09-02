// {
//   name: "email"
//   value: "words and more words!",
//   allowedChars: "abcdefghijklmnopqrstuvwxyz2134567890!@#$%^&*()_+=~`´'\"",
//   allowedCharsMsg: "alphanumeric characters plus symbols"
//   minLen: 3,
//   maxLen: 254,
//   rules: [
//       {
//           letter: "a",
//           minOccurrences: "1",
//           maxOccurrences: "1",
//           atPosisiton: 2,3
//       },
//   ]
// }

class Validator {
  constructor(config) {
    this.config = config;
    this.errors = [];
    this.messages = {
      lenLargerThanMax: "Field '$name' exceeds maximum length of '$maxLen'",
      lenLowerThanMin: "Field '$name' has length less than minimum of '$minLen'",
      invalidCharacter: "Field '$name' only allows characters from '$allowedCharsMsg'",
      moreThanMaxOccurrences: "Field '$name' has more occurrences of character '$rules/letter' than the maximum of '$rules/maxOccurrences'",
      lessThanMinOccurrences: "Field '$name' has less occurrences of character '$rules/letter' than the minimum of '$rules/minOccurrences'",
      invalidCharPosition: "Field '$name' has a character '$rules/letter' in invalid position",
      invalidCharsPosition: "Field '$name' has multiple characters '$rules/letter' in invalid position"
    };
    this.checkLength();
    this.checkAllowedChars();
    this.checkCharOccurrences();
    this.checkCharPositions();
  }

  addMessage(name, rulePos = null) {
    let msgResult = "";
    const msgArray = this.messages[name].split("'");
    msgArray.forEach(variable => {
      if(variable[0] == "$") {
        let argument = variable.substr(1).split("/");
        if(argument.length > 1 && rulePos !== null) {
          msgResult += "'" + this.config[argument[0]][rulePos][argument[1]] + "'";
        } else {
          msgResult += "'" + this.config[argument[0]] + "'";
        }
      } else {
        msgResult += variable;
      }
    });
    this.errors.push(msgResult);
  }

  checkLength() {
    const valueLen = this.config.value.length;
    const maxLen = this.config.maxLen;
    const minLen = this.config.minLen;
    if(valueLen > maxLen) {
      this.addMessage("lenLargerThanMax");
    }
    if(valueLen < minLen) {
      this.addMessage("lenLowerThanMin");
    }
  }

  checkAllowedChars() {
    const value = this.config.value.split('');
    const allowedChars = this.config.allowedChars.split('');

    const result = value.every(char => {
       return allowedChars.some(allowedChar => {
         return char === allowedChar;
       });
    });

    if(!result) {
      this.addMessage("invalidCharacter");
    }
  }

  checkCharOccurrences() {
    const value = this.config.value.split('');
    const rules = this.config.rules;

    rules.forEach((rule, index) => {
      let count = 0;
      value.forEach(char => {
        if(char === rule.letter) {
          count++;
        }
      });
      if(rule.maxOccurrences < count) {
        this.addMessage("moreThanMaxOccurrences", index);
      } 
      if(rule.minOccurrences > count) {
        this.addMessage("lessThanMinOccurrences", index);
      }
    });
  }

  checkCharPositions() {
    const value = this.config.value.split('');
    const rules = this.config.rules;

    rules.forEach((rule, indexRule) => {
      let positions = [];
      value.forEach((char, indexValue) => {
        if(char === rule.letter &&
          !rule.atPos.some(pos => pos === indexValue)) {
          positions.push(indexRule);
        }
      });

      if(positions.length == 1) {
        this.addMessage("invalidCharPosition", indexRule);
      } else if(positions.length > 1) {
        this.addMessage("invalidCharsPosition", indexRule);
      }
    });
  }
}

export default Validator;
