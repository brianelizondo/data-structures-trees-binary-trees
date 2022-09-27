/** BinaryTreeNode: node for a general tree. */
class BinaryTreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor(root = null) {
        this.root = root;
    }

    /** minDepth(): return the minimum depth of the tree -- that is,
    * the length of the shortest path from the root to a leaf. */
    minDepth(){
        if (!this.root) return 0;

        function checkMinDepth(node){
            if(node.left === null && node.right === null) return 1;
            if(node.left !== null && node.right === null) return 1 + checkMinDepth(node.left);
            if(node.left === null && node.right !== null) return 1 + checkMinDepth(node.right);
            
            return 1 + Math.min(checkMinDepth(node.left), checkMinDepth(node.right));
        }
        return checkMinDepth(this.root);
    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
    * the length of the longest path from the root to a leaf. */
    maxDepth(){
        if (!this.root) return 0;

        function checkMaxDepth(node){
            if(node.left === null && node.right === null) return 1;
            if(node.left !== null && node.right === null) return 1 + checkMaxDepth(node.left);
            if(node.left === null && node.right !== null) return 1 + checkMaxDepth(node.right);
            
            return 1 + Math.max(checkMaxDepth(node.left), checkMaxDepth(node.right));
        }
        return checkMaxDepth(this.root);
    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
    * The path doesn't need to start at the root, but you can't visit a node more than once. */
    maxSum(){
        let maxSum = 0;

        function checkMaxSum(node){
            if(node === null) return 0;
            let leftBranch = checkMaxSum(node.left);
            let rightBranch = checkMaxSum(node.right);
            maxSum = Math.max(maxSum, node.val + leftBranch + rightBranch);
            
            return Math.max(0, node.val + leftBranch, node.val + rightBranch);
        }
        checkMaxSum(this.root);
        return maxSum;
    }

    /** nextLarger(lowerBound): return the smallest value in the tree
    * which is larger than lowerBound. Return null if no such value exists. */
    nextLarger(lowerBound) {
        if (!this.root) return null;
        let nextLargerNumber = null;
        let toVisitStack = [this.root];
        
        while(toVisitStack.length){
            let currentNode = toVisitStack.pop();

            if(currentNode.val > lowerBound){
                nextLargerNumber = nextLargerNumber === null ? currentNode.val : nextLargerNumber;
                nextLargerNumber = currentNode.val < nextLargerNumber ? currentNode.val : nextLargerNumber;
            }
            
            if(currentNode.left !== null) toVisitStack.push(currentNode.left);
            if(currentNode.right !== null) toVisitStack.push(currentNode.right);
        }
        return nextLargerNumber;
    }

    /** Further study!
    * areCousins(node1, node2): determine whether two nodes are cousins
    * (i.e. are at the same level but have different parents. ) */
    areCousins(node1, node2){
        const root = this.root;
        if(node1 === root || node2 === root) return false;

        function findNode(currentNode, nodeFind, findIt=false, currLevel=0, nodeFindResult={level: 0, parent:null}){            
            if(findIt) return nodeFindResult;
            if(currentNode.left === nodeFind || currentNode.right === nodeFind){
                findIt = true;
                nodeFindResult.level = currLevel + 1;
                nodeFindResult.parent = currentNode;
            }
            
            if(currentNode.left) findNode(currentNode.left, nodeFind, findIt, currLevel + 1, nodeFindResult);
            if(currentNode.right) findNode(currentNode.right, nodeFind, findIt, currLevel + 1, nodeFindResult);

            return nodeFindResult;
        }

        let node1Result = findNode(this.root, node1);
        let node2Result = findNode(this.root, node2);
        let cousinsNodes = node1Result.level === node2Result.level && node1Result.parent !== node2Result.parent ? true : false;
        
        return cousinsNodes;
    }

    /** Further study!
    * serialize(tree): serialize the BinaryTree object tree into a string. */
    static serialize(tree){
        let treeValues = [];

        function traverseNodes(currentNode){
            if(currentNode){
                treeValues.push(currentNode.val);
                traverseNodes(currentNode.left);
                traverseNodes(currentNode.right);
            }else{
                treeValues.push("*");
            }
        }

        traverseNodes(tree.root);
        return treeValues.join("-");
    }

    /** Further study!
    * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
    static deserialize(string) {
        const treeArr = string.split("-");

        function rebuildTree(){
            if(treeArr.length > 0){
                let nodeVal = treeArr.shift();
                if(nodeVal === "*") return null;

                let newNode = new BinaryTreeNode(parseInt(nodeVal));
                newNode.left = rebuildTree();
                newNode.right = rebuildTree();

                return newNode;
            }
        }

        return new BinaryTree(rebuildTree());
    }

    /** Further study!
     * lowestCommonAncestor(node1, node2): find the lowest common ancestor
     * of two nodes in a binary tree. */

    lowestCommonAncestor(node1, node2) {

    }
}

module.exports = { BinaryTree, BinaryTreeNode };
