function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var [mimeType,tmpFile] = e.target.result.split(','); 
                
                var link = document.createElement("a");
                link.download = theFile.name;
                link.innerHTML = theFile.name;
                link.href = mimeType + ',' + cryptoStr(tmpFile);
                document.getElementById('list').appendChild(link);
            };
            
        })(f);

        reader.readAsDataURL(f);
    }
}

document.getElementById('arquivo').addEventListener('change', handleFileSelect, false);

function handleCryptFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var [mimeType,tmpFile] = e.target.result.split(','); 
                
                var link = document.createElement("a");
                link.download = theFile.name;
                link.innerHTML = theFile.name;
                link.href = mimeType + ',' + decryptoStr(tmpFile);
                document.getElementById('list-crypt').appendChild(link);
            };
            
        })(f);

        reader.readAsDataURL(f);
    }
}

document.getElementById('arquivo-crypt').addEventListener('change', handleCryptFileSelect, false);

function cryptoStr(str){
    let finalStr = "";
    for(i = 0; i< str.length; i++){
        let char = str.charAt(i);
        
        if(char === '+'){
            finalStr += '/'
        } else if(char === '/'){
            finalStr += '+'
        } else if(char === 'Z'){
            finalStr += 'a'
        } else if(char === 'z'){
            finalStr += 'A'
        } else if(char === '9'){
            finalStr += '0'
        }  else if(char === '='){
            finalStr += '='
        } else {
            let charCode = str.charCodeAt(i);
            finalStr += String.fromCharCode(charCode + 1);
        }
    }

    return finalStr;
}

function decryptoStr(str){
    let finalStr = "";
    for(i = 0; i< str.length; i++){
        let char = str.charAt(i);
        
        if(char === '+'){
            finalStr += '/'
        } else if(char === '/'){
            finalStr += '+'
        } else if(char === 'a'){
            finalStr += 'Z'
        } else if(char === 'A'){
            finalStr += 'z'
        } else if(char === '0'){
            finalStr += '9'
        } else if(char === '='){
            finalStr += '='
        } else {
            let charCode = str.charCodeAt(i);
            finalStr += String.fromCharCode(charCode - 1);
        }
    }

    return finalStr;
}