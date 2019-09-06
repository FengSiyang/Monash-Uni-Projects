
/**
 * Write a description of class A here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class A
{
    private int Q4;
    public A()
    {
       Q4 = 3;
    }
    // step 1
    public int sample1()
    {
        Q4 += 1;
        return Q4;
    }
    // step 2
    public int sample2()
    {
        return Q4;
    }
    // step 3
    public int sample3()
    {
        int Q4 = 1;
        this.Q4 += 1;
        return this.Q4;
    }
}
