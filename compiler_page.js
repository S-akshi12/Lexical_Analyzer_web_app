document.addEventListener('DOMContentLoaded', function () {
    // Get the button and textarea elements
    let my_button = document.getElementById('lexify');
    let my_text = document.getElementById('code-input');
    let right_div = document.getElementById('right_div');
    
    // Default language
    let selectedItem = "Java";
    
    // Language selection handler
    document.getElementById('lang-names').addEventListener('change', function () {
      selectedItem = this.value;
    });
  
    // Tokenizer function for Java code
    function tokenizeJavaCode(javaCode) {
      const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[\{\}\(\)\[\];,]|(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?|\b(?:class|public|static|void|int|while|if|else|for|switch|case|break|return|System\.out\.println)\b|\b[a-zA-Z_]\w*\b|\S+/g;
      const tokens = javaCode.match(regex) || [];
      return tokens.map(token => ({ token }));
    }
  
    // Tokenizer function for C++ code
    function tokenizeCppCode(cppCode) {
      const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[\{\}\(\)\[\];,]|(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?|\b(?:class|public|private|protected|void|int|float|double|char|long|for|if|else|while|switch|case|return|std::cout|std::cin|namespace)\b|\b[a-zA-Z_]\w*\b|\S+/g;
      const tokens = cppCode.match(regex) || [];
      return tokens.map(token => ({ token }));
    }
  
    // Event listener for the Lexify button
    my_button.addEventListener('click', function () {
      let my_div = document.createElement('div');
      let arr = [];
  
      // Clear previous output
      right_div.innerHTML = '';
  
      // Tokenization based on selected language
      if (selectedItem === "Java") {
        arr = tokenizeJavaCode(my_text.value);
      } else if (selectedItem === "C") {
        arr = tokenizeCCode(my_text.value);
      } else if (selectedItem === "C++") {
        arr = tokenizeCppCode(my_text.value);
      }
  
      // Append tokens to the right_div
      arr.forEach((value) => {
        let str = value.token;
        let my_para = document.createElement('p');
        my_para.textContent = str;
        my_div.appendChild(my_para);
      });
  
      // Display token count
      let tokenCount = document.createElement('div');
      tokenCount.classList.add('token-count');
      tokenCount.textContent = `Total Tokens: ${arr.length}`;
  
      // Append token count to the right_div
      right_div.appendChild(tokenCount);
  
      // Append the token div to the right_div
      right_div.appendChild(my_div);
    });
});
