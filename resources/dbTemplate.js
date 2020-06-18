/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const DbTemplate = {
  tables: [
    {
      table_name: "users",
      table_column: [
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT",
        "username VARCHAR(255) NOT NULL",
        "password VARCHAR(255) NOT NULL",
        "salt VARCHAR(16) NOT NULL"
      ]
    },
    {
      table_name: "users_rel_blueprints",
      table_column: [
        "user_id INTEGER NOT NULL",
        "blueprint_typeid INTEGER NOT NULL",
        "blueprint_me INTEGER NOT NULL",
        "blueprint_te INTEGER NOT NULL"
      ]
    },
    {
      table_name: "blueprints",
      table_column: [
        "typeid INTEGER NOT NULL PRIMARY KEY",
        "name VARCHAR(255) NOT NULL",
        "time INTEGER NOT NULL"
      ]
    },
    {
      table_name: "blueprints_rel_items",
      table_column: [
        "blueprint_typeid INTEGER NOT NULL",
        "item_typeid INTEGER NOT NULL",
        "isproduct BOOLEAN DEFAULT FALSE",
        "quantity INTEGER NOT NULL"
      ]
    },
    {
      table_name: "items",
      table_column: [
        "typeid INTEGER NOT NULL PRIMARY KEY",
        "name VARCHAR(255) NOT NULL"
      ]
    },
    {
      table_name: "items_rel_item_price",
      table_column: [
        "item_typeid INTEGER NOT NULL",
        "item_price_id INTEGER NOT NULL"
      ]
    },
    {
      table_name: "item_price",
      table_column: [
        "id INTEGER NOT NULL PRIMARY KEY",
        "buy_price DOUBLE NOT NULL",
        "sell_price DOUBLE NOT NULL",
        "last_update DATETIME DEFAULT CURRENT_TIMESTAMP",
        "system_id INTEGER NOT NULL"
      ]
    }
  ]
}

module.exports = DbTemplate;
