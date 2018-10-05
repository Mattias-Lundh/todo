TODO DOCUMENTATION

-tools used in project
the todo app is written in html, css and javascript without any libraries or frameworks.

-code structure
1 HTML file, 1 css file and 2 js files. All css and js code is linked to html as external resources.
We use two script files to take care of the javaScript. The eventSetup.js script is responsible for 
the setup of all eventListeners. The todo.js script contains all eventhandlers, functions to filter data, 
functions to create objects, functions to update the UI. It also contains various function that manipulate 
behaviour, for example: showing/hiding buttons, setting borders and clearing content.
We've tried to follow 
the single responsibility principle, that results in more functions with the benefit of higher readablility.

-differences
The todo app has few differences from the original, those differences are small, such as the border color 
strength of the selected filter, the look of the tick, and the "x" font of the delete button. We had to draw 
a line as to how exact we wanted to app to be and the remaining differences did not make it passed that line.

-code aspect - update..()
There are relationships between the states of elements, e.g. a ticked todo item is synonymous with a strikethrough state 
of its text. The functions that start with the word "update" all follow a similar pattern: they look upon the state of 
the DOM and sets the proper state of elements, considering their relationships. 
These functions can now be called on various events to make sure that the state is updated to a desired state.