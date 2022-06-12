let tableHistory = [];

console.log(new Date().toLocaleString());
$(document).ready(function () {
  //   check exist LocalStorage: currentMoney
  const checkLocalStorage = localStorage.getItem("currentMoney");
  if (!checkLocalStorage) {
    localStorage.setItem("currentMoney", "200.000");
  }
  $(".current-money").text(localStorage.getItem("currentMoney"));

  var temp = "";

  //   check exist LocalStorage: listHistory

  const checkListStory = localStorage.getItem("listHistory");
  if (checkListStory) {
    tableHistory = JSON.parse(checkListStory);
  }

  //   When click + "add" money
  $(".add-love").click(function () {
    let currentMoney = Number($(".current-money").text().replaceAll(".", ""));
    let valueAdd = Number($("input").val().replaceAll(".", ""));
    console.log(valueAdd);
    console.log(currentMoney);
    let newMoney = currentMoney + valueAdd;
    console.log(newMoney);
    $(".current-money").text(
      newMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );

    localStorage.setItem(
      "currentMoney",
      newMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );

    tableHistory.push({
      money: valueAdd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      time: new Date().toLocaleString(),
    });

    console.log(tableHistory);

    temp = "";

    //     update list History
    for (let i = 0; i < tableHistory.length; i++) {
      temp += `<tr class="table-success">
       <th scope="row">${tableHistory[i].money}</th>
       <td>${tableHistory[i].time}</td>
     </tr>`;
    }

    $(".table-list tbody").html(temp);

    localStorage.setItem("listHistory", JSON.stringify(tableHistory));
  });

  //   update time when add money

  for (let i = 0; i < tableHistory.length; i++) {
    temp += `<tr class="table-success">
    <th scope="row">${tableHistory[i].money}</th>
    <td>${tableHistory[i].time}</td>
  </tr>`;
  }

  $(".table-list tbody").html(temp);
});
