object session {
  println("Welcome to the Scala worksheet")       //> Welcome to the Scala worksheet
  
  def abs(x: Double) = if(x<0) -x else x          //> abs: (x: Double)Double
  
  def sqrt(x: Double) = {
  	def sqrtIter(guess: Double) : Double =
  		if(isGoodEnough(guess)) guess
  		else sqrtIter(improve(guess))
  	
  	def isGoodEnough(guess: Double) =
  		abs(guess * guess - x) / x < 0.001
  		
  	def improve(guess: Double) =
  		(guess + x / guess) / 2
  		
  	sqrtIter(1)
  }                                               //> sqrt: (x: Double)Double
  
  sqrt(2)                                         //> res0: Double = 1.4142156862745097
  sqrt(4)                                         //> res1: Double = 2.000609756097561
  sqrt(1e-6)                                      //> res2: Double = 0.0010000001533016628
  sqrt(1e60)                                      //> res3: Double = 1.0000788456669446E30
  
  def factorial(x: Double): Double = {
  	if(x == 0) 1 else x*factorial(x-1)
  }                                               //> factorial: (x: Double)Double
  
  def tailRecursiveFactorial(x: Double, result: Double): Double = {
  	if(x == 0) result else tailRecursiveFactorial(x-1, result*x)
  }                                               //> tailRecursiveFactorial: (x: Double, result: Double)Double
  
  factorial(4)                                    //> res4: Double = 24.0
  tailRecursiveFactorial(4, 1)                    //> res5: Double = 24.0
}