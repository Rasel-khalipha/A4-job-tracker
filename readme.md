1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

answer: a. getElementById:-
_ Selects a single element using its unique id.
_ A single element object or null (if not found).
_ Direct access to a specific, unique element.
_ Generally the fastest because it uses a direct lookup table.

        b. getElementsByClassName:-
            * Selects all elements that share a specific class name.
            * A live HTML collection.
            * It is live, meaning if you add or remove elements with that class in the DOM later, the  collection updates automatically.
            * Must access specific elements using an index. (like- [0]).

        c. querySelector / querySelectorAll:-
            * Selects elements using css selectors. (like- .class, #id, p, )
            * querySelector returns only the first matching element.
            * querySelectorAll returns all matching elements as a static NodeList.
            * The NodeList is static. it is a snapshot of DOM at the time of the call and does not update automatically if the DOM changes later.
            * Most powerful and versatile option, allowing complex queries that the getElementBy* method cannot perform.

2. How do you create and insert a new element into the DOM?

answer: a. New element create: const div = document.createElement("div")
b. insert a new element: document.body.appendChild(div)

3. What is Event Bubbling? And how does it work?

answer: When you click on a child element, the event first runs on that element, then on its parent, then grandparent and so on. Until it reaches the document.

If you click a button-
a. First button child event runs.
b. Then event bubbles up to parent div.
c. Then it continues upward (like - body -> html -> document).

Event flow in javascript-

There are 3 phases of event flow:

        * Capturing Phase (top to down).
        * Target phase.
        * Bubbling Phase (bottom to top).

4. What is Event Delegation in JavaScript? Why is it useful?

answer: Event Delegation is a technique where you add a single event listener to a parent element instead of adding event listeners to multiple child elements.

        a. Better Performance instead of many event listeners, you use just 1.
        b. Works for dynamic elements if you add new <li> later using javascript, it still works!
        c. Cleaner code less repetition, more maintainable.

5. What is the difference between preventDefault() and stopPropagation() methods?

answer: PreventDefault():
a. Stops the default browser action.
b. Affects browser behavior.
c. Stops form submission, link navigation.
d. Still Event bubbling available.

        stopPropagation():
            a. Stops the event from bubbling to parent elements.
            b. Event flow by capturing and Bubbling.
            c. Stops parent click event.
            d. Still Event bubbling not available.
