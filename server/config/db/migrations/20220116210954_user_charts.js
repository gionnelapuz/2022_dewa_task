exports.up = function (knex) {
  return knex.schema.createTable("user_charts", (table) => {
    table.increments();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string("title");
    table.jsonb("keys").notNullable();
    table.integer("order");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_charts");
};
