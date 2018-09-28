export module StringHelper {
    export function toTitleCase(str: string) {
        //https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
        let i, j, lowers, uppers;
        str = str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        // Certain minor words should be left lowercase unless 
        // they are the first or last words in the string
        lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
            'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
        for (i = 0, j = lowers.length; i < j; i++)
            str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
                function (txt) {
                    return txt.toLowerCase();
                });

        // Certain words such as initialisms or acronyms should be left uppercase
        uppers = ['Ii', 'Iii', 'Iv'];
        for (i = 0, j = uppers.length; i < j; i++)
            str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());
        return str;
    }

    export function removeHtmlTags(str: string){
        return str.replace(/(<([^>]+)>)|(&(nbsp|amp|quot|lt|gt);)/ig, " ");
    }

    export function shortenSentence(str: string, maxStringLength: number){
        if(str.trim() === "") return str;
        let max = maxStringLength - 3; // going to add ... on the end
        let sentenceExtraSpaces = str.length > maxStringLength + 50 ? str.substring(0, maxStringLength + 50) : str;
        let sentence = sentenceExtraSpaces.replace(/ +(?= )/g,'');
        let words = sentence.split(" ");
        let shorterSentence = "";
        words.forEach((word, index) => {
            if(shorterSentence.length + word.length <= max)
                shorterSentence +=  " " + word;
        });
        return shorterSentence.trim() + "..."
    }
}