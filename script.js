let tableHistory = [];

console.log(new Date().toLocaleString());
$(document).ready(function () {
  fetch("https://demo-thao.herokuapp.com/api/getMoney")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $(".current-money").text(
        data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
    });

  var temp = "";

  fetch("https://demo-thao.herokuapp.com/api/getAll")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tableHistory = data;

      temp = "";

      //     update list History
      for (let i = tableHistory.length - 1; i >= 0; i--) {
        temp += `<tr class="table-success">
       <th scope="row">${tableHistory[i].money}</th>
       <td>${tableHistory[i].time}</td>
     </tr>`;
      }

      $(".table-list tbody").html(temp);
    });

  //   When click + "add" money
  $(".add-love").click(function () {
    let currentMoney = Number($(".current-money").text().replaceAll(".", ""));
    let valueAdd = Number($("input").val().replaceAll(".", ""));
    let newMoney = currentMoney + valueAdd;
    $(".current-money").text(
      newMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );

    tableHistory.push({
      money: valueAdd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      time: new Date().toLocaleString(),
    });

    $.ajax({
      type: "post",
      url: "https://demo-thao.herokuapp.com/api/post",
      data: JSON.stringify({
        money: valueAdd.toString().replaceAll(".", ""),
        time: new Date().toLocaleString(),
      }),
      contentType: "application/json; charset=utf-8",
      traditional: true,
      success: function (data) {},
    });

    temp = "";

    //     update list History
    for (let i = tableHistory.length - 1; i >= 0; i--) {
      temp += `<tr class="table-success">
       <th scope="row">${tableHistory[i].money}</th>
       <td>${tableHistory[i].time}</td>
     </tr>`;
    }

    $(".table-list tbody").html(temp);
  });

  $(".table-list tbody").html(temp);
});
