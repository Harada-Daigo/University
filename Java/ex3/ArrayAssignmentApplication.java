class ArrayAssignmentApplication{
    public static void main(String[] args){
        int a[] = {1, 2, 3};
        int b[] = {4, 5, 6};
        System.out.println("Array a : " + a[0] + ", " + a[1] + ", " + a[2]);
        System.out.println("Array b : " + b[0] + ", " + b[1] + ", " + b[2]);
        System.out.println();
        b = a;
        System.out.println("Array a : " + a[0] + ", " + a[1] + ", " + a[2]);
        System.out.println("Array b : " + b[0] + ", " + b[1] + ", " + b[2]);
        System.out.println();
        a[0] = 777;
        System.out.println("Array a : " + a[0] + ", " + a[1] + ", " + a[2]);
        System.out.println("Array b : " + b[0] + ", " + b[1] + ", " + b[2]);
    }
}