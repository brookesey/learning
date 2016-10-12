package main.scala.recfun

object main {
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
  }                                               //> countChange: (money: Int, coins: List[Int])Int

  countChange(4, List(1, 2))                      //> res0: Int = 3
  countChange(300, List(5, 10, 20, 50, 100, 200, 500))
                                                  //> res1: Int = 1022
  countChange(301, List(5, 10, 20, 50, 100, 200, 500))
                                                  //> res2: Int = 0
  countChange(300, List(500, 5, 50, 100, 20, 200, 10))
                                                  //> res3: Int = 1022
}