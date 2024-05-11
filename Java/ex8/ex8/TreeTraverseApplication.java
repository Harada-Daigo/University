class TreeTraverseApplication{
    public static void main(String[] args){
        TreeTraverser traverser = new TreeTraverser(15);
        System.out.println("Depth First Search:");
        traverser.traverse(new Stack());
        System.out.println();
        System.out.println("Breadth First Search:");
        traverser.traverse(new Queue());
    }
}
   