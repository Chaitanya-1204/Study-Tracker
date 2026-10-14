const items = (...titles) => titles.map((title) => ({ id: crypto.randomUUID(), title, done: false }))
const sub = (title, ...itemTitles) => ({ id: crypto.randomUUID(), title, items: items(...itemTitles) })

export function createSeedData() {
  return {
    version: 1,
    topics: [
      {
        id: crypto.randomUUID(),
        title: 'DSA',
        subtopics: [
          sub('Arrays', 'Two pointers', 'Sliding window', 'Prefix sums'),
          sub('Linked Lists', 'Reversal', 'Fast & slow pointers', 'Merge lists'),
          sub('Stacks & Queues', 'Monotonic stack', 'Queue using stacks', 'Deque basics'),
          sub('Trees', 'Traversals', 'BST operations', 'Lowest common ancestor'),
          sub('Graphs', 'BFS & DFS', 'Shortest paths', 'Topological sort'),
          sub('Dynamic Programming', '1D DP', '2D DP', 'Knapsack'),
        ],
      },
      {
        id: crypto.randomUUID(),
        title: 'Machine Learning',
        subtopics: [
          sub('Linear & Logistic Regression', 'Cost function', 'Gradient descent', 'Regularization'),
          sub('Decision Trees & Ensembles', 'Decision trees', 'Random forest', 'Gradient boosting'),
          sub('Clustering', 'K-means', 'Hierarchical clustering', 'DBSCAN'),
          sub('Neural Networks', 'Perceptron', 'Backpropagation', 'Activation functions'),
          sub('Model Evaluation', 'Train/test split', 'Cross-validation', 'Precision & recall'),
        ],
      },
      {
        id: crypto.randomUUID(),
        title: 'C++',
        subtopics: [
          sub('Getting Started', 'Why C++', 'Set up VS Code & compiler', 'First program', 'Compile and run'),
          sub('Variables & Data Types', 'Variables', 'Primitive data types', 'Constants', 'Input with cin', 'Typecasting'),
          sub('Control Flow', 'if / else if / else', 'Nested conditionals', 'switch case', 'Ternary operator'),
          sub('Loops', 'for loop', 'while loop', 'do-while loop', 'Nested loops', 'break & continue'),
          sub('Operators', 'Arithmetic & assignment', 'Relational & logical', 'Bitwise operators', 'Operator precedence'),
          sub('Number Systems', 'Binary to decimal', 'Decimal to binary', 'Bit manipulation basics'),
          sub('Functions', 'Declare & call', 'Parameters & return values', 'Pass by value', 'Pass by reference', 'Default arguments', 'Recursion basics'),
          sub('Arrays', '1D arrays', 'Traversal & searching', 'Arrays as arguments', '2D arrays'),
          sub('Char Arrays & Strings', 'Char arrays', 'String input', 'Common string operations', 'std::string'),
          sub('Pointers & Memory', 'Reference variables', 'Pointer basics', 'Pointer arithmetic', 'Pointers with arrays', 'new & delete', 'Memory leaks'),
          sub('Classes & Objects', 'Define a class', 'Create objects', 'Constructors', 'Destructor', 'this pointer', 'Static members'),
          sub('Encapsulation', 'Access modifiers', 'Getters & setters', 'Build an encapsulated class'),
          sub('Inheritance', 'Base & derived classes', 'Modes of inheritance', 'Types of inheritance', 'Constructor & destructor order', 'Diamond problem'),
          sub('Polymorphism', 'Function overloading', 'Operator overloading', 'Function overriding', 'Virtual functions', 'Compile-time vs runtime'),
          sub('Abstraction', 'Abstract classes', 'Pure virtual functions', 'Interfaces in C++'),
          sub('STL Containers', 'vector', 'pair', 'stack & queue', 'deque & list', 'set & multiset', 'map & unordered_map', 'priority_queue'),
          sub('STL Algorithms', 'sort', 'binary_search', 'min & max element', 'reverse & rotate', 'count & accumulate', 'next_permutation'),
          sub('Iterators', 'Iterator basics', 'begin & end', 'Iterator categories', 'Range-based for loop'),
          sub('Functors & Lambdas', 'Function objects', 'Custom comparators', 'Lambda expressions', 'Capture lists'),
        ],
      },
    ],
  }
}
