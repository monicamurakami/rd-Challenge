require 'minitest/autorun'
require 'timeout'
class CustomerSuccessBalancing
  def initialize(customer_success, customers, customer_success_away)
    @customer_success = customer_success
    @customers = customers
    @customer_success_away = customer_success_away
  end

  def removeCSAway(arrCS, arrAway)
    return arrCS if arrAway.empty?
    listCS = []
    maxCSAway = arrCS / 2
    maxCSAway = maxCSAway.truncate()
    countAway = 0
    arrCS.each do |score, index|
      if ((arrAway.include?(index) == false) or (countAway == maxCSAway)) 
          listCS.push({ id: index, score: score })
      else
        countAway++
    listCS
  end

  def getNumberOfCustomers(customers, scoreMin, scoreMax)
    numberOfCustomer = 0
    customers.each do |score|
      if ((score <= scoreMax) and (score > scoreMin))
        numberOfCustomer++
    numberOfCustomer
  end
    
  # Returns the id of the CustomerSuccess with the most customers
  def execute
    # Write your solution here
    listCS = removeCSAway(customerSuccess, customerSuccessAway)
    listCS.sort { |a,b| a.score <=> b.score }
    id = 0
    max = 0
    numberOfcustomers = 0
    listCS.each_with_index do |score, index| 
      if index == 0
        numberOfcustomers = getNumberOfCustomers(customers, 0, listCS[index].score)
      else
       numberOfCustomers = getNumberOfCustomers(customers, listCS[index - 1].score, listCS[i].score)
      end
  
      if (numberOfcustomers > max)
        max = numberOfcustomers
        id = listCS[index].id
      else if (numberOfcustomers == max)
        id = 0
      end
     id
  end
end

class CustomerSuccessBalancingTests < Minitest::Test
  def test_scenario_one
    css = [{ id: 1, score: 60 }, { id: 2, score: 20 }, { id: 3, score: 95 }, { id: 4, score: 75 }]
    customers = [{ id: 1, score: 90 }, { id: 2, score: 20 }, { id: 3, score: 70 }, { id: 4, score: 40 }, { id: 5, score: 60 }, { id: 6, score: 10}]

    balancer = CustomerSuccessBalancing.new(css, customers, [2, 4])
    assert_equal 1, balancer.execute
  end

  def test_scenario_two
    css = array_to_map([11, 21, 31, 3, 4, 5])
    customers = array_to_map( [10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    balancer = CustomerSuccessBalancing.new(css, customers, [])
    assert_equal 0, balancer.execute
  end

  def test_scenario_three
    customer_success = (1..999).to_a
    customers = Array.new(10000, 998)

    balancer = CustomerSuccessBalancing.new(array_to_map(customer_success), array_to_map(customers), [999])

    result = Timeout.timeout(1.0) { balancer.execute }
    assert_equal 998, result
  end

  def test_scenario_four
    balancer = CustomerSuccessBalancing.new(array_to_map([1, 2, 3, 4, 5, 6]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [])
    assert_equal 0, balancer.execute
  end

  def test_scenario_five
    balancer = CustomerSuccessBalancing.new(array_to_map([100, 2, 3, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [])
    assert_equal 1, balancer.execute
  end

  def test_scenario_six
    balancer = CustomerSuccessBalancing.new(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [1, 3, 2])
    assert_equal 0, balancer.execute
  end

  def test_scenario_seven
    balancer = CustomerSuccessBalancing.new(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [4, 5, 6])
    assert_equal 3, balancer.execute
  end

  def array_to_map(arr)
    out = []
    arr.each_with_index { |score, index| out.push({ id: index + 1, score: score }) }
    out
  end
end

Minitest.run