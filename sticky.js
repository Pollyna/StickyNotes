window.SA = {
    
	addEvent : function(element, evType, fn, useCapture){
		if (element.addEventListener) { 
            element.addEventListener(evType, fn, useCapture); 
            return true; 
        } 
		else if (element.attachEvent) { 
            var r = element.attachEvent('on' + evType, fn); 
            return r; 
        } 
		else { 
            element['on' + evType] = fn;
        } 
    },
    
    load : function() {
        var anchorSelected;
        if (document.getElementsByClassName) {
			anchorSelected =  document.getElementsByClassName("add")[0];
        } 
		else {
            var anchors = document.getElementsByTagName("a"),
                alenght = anchors.length;
        
            for (var i = 0; i < alenght; i++ ) {
                var anchor = anchors[i];
            
                if (anchor.className === "add") {
                    anchorSelected = anchor;
                }
            }
        }
       
        SA.addEvent(anchorSelected, "click", SA.addNote, false);
		var notes = document.getElementsByClassName("note");
		for(var i =0; i<notes.length; i++){
			SA.addDragHandlers(notes[i]);
			
		}
    },
    
    addNote : function(event) {
		var self = this;
        var notes = document.getElementById("notes");
        
        // Clone the node
        var newNode = document.createElement('div');
		newNode.classList.add('note');
		var newText = 		newNode.appendChild(document.createElement('div'));
		newText.classList.add('text');
		newText.setAttribute('contenteditable', true);
		
		
    	// close the node
		var close = document.createElement('div');
		close.style.zIndex = 1000;
		close.className = 'closebutton';
		close.onmousedown =null;
		close.onmouseup=null;
		close.addEventListener('click', function(event) { 	
			return 	notes.removeChild(this.parentElement);
		});
		
		newNode.appendChild(close);
		
		
		
        // Set the content of the node
        notes.appendChild(newNode);
		SA.addDragHandlers(newNode);
    },
	
	addDragHandlers: function (node){
			node.onmousedown = function(e) {
				var coords, shiftX, shiftY;
				var coords =  function getCoords(newNode){
					var box = e.target.getBoundingClientRect();

					return {
						top: box.top + pageYOffset,
						left: box.left + pageXOffset
					};
				};
				var shiftX = e.pageX - coords().left;
				var shiftY = e.pageY - coords().top;

				node.style.position = 'absolute';
				//document.body.appendChild(node);
				moveAt(e);

				node.style.zIndex = 1000;

				function moveAt(e){
					node.style.left = e.pageX - shiftX + 'px';
					node.style.top = e.pageY - shiftY + 'px';
				}
				document.onmousemove = function(e){
					moveAt(e);
				};
				node.onmouseup = function(){
					document.onmousemove = null;
					node.onmouseup = null;
				};
			}
		}
	
	
}

SA.addEvent(window, "load", SA.load, false);
