const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.roots = null;
  }

  root() {
    return this.roots;
  }

  add(data) {
    this.roots = addData(this.roots, data);

    function addData(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      } else if (node.data < data) {
        node.right = addData(node.right, data);
      } else {
        node.left = addData(node.left, data);
      }

      return node;
    }
  }

  has(data) {
    return searchData(this.roots, data);

    function searchData(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return node.data < data
        ? searchData(node.right, data)
        : searchData(node.left, data);
    }
  }

  find(data) {
    return findData(this.roots, data);

    function findData(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return node.data < data
        ? findData(node.right, data)
        : findData(node.left, data);
    }
  }

  remove(data) {
    this.roots = removeData(this.roots, data);

    function removeData(node, data) {
      if (!node) {
        return null;
      }

      if (node.data < data) {
        node.right = removeData(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeData(node.left, data);
        return node;
      } else {
        if (!node.right && !node.left) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxForLeft = node.left;

        while (maxForLeft.right) {
          maxForLeft = maxForLeft.right;
        }

        node.data = maxForLeft.data;
        node.left = removeData(node.left, maxForLeft.data);
        return node;
      }
    }
  }

  min() {
    if (!this.roots) {
      return null;
    }

    let minNode = this.roots;
    while (minNode.left) {
      minNode = minNode.left;
    }

    return minNode.data;
  }

  max() {
    if (!this.roots) {
      return null;
    }

    let maxNode = this.roots;

    while (maxNode.right) {
      maxNode = maxNode.right;
    }

    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
