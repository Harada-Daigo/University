class TreeTraverser{
    private int N = 0;
    public TreeTraverser(int N){
        this.N = N;
    }
    public void traverse(OpenList list){
        list.push(0); // set the starting point
        while(!list.isEmpty()){
            int u = list.pop();
            if ( u >= N ) continue;
            System.out.print(u + " "); // print the visited node
            list.push(2*u + 1); // visit the left child
            list.push(2*u + 2); // visit the right child
        }
        System.out.println();
    }
}
   