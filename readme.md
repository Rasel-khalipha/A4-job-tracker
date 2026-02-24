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

