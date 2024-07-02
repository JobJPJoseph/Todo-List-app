# Todo List Application #

## Things to implement:
    Inheritance:
    Binding (context):
    Destructuring:
    Asychronousity (Promises/asyce-await):
    NPM Packages (Mocha/Chai): Done
    Class instances:
    Single Responsibiity Principle:
    Custom Errors:
    Handling Errors:
    Linked Lists:
    Stacks and Queues:
    More NPM Packages:

### Item
    Constructor
        We need to have 3 properties: title, deadline and description. With deadline, we need to test if the
        deadline is in the valid format. Note: We can't call instance methods before initialization but class instances we can.

    validDate
        The purpose of this method is to test if the deadline is in a proper format. Meaning we need to test the length, make sure it includes two dashes and includes nothing but numbers.
            Based on the old code, there is a time complexity issue.

    toggle
        The purpose of this method is to change the 'done' property from false to true to signify that the task is finished. We also need to change back to false if needed.

    mark
        The purpose of this method is return a string that represents a checkmark enclosed in an array. If the 'done' property is false return a string that contains an empty array.

### Purges Linked List
    Originally this is a property of the List class. This property will represents a linked list of items that were removed from the array.

    The list properties we must have is: head, tail, length

### Purges Linked List Node
    The properties we must have is: value, and next, prev

### List
    There are going to be a significant change to the List class. We could try to make a linked list out of List.purges or we can add another property. Or we could do both.

    Constructor
        There needs to be 3 properties: label, items, purges. The label property represents the name of 'this' particular list.

        We may change items to an object later but for now keep it as an array.
