/**
 * Returns the array with the CS who aren't away, until the limit (maxCSAway)
 * @param {array} customerSuccess
 * @param {array} customerSuccessAway
 */
function removeCSAway(
  customerSuccess, 
  customerSuccessAway
) {
    let listCS = [];

    let maxCSAway = Math.trunc(customerSuccess.length / 2);
    let countAway = 0;

    for (let customer of customerSuccess)
    {
      if ((customerSuccessAway.indexOf(customer.id) < 0) ||
         (countAway == maxCSAway))
      {
        listCS.push({id: customer.id, score: customer.score});
      } 
      else
      {
        countAway++;
      }
    }

    return listCS;
}

/**
 * Returns the value that identify if the scores are same, greater or lower each other.
 * @param {object} csA
 * @param {object} csB
 */
function compareScore( 
  csA, 
  csB 
) {
    if ( csA.score < csB.score )
    {
      return -1;
    }

    if ( csA.score > csB.score )
    {
      return 1;
    }

    return 0;
}

/**
 * Returns the number of CS's customers considering her score.
 * @param {array} customers 
 * @param {number} scoreMin 
 * @param {number} scoreMax 
 */
function getNumberOfCustomers(
  customers, 
  scoreMin, 
  scoreMax
) {
    let numberOfCustomer = 0;

    for (let customer of customers)
    {
      if ((customer.score <= scoreMax) && (customer.score > scoreMin))
      {
        numberOfCustomer++;
      } 
    }

    return numberOfCustomer;
}

/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
    let listCS = customerSuccessAway.length > 0 ? 
                 removeCSAway(customerSuccess, customerSuccessAway) : 
                 customerSuccess;

    listCS = listCS.sort(compareScore);

    let id = 0;
    let max = 0;

    for (let i = 0; i < listCS.length; i++)
    {
      let numberOfcustomers = i == 0 ? 
                              getNumberOfCustomers(customers, 0, listCS[i].score) :
                              getNumberOfCustomers(customers, listCS[i - 1].score, listCS[i].score);

      if (numberOfcustomers > max)
      {
        max = numberOfcustomers;
        id = listCS[i].id;
      }
      else if (numberOfcustomers == max)
      {
        id = 0;
      }
    }

    return id;
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt){
  return Array.apply(0, Array(count)).map((it, index) => index + startAt)
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1))
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(999);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
    { id: 5, score: 55 }
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 3, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(5);
});
