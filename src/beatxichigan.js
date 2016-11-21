walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// https://github.com/panicsteve/cloud-to-butt
    // who stole it from here
    // http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			beatXichigan(node);
			break;
	}
}

function beatXichigan(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/m/g, "X");

	textNode.nodeValue = v;
}
