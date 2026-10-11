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
    ],
  }
}
