import { entityTools } from '/js/entities-list/entity-tools.js';

//генерируем таблицу
function tableInit() {
  //строка выбора типа агрегации
  let agRow = $('<tr>');
  agRow.append($('<th>').text(`Тип агрегации`));
  for (let i = 0; i < 20; i++) {
    let cell = $('<th>').append(aggOptionList(i));
    agRow.append(cell);
  }
  $('table').append(agRow);
  //часть таблицы с параметрами
  for (let i = 0; i < 20; i++) {
    let row = $('<tr>');
    row.append($('<th>').text(`Entity ${i}`)); //столбец имен сущностей
    $('table').append(row);
    for (let j = 0; j < 20; j++) {
      //генерируем столбцы
      let cell = $('<th>')
        .attr('data-entity', i)
        .attr('data-param', `param${j}`);
      row.append(cell);
    }
  }
  //строка итого
  let totalRow = $('<tr>');
  totalRow.append($('<th>').text(`Итого`));
  for (let i = 0; i < 20; i++) {
    let cell = $('<th>').attr('data-column', i);
    totalRow.append(cell);
  }
  $('table').append(totalRow);
}

function getEntities() {
  return fetch('http://localhost:1234/api/entity')
    .then((res) => res.json())
    .then((res) => {
      updateTable(res);
      entityTools.updateEntities(res);
      setTimeout(() => {
        getEntities();
      }, 1000); //обновляем данные каждую секунду
    })
    .catch((err) => {
      console.log(err.message);
      setTimeout(() => {
        getEntities();
      }, 10000); //пробуем через 10 секунд
    });
}

function aggOptionList(columnId) {
  return $('<select>')
    .attr('data-column', columnId)
    .append($('<option>').attr('value', 'sum').text('Сумма'))
    .append($('<option>').attr('value', 'max').text('Макс'))
    .append($('<option>').attr('value', 'min').text('Мин'))
    .on('change', (event) => {
        updateAggregation(event.target);
    });
}

function updateAggregation(element) {
  let column = $(element).attr('data-column');
  let aggType = $(element).val();
  console.log(column, aggType);
  if (aggType === 'sum') {
    $(`th[data-column=${column}]`).text(entityTools.sumParams(column));
  } else if (aggType === 'min') {
    $(`th[data-column=${column}]`).text(entityTools.minParam(column));
  }
  if (aggType === 'max') {
    $(`th[data-column=${column}]`).text(entityTools.maxParam(column));
  }
}

function updateTable(data) {
  if (!data || data.length === 0) {
    return;
  }
  for (const entity in data) {
    if (data.hasOwnProperty(entity)) {
      if (data[entity]) {
        for (const param in data[entity]) {
          if (data[entity].hasOwnProperty(param)) {
            $(`[data-entity='${entity}'][data-param='${param}']`)
              .text(data[entity][param])
              .css('background-color', getColor(data[entity][param]).background)
              .css('color', getColor(data[entity][param]).text);
          }
        }
      }
    }
  }
  let selects = $("select");
  for (const select of selects) {
    updateAggregation(select);
  }
}
//получаем цвет фона и текста в зависимости от значения параметра
function getColor(stringValue) {
  let paramValue = parseFloat(stringValue);
  if (paramValue >= -1 && paramValue < 0) {
    return {
      background: `rgba(255, 140, 0, ${Math.abs(paramValue)})`,
      text: Math.abs(paramValue) > 0.5 ? `rgba(0, 0, 255)` : `rgba(255, 0, 0)`,
    };
  } else if (paramValue === 0) {
    return {
      background: 'rgb(255, 255, 255)',
      text: 'rgb(0, 0, 0)',
    };
  } else {
    return {
      background: `rgba(0, 0, 0, ${Math.abs(paramValue)})`,
      text: Math.abs(paramValue) > 0.5 ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
    };
  }
}

tableInit();

getEntities();
