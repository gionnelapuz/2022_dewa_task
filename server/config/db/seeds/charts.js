exports.seed = function (knex) {
  return knex("charts")
    .del()
    .then(function () {
      return knex("charts").insert([
        {
          name: "Line Chart",
          description: "Time series, correlations",
          key: "LineChart",
        },
        {
          name: "Area Chart",
          description: "Time series, correlations, proportions",
          key: "AreaChart",
        },
        {
          name: "Bar Chart",
          description: "correlations, proportions",
          key: "BarChart",
        },
        {
          name: "Scatter Chart",
          description:
            "observe and show relationships between two numeric variables",
          key: "ScatterChart",
        },
      ]);
    });
};
