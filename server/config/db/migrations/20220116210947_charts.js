exports.up = function(knex) {
    return knex.schema.createTable('charts', table => {
        table.increments()
        table.string('name')
        table.text('description')
        table.timestamps(false, true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('charts')
};