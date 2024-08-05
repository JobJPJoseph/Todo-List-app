# Todo List Application #

## Things to implement:
    Inheritance:
    Binding (context):
    Destructuring:
    Asychronousity (Promises/asyce-await): Done
    NPM Packages (Mocha/Chai): Done
    Class instances: Done
    Single Responsibiity Principle: Done
    Custom Errors:
    Handling Errors: Done
    Linked Lists: Done
    Cache: Done
    Stacks and Queues: Done
    More NPM Packages: Done


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

    Constructor
        This will have 3 properties: head, tail, length

    enqueue
        This will accept an argument that represent an node. If the linked List is empty, we will assign it as the head and tail. If it is not empty, attach the node to the tail.
    dequeue
        This method will remove the current tail and return the node.

    The list properties we must have is: head, tail, length

### Purges Linked List Node
    The properties we must have is: value, and next, prev

### List
    There are going to be a significant change to the List class. We could try to make a linked list out of List.purges or we can add another property. Or we could do both.

    Constructor
        There needs to be 3 properties: label, items, purges. The label property represents the name of 'this' particular list.

        We may change items to an object later but for now keep it as an array.

        We need to make changes to the items property. Instead of pushing an instance into items, we will first preallocate space to increase the speed of adding an instance to the array.

    addItem
        Based on our original code in Ruby, we noticed some issues. The first is repeat code. We don't need to test of the deadline is valid when the constructor of the Item class already does so. Secondly we don't need to return a boolean when if true an instance is made. When its false, a Error is thrown.

        So we will change it. All we need to create is the item by calling Item class. We will need to import it but don't extend.

    isValidIndex
        The purpose for this is to confirm that the user's input is in a proper range of the items. Note that its based on list.length not items.length.
