package recfun

object Main {
  def main(args: Array[String]) {
    println("Pascal's Triangle")
    for (row <- 0 to 10) {
      for (col <- 0 to row)
        print(pascal(col, row) + " ")
      println()
    }
  }

  /**
   * Exercise 1
   */
  def pascal(c: Int, r: Int): Int = {
    if (c > r) 0
    else if (r == 0 || c == 0) 1
    else pascal(c - 1, r - 1) + pascal(c, r - 1)
  }

  /**
   * Exercise 2
   */
  def balance(chars: List[Char]): Boolean = {
  
  	def loop(acc: Int, chars: List[Char]): Boolean = {
  		if(chars.isEmpty) acc==0
  		else if(acc < 0) false
  		else {
  			val char = chars.head
  			val a = if(char == '(') 1 else if(char == ')') -1 else 0
  			loop(acc+a, chars.tail)
  		}
  	}
  
  	loop(0, chars)
  }                

  /**
   * Exercise 3
   */
  def countChange(money: Int, coins: List[Int]): Int = {

    def loop(currentValue: Int, coins: List[Int], used: List[Int]): Int = {
      //println(currentValue, coins mkString "|", used mkString "-")
      if (coins.isEmpty) 0
      else if (currentValue > money) 0
      else if (currentValue == money) 1
      else {
      	val c = coins.head
      	loop(currentValue + c, coins, used :+ c) + loop(currentValue, coins.tail, used)
      }
    }
    loop(0, coins, List())
  }               
}
