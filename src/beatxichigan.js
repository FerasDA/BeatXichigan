var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var wordsToReplace = new RegExp('(Michigan|michigan)', 'g');
            var replacedText = text.replace(wordsToReplace, 'The State Up North');
            
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}

// Reusable generic functions I reused from jsfiddle.net/7Vf5J/
var rx = new RegExp('(SCRIPT|STYLE)')
function surroundInElement(el, regex, surrounderCreateFunc) {
    // script and style elements are left alone
    if (!rx.test(el.tagName)) {
        var child = el.lastChild;
        while (child) {
            if (child.nodeType == 1) {
                surroundInElement(child, regex, surrounderCreateFunc);
            } else if (child.nodeType == 3) {
                surroundMatchingText(child, regex, surrounderCreateFunc);
            }
            child = child.previousSibling;
        }
    }
}

function surroundMatchingText(textNode, regex, surrounderCreateFunc) {
    var parent = textNode.parentNode;
    var result, surroundingNode, matchedTextNode, matchLength, matchedText;
    while ( textNode && (result = regex.exec(textNode.data)) ) {
        matchedTextNode = textNode.splitText(result.index);
        matchedText = result[0];
        matchLength = matchedText.length;
        textNode = (matchedTextNode.length > matchLength) ?
            matchedTextNode.splitText(matchLength) : null;
        regex.lastIndex = 0;
        surroundingNode = surrounderCreateFunc(matchedTextNode.cloneNode(true));
        parent.insertBefore(surroundingNode, matchedTextNode);
        parent.removeChild(matchedTextNode);
    }
}

function createSpan(matchedTextNode) {
    var el = document.createElement("span");
    el.style.color = "red";
    el.style.textDecoration = "line-through";
    el.appendChild(matchedTextNode);
    return el;
}

function wrapWords(container, words) {
    for (var i = 0, len = words.length; i < len; ++i) {
        surroundInElement(container, new RegExp(words[i]), createSpan);
    }
}

wrapWords(document.getElementsByTagName("body")[0], ["m", "M", "Wolverines"]);
