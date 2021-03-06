import casual from "casual";
import {expect} from "chai";

import {database} from "../../../../configs/config.json";
import {logger} from "../../../../src/logger";
import {sql} from "../../../../src/adapters";

describe("SqlConnection", () => {
  describe("integration", () => {
    let sqlBuilder: sql.SqlConnection;

    beforeEach(() => {
      sqlBuilder = new sql.SqlConnection({
        logger: logger.child(true),
        config: database,
      });
    });

    it("could create a connection and execute a query", async () => {
      const tableName = `test ${casual.uuid}`;
      const column = casual.word;
      await sqlBuilder.connection.schema.createTable(tableName, (table) => {
        table.string(column, 36);
      });

      const insertRow = {
        [column]: casual.uuid,
      };

      await sqlBuilder.connection(tableName).insert(insertRow);

      const row = await sqlBuilder
        .connection(tableName)
        .select()
        .where(insertRow)
        .first();

      expect(row, "should create a row").to.be.eql(insertRow);
      await sqlBuilder.connection.schema.dropTable(tableName);
    });
  });
});
